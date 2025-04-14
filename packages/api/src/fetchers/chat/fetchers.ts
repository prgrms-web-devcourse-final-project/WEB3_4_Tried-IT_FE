import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import {
  ChatMessageResponseDto,
  ChatMessageSendDto,
  ChatRoomResponseDto,
} from "@/swagger/schemas";

export const createAdminChatRoom = generateServiceFetcher<
  void,
  void,
  void,
  ChatRoomResponseDto
>({
  method: "POST",
  endpoint: "/api/chat/admin-room",
});

export const getChatRoom = generateServiceFetcher<
  { chatRoomId: number },
  void,
  void,
  ChatRoomResponseDto
>({
  method: "GET",
  endpoint: "/api/chat/room/{chatRoomId}",
});

export const getMemberChatRoomList = generateServiceFetcher<
  void,
  void,
  void,
  ChatRoomResponseDto[]
>({
  method: "GET",
  endpoint: "/api/chat/member/rooms",
});

export const getAdminChatRoomList = generateServiceFetcher<
  void,
  void,
  void,
  ChatRoomResponseDto[]
>({
  method: "GET",
  endpoint: "/api/chat/admin/rooms",
});

export const getChatRoomMessages = generateServiceFetcher<
  { chatRoomId: number },
  { beforeMessageId?: number },
  void,
  ChatMessageResponseDto[]
>({
  method: "GET",
  endpoint: "/api/chat/rooms/{chatRoomId}/messages",
});

export const sendMessage = generateServiceFetcher<
  { chatRoomId: number },
  void,
  ChatMessageSendDto,
  ChatMessageResponseDto
>({
  method: "POST",
  endpoint: "/api/chat/rooms/{chatRoomId}/messages",
});
