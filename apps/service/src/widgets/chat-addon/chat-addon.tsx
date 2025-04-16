import { useAuth } from "@/features/auth/hooks/use-auth";
import { ROUTE_PATH } from "@app/routes";
import { Button, Sheet, SheetContent, SheetTrigger } from "@repo/ui";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ChatRoomList, ChatRoomView, LoginPrompt } from "./components";
import { ChatRoom, useChatRooms } from "./hooks/use-chat-hooks";

export function ChatAddon() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
  const { isAuthenticated } = useAuth();

  // react-query를 사용하여 채팅방 목록 조회
  const {
    data: chatRooms = [],
    isLoading,
    error,
  } = useChatRooms(isAuthenticated);

  // 안읽은 메시지가 있는지 확인
  const hasUnreadMessages =
    isAuthenticated && !isLoading && chatRooms.some((chat) => chat.isUnread);

  const handleChatSelect = (chatRoom: ChatRoom) => {
    setSelectedChat(chatRoom);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const handleLoginButtonClick = () => {
    navigate(ROUTE_PATH.AUTH.LOGIN);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <SheetTrigger asChild>
          <div className="relative inline-block">
            <Button
              size="icon"
              variant="gradient"
              className="rounded-full w-14 h-14 shadow-xl"
              aria-label="채팅 열기"
            >
              <MessageCircle className="size-6 text-white" />
            </Button>
            {hasUnreadMessages && (
              <div className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground shadow rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-bounce">
                {chatRooms.filter((chat) => chat.isUnread).length}
              </div>
            )}
          </div>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="sm:max-w-md w-[90vw] p-0 rounded-t-xl sm:rounded-l-xl h-[80vh] sm:h-[500px] bottom-0 right-0 top-auto"
        >
          {!isAuthenticated ? (
            <LoginPrompt onLoginButtonClick={handleLoginButtonClick} />
          ) : selectedChat ? (
            <ChatRoomView chatRoom={selectedChat} onBack={handleBackToList} />
          ) : (
            <ChatRoomList
              chatRooms={chatRooms}
              onSelectChat={handleChatSelect}
              isLoading={isLoading}
              error={error ? "채팅방 목록을 불러오는데 실패했습니다." : null}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
