import { useAuth } from "@/features/auth/hooks/use-auth";
import { ROUTE_PATH } from "@app/routes";
import {
  Avatar,
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui";
import { cn } from "@repo/utils/cn";
import { ChevronLeft, Dot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  ChatRoom,
  useChatMessages,
  useChatRoom,
  useChatRooms,
} from "./hooks/use-chat-hooks";
import { WebSocketStatus, useWebSocket } from "./hooks/use-websocket";

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

interface LoginPromptProps {
  onLoginButtonClick: () => void;
}

function LoginPrompt({ onLoginButtonClick }: LoginPromptProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <MessageCircle className="size-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-bold mb-2">로그인이 필요합니다</h2>
      <p className="text-muted-foreground mb-6">
        채팅 기능을 이용하기 위해서는 로그인이 필요합니다.
      </p>
      <Button variant="gradient" size="lg" onClick={onLoginButtonClick}>
        로그인 하러 가기
      </Button>
    </div>
  );
}

interface ChatRoomListProps {
  chatRooms: ChatRoom[];
  onSelectChat: (chatRoom: ChatRoom) => void;
  isLoading?: boolean;
  error?: string | null;
}

function ChatRoomList({
  chatRooms,
  onSelectChat,
  isLoading,
  error,
}: ChatRoomListProps) {
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
        ) : chatRooms.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">채팅방이 없습니다.</p>
          </div>
        ) : (
          chatRooms.map((chatRoom) => (
            <div
              key={chatRoom.id}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-secondary/10 transition-colors"
              onClick={() => onSelectChat(chatRoom)}
            >
              {chatRoom.isUnread && (
                <div className="bg-primary/80  text-xs rounded-full h-2 w-2 flex items-center justify-center" />
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
      </div>
    </div>
  );
}

interface ChatRoomViewProps {
  chatRoom: ChatRoom;
  onBack: () => void;
}

function ChatRoomView({ chatRoom, onBack }: ChatRoomViewProps) {
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // WebSocket 훅을 사용하여 실시간 메시징 구현
  const {
    status: wsStatus,
    error: wsError,
    sendMessage: wsSendMessage,
  } = useWebSocket(chatRoom.id);

  // 채팅방 읽음 처리 목적
  useChatRoom(chatRoom.id);

  // 기존 메시지들을 불러오기 위한 쿼리 (이전 메시지 로딩용)
  const {
    data: messages = [],
    isLoading,
    error: apiError,
  } = useChatMessages(chatRoom.id, true);

  // 메시지 목록이 변경되거나 로딩이 완료되면 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (!isLoading && messages.length > 0 && messagesContainerRef.current) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // WebSocket을 통해 메시지 전송
      const success = wsSendMessage(newMessage.trim());
      if (success) {
        setNewMessage("");
        // 메시지 전송 후 스크롤을 맨 아래로 이동
        setTimeout(scrollToBottom, 100);
      }
    } catch (err) {
      console.error("메시지 전송 오류:", err);
    }
  };

  const isConnecting = wsStatus === WebSocketStatus.CONNECTING;
  const isConnected = wsStatus === WebSocketStatus.CONNECTED;
  const hasError = wsError || apiError;
  const noMessages = !isLoading && messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="p-4 border-b">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-2"
            aria-label="뒤로 가기"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex-1 flex items-center gap-2">
            <Avatar>
              <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center">
                {chatRoom.name.charAt(0)}
              </div>
            </Avatar>
            <SheetTitle>{chatRoom.name}</SheetTitle>
          </div>
          {/* WebSocket 연결 상태 표시 */}
          <div className="ml-auto flex items-center gap-1">
            {isConnected ? (
              <>
                <Dot className="size-4 text-green-500" />
                <span className="text-xs text-muted-foreground">연결됨</span>
              </>
            ) : (
              <>
                <X className="size-4 text-red-500" />
                <span className="text-xs text-muted-foreground">연결 끊김</span>
              </>
            )}
          </div>
        </div>
      </SheetHeader>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
      >
        {isLoading || isConnecting ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">메시지를 불러오는 중...</p>
          </div>
        ) : hasError ? (
          <div className="text-destructive text-center p-4">
            <p>
              {wsError || "메시지를 불러오는데 실패했습니다."}
              {!isConnected && (
                <span className="block mt-2 text-sm">
                  실시간 메시지 연결이 끊겼습니다. 다시 시도해주세요.
                </span>
              )}
            </p>
          </div>
        ) : noMessages ? (
          <div className="flex items-center justify-center h-full text-center">
            <p className="text-muted-foreground">
              아직 메시지가 없습니다.
              <br />첫 메시지를 보내보세요!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[70%] rounded-lg p-3 shadow",
                message.sender === "me"
                  ? "self-end bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                  : "self-start bg-muted/30"
              )}
            >
              <p>{message.text}</p>
              <div
                className={cn(
                  "text-xs mt-1",
                  message.sender === "me"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {message.timestamp}
              </div>
            </div>
          ))
        )}
      </div>

      <Separator />
      <div className="p-3 flex gap-2">
        <form onSubmit={handleSendMessage} className="w-full flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 rounded-full bg-secondary/20 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={!isConnected}
          />
          <Button
            size="icon"
            type="submit"
            className="rounded-full bg-primary hover:bg-primary/90"
            aria-label="메시지 보내기"
            disabled={!isConnected}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
