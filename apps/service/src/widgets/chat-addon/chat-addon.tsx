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

interface ChatRoom {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
}

export function ChatAddon() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);

  // 임시 채팅방 목록 데이터
  const chatRooms: ChatRoom[] = [
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

  const handleChatSelect = (chatRoom: ChatRoom) => {
    setSelectedChat(chatRoom);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

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
              chatRooms={chatRooms}
              onSelectChat={handleChatSelect}
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
}

function ChatRoomList({ chatRooms, onSelectChat }: ChatRoomListProps) {
  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="p-4 border-b">
        <SheetTitle className="text-xl">메시지</SheetTitle>
      </SheetHeader>
      <div className="flex-1 overflow-y-auto">
        {chatRooms.map((chatRoom) => (
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
        ))}
      </div>
    </div>
  );
}

interface ChatRoomViewProps {
  chatRoom: ChatRoom;
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

function ChatRoomView({ chatRoom, onBack }: ChatRoomViewProps) {
  // 임시 메시지 데이터
  const messages: Message[] = [
    {
      id: "1",
      text: "안녕하세요! 멘토링 문의드립니다.",
      sender: "other",
      timestamp: "10:30",
    },
    {
      id: "2",
      text: "네, 안녕하세요. 어떤 도움이 필요하신가요?",
      sender: "me",
      timestamp: "10:31",
    },
    {
      id: "3",
      text: "저는 프론트엔드 개발을 배우고 있는데, React와 TypeScript에 대해 도움을 얻고 싶습니다.",
      sender: "other",
      timestamp: "10:33",
    },
    {
      id: "4",
      text: "그럼요, 도와드릴 수 있습니다. 어떤 부분에서 어려움을 겪고 계신가요?",
      sender: "me",
      timestamp: "10:35",
    },
  ];

  const [newMessage, setNewMessage] = useState("");

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
        {messages.map((message) => (
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
        ))}
      </div>

      <Separator />
      <div className="p-3 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 rounded-full bg-secondary/20 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <Button
          size="icon"
          className="rounded-full bg-primary hover:bg-primary/90"
          aria-label="메시지 보내기"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
