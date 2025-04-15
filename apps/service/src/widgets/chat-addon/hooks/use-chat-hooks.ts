import { useAuth } from "@/features/auth/hooks/use-auth";
import { dementorApiFetchers } from "@repo/api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

// 채팅방 목록을 가져오는 훅
export function useChatRooms(isOpen: boolean) {
  return useQuery({
    queryKey: ["chatRooms"],
    queryFn: async () => {
      const response = await dementorApiFetchers.chat.getMemberChatRoomList();

      return response.map((room) => ({
        id: room.chatRoomId?.toString() || "",
        name: room.targetNickname || "알 수 없음",
        avatar: "",
        lastMessage: room.lastMessage || "새로운 대화를 시작하세요",
        lastMessageTime: room.lastMessageAt
          ? dayjs(room.lastMessageAt).locale("ko").fromNow()
          : "",
      }));
    },
    // 채팅창이 열려있을 때만 활성화
    enabled: isOpen,
    // 1분마다 자동 갱신 (필요에 따라 조정)
    refetchInterval: 60 * 1000,
    // 에러 발생 시 자동 재시도
    retry: 1,
  });
}

// 채팅 메시지를 가져오는 훅
export function useChatMessages(chatRoomId: string, enabled: boolean) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["chatMessages", chatRoomId],
    queryFn: async () => {
      // chatRoom.id가 문자열이므로 숫자로 변환
      const chatRoomIdNum = parseInt(chatRoomId, 10);

      // 유효한 숫자인지 확인
      if (isNaN(chatRoomIdNum)) {
        throw new Error("유효하지 않은 채팅방 ID");
      }

      const response = await dementorApiFetchers.chat.getChatRoomMessages({
        pathParams: {
          chatRoomId: chatRoomIdNum,
        },
        queryParam: {},
      });

      const currentUserId = parseInt(user?.id || "0");

      return response.map((msg, index) => ({
        id: index.toString(), // API 응답에 messageId가 없으므로 index 사용
        text: msg.content || "",
        // 본인이 보낸 메시지인지 확인
        sender: msg.senderId === currentUserId ? "me" : "other",
        timestamp: msg.sentAt ? dayjs(msg.sentAt).format("HH:mm") : "",
      }));
    },
    enabled: Boolean(chatRoomId) && enabled,
    // WebSocket 연결이 없는 상황에 대비한 백업 역할로
    // 5분마다 한 번씩 갱신
    refetchInterval: 5 * 60 * 1000,
    // 데이터를 상대적으로 오래 유지
    staleTime: 60 * 1000,
  });
}

// 인터페이스 정의
export interface ChatRoom {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}
