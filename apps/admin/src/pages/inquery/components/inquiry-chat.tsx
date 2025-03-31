"use client";

import { ArrowLeft, MoreHorizontal, Send } from "lucide-react";
import { useState } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ScrollArea,
  Textarea,
} from "@repo/ui";
import { useNavigate } from "react-router";

type Message = {
  id: number;
  content: string;
  timestamp: string;
  isMe: boolean;
};

type ChatUser = {
  id: number;
  username: string;
  message: string;
  date: string;
  time: string;
  avatar: string;
  notifications: number;
  messages: Message[];
};

const MOCK_CHAT_ROOM: ChatUser = {
  id: 1,
  username: "jdkskjka 님",
  message:
    "안녕하세요 메니저님, 제가 멤토링을 신청했는데 결제창에서 버튼이 안 눌려요...",
  date: "2025-03-21",
  time: "12:46",
  avatar: "/placeholder.svg?height=40&width=40",
  notifications: 1,
  messages: [
    {
      id: 1,
      content:
        "안녕하세요 메니저님, 제가 멤토링을 신청했는데 결제창에서 버튼이 안 눌려요...",
      timestamp: "12:30",
      isMe: false,
    },
    {
      id: 2,
      content:
        "어떤 버튼이 안 눌리시나요? 좀 더 자세히 설명해주실 수 있을까요?",
      timestamp: "12:35",
      isMe: true,
    },
    {
      id: 3,
      content:
        "결제하기 버튼이 회색으로 비활성화되어 있어요. 클릭해도 아무 반응이 없습니다.",
      timestamp: "12:38",
      isMe: false,
    },
    {
      id: 4,
      content:
        "혹시 모든 필수 입력 항목을 작성하셨나요? 이름, 연락처, 이메일 등이 모두 입력되어야 버튼이 활성화됩니다.",
      timestamp: "12:40",
      isMe: true,
    },
    {
      id: 5,
      content: "아, 이메일을 입력하지 않았네요. 확인해보겠습니다. 감사합니다!",
      timestamp: "12:43",
      isMe: false,
    },
  ],
};

export function InquiryChat() {
  const navigate = useNavigate();
  const activeChat = MOCK_CHAT_ROOM;

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // In a real app, you would send this message to a backend
    // For now, we'll just clear the input
    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Chat Header */}
      <div className="border-b p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={activeChat.avatar} alt={activeChat.username} />
          <AvatarFallback>{activeChat.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <div className="font-medium">{activeChat.username}</div>
          <div className="text-xs text-muted-foreground">
            최근 접속: 오늘 12:50
          </div>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {activeChat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
            >
              {!message.isMe && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage
                    src={activeChat.avatar}
                    alt={activeChat.username}
                  />
                  <AvatarFallback>
                    {activeChat.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.isMe
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50"
                }`}
              >
                <p>{message.content}</p>
                <div
                  className={`text-xs mt-1 ${message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-4 flex items-end gap-2">
        <Textarea
          placeholder="메시지를 입력하세요..."
          className="min-h-10 resize-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button
          size="icon"
          className="rounded-full h-10 w-10 flex-shrink-0"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
