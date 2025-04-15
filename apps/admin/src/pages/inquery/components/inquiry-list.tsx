"use client";

import { ROUTE_PATH } from "@app/routes";
import { Avatar, AvatarFallback, Badge } from "@repo/ui";
import { Link } from "react-router";
import { useChatRooms } from "../hooks/use-chat-hooks";

export function InquiryList() {
  const { data: chatRooms, isLoading, error } = useChatRooms(true);

  if (isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        오류가 발생했습니다.
      </div>
    );
  }

  if (!chatRooms || chatRooms.length === 0) {
    return <div className="p-4 text-center">채팅방이 없습니다.</div>;
  }

  return (
    <div className="container flex-1">
      {/* 채팅방 목록 */}
      <div className="flex-1">
        {chatRooms.map((room) => (
          <Link
            key={room.id}
            to={`${ROUTE_PATH.INQUERY}/${room.id}`}
            className="border-b flex items-center p-3 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{room.name}</span>
                  {room.isUnread && (
                    <Badge
                      variant="default"
                      className="h-2 w-2 p-0 flex items-center justify-center"
                    />
                  )}
                </div>
                <p className="text-muted-foreground text-sm truncate">
                  {room.lastMessage}
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-primary">
              <div>{room.lastMessageTime}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
