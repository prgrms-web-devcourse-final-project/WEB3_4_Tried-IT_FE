import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import {
  CreateChatRoomRequest,
  CreateChatRoomResponse,
  GetChatListResponse,
  GetChatRoomHistoryRequest,
  GetChatRoomHistoryResponse,
} from "@/schemas";

/**
 * @description 로그인한 사용자가 참여 중인 모든 채팅방 목록을 반환합니다.
 */
export const getChatList = generateServiceFetcher<
  void,
  void,
  void,
  GetChatListResponse
>({
  endpoint: "/api/chat/rooms",
  method: "GET",
});

export const createChatRoom = generateServiceFetcher<
  void,
  void,
  CreateChatRoomRequest,
  CreateChatRoomResponse
>({
  endpoint: "/api/chat/rooms",
  method: "POST",
});

export const getChatRoomHistory = generateServiceFetcher<
  { chatRoomId: number },
  GetChatRoomHistoryRequest,
  void,
  GetChatRoomHistoryResponse
>({
  endpoint: "/api/chat/rooms/{chatRoomId}/messages",
  method: "GET",
});
