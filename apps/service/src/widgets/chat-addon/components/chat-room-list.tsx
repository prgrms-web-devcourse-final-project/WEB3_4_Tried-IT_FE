import { Avatar, Button, SheetHeader, SheetTitle } from "@repo/ui";
import { ChatRoom, useCreateAdminChatRoom } from "../hooks/use-chat-hooks";

export interface ChatRoomListProps {
  chatRooms: ChatRoom[];
  onSelectChat: (chatRoom: ChatRoom) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function ChatRoomList({
  chatRooms,
  onSelectChat,
  isLoading,
  error,
}: ChatRoomListProps) {
  const { mutate: createAdminChatRoom, isPending } = useCreateAdminChatRoom();

  const adminChatRoom = chatRooms.find((room) => room.name === "관리자");
  const hasAdminChatRoom = Boolean(adminChatRoom);
  const hasUnreadAdminMessages = adminChatRoom?.isUnread || false;
  const filteredChatRooms = chatRooms.filter((room) => room.name !== "관리자");

  const handleAdminChatClick = () => {
    if (hasAdminChatRoom && adminChatRoom) {
      onSelectChat(adminChatRoom);
    } else {
      createAdminChatRoom(undefined, {
        onSuccess: (data) => {
          if (data && data.chatRoomId) {
            const newChatRoom: ChatRoom = {
              id: data.chatRoomId.toString(),
              name: "관리자",
              avatar: "",
              lastMessage: "새로운 대화를 시작하세요",
              lastMessageTime: "",
              isUnread: false,
            };
            onSelectChat(newChatRoom);
          }
        },
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="p-4 border-b">
        <SheetTitle className="text-xl">메시지</SheetTitle>
      </SheetHeader>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <>
            <div className="p-3 border-b">
              <Button
                variant="gradient"
                className="w-full relative"
                onClick={handleAdminChatClick}
                disabled={isPending}
              >
                {hasUnreadAdminMessages && (
                  <div className="absolute -top-1 -left-1 bg-secondary text-secondary-foreground shadow rounded-full w-3 h-3 flex items-center justify-center animate-bounce" />
                )}
                {isPending ? "처리 중..." : "관리자와 대화하기"}
              </Button>
            </div>

            {filteredChatRooms.length === 0 ? (
              <div className="flex items-center justify-center h-[calc(100%-70px)]">
                <p className="text-muted-foreground">채팅방이 없습니다.</p>
              </div>
            ) : (
              filteredChatRooms.map((chatRoom) => (
                <div
                  key={chatRoom.id}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-secondary/10 transition-colors"
                  onClick={() => onSelectChat(chatRoom)}
                >
                  {chatRoom.isUnread && (
                    <div className="bg-primary/80 text-xs rounded-full h-2 w-2 flex items-center justify-center" />
                  )}
                  <Avatar>
                    <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center">
                      {chatRoom.name.charAt(0)}
                    </div>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{chatRoom.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {chatRoom.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {chatRoom.lastMessage}
                    </p>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
