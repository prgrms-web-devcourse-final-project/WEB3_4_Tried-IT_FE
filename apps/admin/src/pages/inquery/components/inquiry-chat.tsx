"use client";

import { ArrowLeft, MoreHorizontal, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  ScrollArea,
} from "@repo/ui";
import { useChatMessages, useChatRoom } from "../hooks/use-chat-hooks";
import { useWebSocket, WebSocketStatus } from "../hooks/use-websocket";

export function InquiryChat() {
  const navigate = useNavigate();
  const { id: chatRoomId } = useParams<{ id: string }>();
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 채팅방 정보 가져오기
  const { data: chatRoom, isLoading: isLoadingRoom } = useChatRoom(
    chatRoomId || ""
  );

  // 웹소켓 연결 설정
  const {
    status: wsStatus,
    error: wsError,
    sendMessage,
  } = useWebSocket(chatRoomId || null);

  // 채팅 메시지 가져오기 (웹소켓 연결 상태에 따라 활성화)
  const { data: messages = [], isLoading: isLoadingMessages } = useChatMessages(
    chatRoomId || "",
    Boolean(chatRoomId)
  );

  // 메시지 전송 처리
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // 웹소켓으로 메시지 전송
    const success = sendMessage(newMessage.trim());

    if (success) {
      setNewMessage("");
    }
  };

  // 새 메시지가 오면 스크롤 맨 아래로 이동
  useEffect(() => {
    // 애니메이션 프레임 사용하여 다음 렌더링 사이클에서 스크롤 실행
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // 메시지가 로드된 후에만 스크롤
    if (!isLoadingMessages && messages.length > 0) {
      requestAnimationFrame(scrollToBottom);
    }
  }, [messages, isLoadingMessages]);

  // 로딩 중 표시
  if (isLoadingRoom || !chatRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 채팅 헤더 */}
      <div className="border-b p-4 flex items-center shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt={chatRoom.targetNickname}
          />
          <AvatarFallback>
            {chatRoom.targetNickname?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <div className="font-medium">
            {chatRoom.targetNickname || "사용자"}
          </div>
          <div className="text-xs text-muted-foreground">
            {wsStatus === WebSocketStatus.CONNECTED ? "연결됨" : "오프라인"}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* 채팅 메시지 */}

      <ScrollArea className="h-[80vh]" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {isLoadingMessages ? (
            <div className="text-center py-4">메시지 로딩 중...</div>
          ) : messages.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              메시지가 없습니다.
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender !== "me" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt={chatRoom.targetNickname || "사용자"}
                      />
                      <AvatarFallback>
                        {chatRoom.targetNickname?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.sender === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50"
                    }`}
                  >
                    <p>{message.text}</p>
                    <div
                      className={`text-xs mt-1 ${message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              {/* 스크롤 위치 잡기 위한 빈 요소 */}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </ScrollArea>

      {/* 웹소켓 에러 표시 */}
      {wsError && (
        <div className="bg-destructive/10 p-2 text-sm text-destructive text-center shrink-0">
          {wsError}
        </div>
      )}

      {/* 메시지 입력 */}
      <form
        className="border-t p-4 flex items-end gap-2 shrink-0"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <Input
          placeholder="메시지를 입력하세요..."
          className="min-h-10 resize-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          size="icon"
          className="rounded-full h-10 w-10 flex-shrink-0"
          type="submit"
          disabled={
            !newMessage.trim() || wsStatus !== WebSocketStatus.CONNECTED
          }
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
