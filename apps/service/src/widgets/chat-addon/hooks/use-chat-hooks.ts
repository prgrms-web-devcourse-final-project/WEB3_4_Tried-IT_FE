import { useAuth } from "@/features/auth/hooks/use-auth";
import { dementorApiFetchers } from "@repo/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
        id: index.toString(), // 실제로는 메시지 ID가 있어야 함
        text: msg.content || "",
        // 본인이 보낸 메시지인지 확인
        sender: msg.senderId === currentUserId ? "me" : "other",
        timestamp: msg.sentAt ? dayjs(msg.sentAt).format("HH:mm") : "",
      }));
    },
    enabled: Boolean(chatRoomId) && enabled,
    // 새 메시지를 자주 가져오기 위해 짧은 간격으로 설정
    refetchInterval: 5 * 1000,
  });
}

// 메시지 전송을 위한 훅
export function useSendMessage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      chatRoomId,
      content,
    }: {
      chatRoomId: string;
      content: string;
    }) => {
      if (!user) {
        throw new Error("로그인 상태가 아닙니다.");
      }

      const chatRoomIdNum = parseInt(chatRoomId, 10);

      if (isNaN(chatRoomIdNum)) {
        throw new Error("유효하지 않은 채팅방 ID");
      }

      const response = await dementorApiFetchers.chat.sendMessage({
        body: {
          content,
          senderType: "MEMBER",
          senderId: parseInt(user.id),
        },
        pathParams: {
          chatRoomId: chatRoomIdNum,
        },
      });

      return response;
    },

    onMutate: async ({ content, chatRoomId }) => {
      // 낙관적 메시지 생성
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        text: content,
        sender: "me",
        timestamp: dayjs().format("HH:mm"),
      };

      const prevChatMessages = queryClient.getQueryData<Message[]>([
        "chatMessages",
        chatRoomId,
      ]);

      queryClient.setQueryData<Message[]>(
        ["chatMessages", chatRoomId],
        (old) => [...(old || []), optimisticMessage]
      );

      return { prevChatMessages };
    },
    // 메시지 전송 성공 시 채팅 메시지 목록 갱신
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chatMessages", variables.chatRoomId],
      });

      // 채팅방 목록도 함께 갱신 (마지막 메시지 업데이트를 위해)
      queryClient.invalidateQueries({ queryKey: ["chatRooms"] });
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData<Message[]>(
        ["chatMessages", variables.chatRoomId],
        context?.prevChatMessages
      );
    },
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
