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
import { ChevronLeft, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import {
  ChatRoom,
  useChatMessages,
  useChatRooms,
  useSendMessage,
} from "./hooks/use-chat-hooks";

export function ChatAddon() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);

  // react-query를 사용하여 채팅방 목록 조회
  const { data: chatRooms = [], isLoading, error } = useChatRooms(isOpen);

  const handleChatSelect = (chatRoom: ChatRoom) => {
    setSelectedChat(chatRoom);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  // 임시 데이터 - API 연동이 안 될 때를 대비해 폴백 데이터로 사용
  const fallbackChatRooms: ChatRoom[] = [
    {
      id: "1",
      name: "홍길동",
      avatar: "",
      lastMessage: "안녕하세요! 멘토링 문의드립니다.",
      lastMessageTime: "10:30",
      unreadCount: 3,
    },
    {
      id: "2",
      name: "김철수",
      avatar: "",
      lastMessage: "오늘 세션 일정 확인해주세요.",
      lastMessageTime: "어제",
    },
    {
      id: "3",
      name: "이영희",
      avatar: "",
      lastMessage: "자료 잘 받았습니다. 감사합니다!",
      lastMessageTime: "1월 15일",
    },
    {
      id: "4",
      name: "박지성",
      avatar: "",
      lastMessage: "다음 미팅은 언제로 잡을까요?",
      lastMessageTime: "1월 10일",
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
            aria-label="채팅 열기"
          >
            <MessageCircle className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="sm:max-w-md w-[90vw] p-0 rounded-t-xl sm:rounded-l-xl h-[80vh] sm:h-[500px] bottom-0 right-0 top-auto"
        >
          {selectedChat ? (
            <ChatRoomView chatRoom={selectedChat} onBack={handleBackToList} />
          ) : (
            <ChatRoomList
              chatRooms={chatRooms.length > 0 ? chatRooms : fallbackChatRooms}
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
              {chatRoom.unreadCount && (
                <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 flex items-center justify-center">
                  {chatRoom.unreadCount}
                </div>
              )}
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

  // react-query를 사용하여 채팅 메시지 조회
  const {
    data: messages = [],
    isLoading,
    error,
  } = useChatMessages(chatRoom.id, true);

  // 메시지 전송 mutation
  const sendMessageMutation = useSendMessage();

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      // 메시지 전송
      sendMessageMutation.mutateAsync({
        chatRoomId: chatRoom.id,
        content: newMessage,
      });
    } catch (err) {
      console.error("메시지 전송 오류:", err);
    }
  };

  // 엔터 키로 메시지 전송
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
          <div className="flex items-center gap-2">
            <Avatar>
              <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center">
                {chatRoom.name.charAt(0)}
              </div>
            </Avatar>
            <SheetTitle>{chatRoom.name}</SheetTitle>
          </div>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">메시지를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="text-destructive text-center p-4">
            <p>메시지를 불러오는데 실패했습니다.</p>
          </div>
        ) : messages.length === 0 ? (
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
                "max-w-[70%] rounded-lg p-3",
                message.sender === "me"
                  ? "bg-primary text-primary-foreground self-end"
                  : "bg-secondary/30 self-start"
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
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          className="flex-1 rounded-full bg-secondary/20 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          disabled={sendMessageMutation.isPending}
        />
        <Button
          size="icon"
          onClick={handleSendMessage}
          className="rounded-full bg-primary hover:bg-primary/90"
          aria-label="메시지 보내기"
          disabled={sendMessageMutation.isPending}
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
