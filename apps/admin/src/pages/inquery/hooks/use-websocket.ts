import { Client, IFrame, IMessage, StompSubscription } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Message as ChatMessage } from "./use-chat-hooks";

// WebSocket 상태 정의
export enum WebSocketStatus {
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  ERROR = "ERROR",
}

// 메시지 인터페이스
interface WebSocketMessage {
  chatRoomId: number;
  senderId: number;
  senderType: string;
  content: string;
  sentAt: string;
}

/**
 * 단일 채팅방에 대한 WebSocket 연결을 관리하는 Hook
 */
export function useWebSocket(chatRoomId: string | null) {
  const queryClient = useQueryClient(); // React Query 클라이언트 가져오기

  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.DISCONNECTED
  );
  const [error, setError] = useState<string | null>(null);

  // stompClient 참조 저장
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);

  // 채팅방 구독 및 연결 설정
  useEffect(() => {
    // 채팅방 ID나 사용자 정보가 없으면 연결하지 않음
    if (!chatRoomId) {
      return;
    }

    // 연결 시작 상태로 설정
    setStatus(WebSocketStatus.CONNECTING);

    // 기존 연결 정리
    const cleanup = () => {
      try {
        // 구독 해제
        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe();
          subscriptionRef.current = null;
        }

        // 연결 종료
        if (stompClientRef.current) {
          stompClientRef.current.deactivate();
          stompClientRef.current = null;
        }

        setStatus(WebSocketStatus.DISCONNECTED);
      } catch (err) {
        console.error("WebSocket 연결 정리 중 오류:", err);
      }
    };

    // 이전 연결 정리
    cleanup();

    // 새 연결 생성
    try {
      // STOMP 클라이언트 생성 - 공식 문서 가이드에 따라 Client 생성
      const client = new Client({
        // SockJS를 사용하기 위한 webSocketFactory 설정
        webSocketFactory: () => {
          return new SockJS(`${import.meta.env.VITE_API_URL}/ws`);
        },
        // 디버그 설정 (개발 환경에서만 활성화)
        debug: (str) => {
          if (import.meta.env.DEV) {
            if (str.includes("PING")) return;
            if (str.includes("PONG")) return;
            console.log(str);
          }
        },
        // 재연결 간격 (5초)
        reconnectDelay: 5000,
        // 하트비트 간격 설정
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 연결 성공 시 콜백
      client.onConnect = () => {
        setStatus(WebSocketStatus.CONNECTED);
        setError(null);

        // 채팅방 구독
        const subscription = client.subscribe(
          `/topic/chat.room.${chatRoomId}`,
          (message: IMessage) => {
            try {
              // 수신된 메시지 처리
              const data = JSON.parse(message.body) as WebSocketMessage;

              // 새 메시지 생성
              const newMessage: ChatMessage = {
                id: `ws-${Date.now()}`,
                text: data.content,
                sender: data.senderType === "ADMIN" ? "me" : "other",
                timestamp: dayjs().format("HH:mm"),
              };

              // React Query 쿼리 캐시 업데이트
              queryClient.setQueryData<ChatMessage[]>(
                ["chatMessages", chatRoomId],
                (oldMessages = []) => [...oldMessages, newMessage]
              );

              // 채팅방 목록 쿼리도 갱신하여 마지막 메시지 정보 업데이트
              queryClient.invalidateQueries({ queryKey: ["chatRooms"] });
            } catch (err) {
              console.error("메시지 처리 오류:", err);
            }
          }
        );

        // 구독 참조 저장
        subscriptionRef.current = subscription;
      };

      // 오류 처리
      client.onStompError = (frame: IFrame) => {
        console.error("STOMP 오류:", frame);
        setStatus(WebSocketStatus.ERROR);
        setError(
          `WebSocket 오류: ${frame.headers?.message || "알 수 없는 오류"}`
        );
      };

      // 연결 실패 처리
      client.onWebSocketError = (event) => {
        console.error("WebSocket 오류:", event);
        setStatus(WebSocketStatus.ERROR);
        setError("WebSocket 연결에 실패했습니다.");
      };

      // 클라이언트 참조 저장
      stompClientRef.current = client;

      // 클라이언트 활성화 (connect 대신 activate 사용)
      client.activate();
    } catch (err) {
      console.error("WebSocket 연결 설정 오류:", err);
      setStatus(WebSocketStatus.ERROR);
      setError("WebSocket 연결에 실패했습니다.");
    }

    // 컴포넌트 언마운트 또는 채팅방 변경 시 정리
    return cleanup;
  }, [chatRoomId, queryClient]);

  // 메시지 전송 함수
  const sendMessage = useCallback(
    (content: string) => {
      if (!stompClientRef.current?.connected || !chatRoomId) {
        setError("메시지를 보낼 수 없습니다. 연결 상태를 확인해주세요.");
        return false;
      }

      try {
        const message = {
          // TODO: ADMIN ID 확인 필요
          senderId: 5,
          senderType: "ADMIN",
          content,
        };

        // 메시지 발행 (send 대신 publish 사용)
        stompClientRef.current.publish({
          destination: `/app/chat/rooms/${chatRoomId}/messages/create`,
          body: JSON.stringify(message),
        });

        return true;
      } catch (err) {
        console.error("메시지 전송 오류:", err);
        setError("메시지 전송에 실패했습니다.");
        return false;
      }
    },
    [chatRoomId]
  );

  return {
    status,
    error,
    sendMessage,
  };
}
