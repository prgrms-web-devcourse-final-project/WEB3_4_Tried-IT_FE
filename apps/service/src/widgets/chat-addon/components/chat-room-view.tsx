import { Avatar, Button, Separator, SheetHeader, SheetTitle } from "@repo/ui";
import { cn } from "@repo/utils/cn";
import { ChevronLeft, Dot, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ChatRoom,
  useChatMessages,
  useChatRoom,
} from "../hooks/use-chat-hooks";
import { WebSocketStatus, useWebSocket } from "../hooks/use-websocket";

export interface ChatRoomViewProps {
  chatRoom: ChatRoom;
  onBack: () => void;
}

export function ChatRoomView({ chatRoom, onBack }: ChatRoomViewProps) {
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const {
    status: wsStatus,
    error: wsError,
    sendMessage: wsSendMessage,
  } = useWebSocket(chatRoom.id);

  useChatRoom(chatRoom.id);

  const {
    data: messages = [],
    isLoading,
    error: apiError,
  } = useChatMessages(chatRoom.id, true);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!isLoading && messages.length > 0 && messagesContainerRef.current) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const success = wsSendMessage(newMessage.trim());
      if (success) {
        setNewMessage("");
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
