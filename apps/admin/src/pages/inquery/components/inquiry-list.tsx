"use client";

import { ROUTE_PATH } from "@app/routes";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui";
import { Link } from "react-router";

const MOCK_MESSAGES = [
  {
    id: 1,
    username: "jdkskjka 님",
    message:
      "안녕하세요 메니저님, 제가 멤토링을 신청했는데 결제창에서 버튼이 안 눌려요...",
    date: "2025-03-21",
    time: "12:46",
    avatar: "/placeholder.svg?height=40&width=40",
    notifications: 1,
  },
  {
    id: 2,
    username: "내가 최고야 님",
    message:
      "안녕하세요 메니저님, 제가 멤토링을 신청했는데 결제창에서 버튼이 안 눌려요...",
    date: "2025-03-21",
    time: "12:46",
    avatar: "/placeholder.svg?height=40&width=40",
    notifications: 1,
  },
  {
    id: 3,
    username: "○○○ 님",
    message:
      "안녕하세요 메니저님, 제가 멤토링을 신청했는데 결제창에서 버튼이 안 눌려요...",
    date: "2025-03-21",
    time: "12:46",
    avatar: "/placeholder.svg?height=40&width=40",
    notifications: 1,
  },
  {
    id: 4,
    username: "이봐 해봤어? 님",
    message:
      "안녕하세요 메니저님, 제가 멤토링을 신청했는데 결제창에서 버튼이 안 눌려요...",
    date: "2025-03-21",
    time: "12:46",
    avatar: "/placeholder.svg?height=40&width=40",
    notifications: 1,
  },
  {
    id: 5,
    username: "eeekjddk 님",
    message:
      "안녕하세요 메니저님, 제가 멤토링을 신청했는데 결제창에서 버튼이 안 눌려요...",
    date: "2025-03-21",
    time: "12:46",
    avatar: "/placeholder.svg?height=40&width=40",
    notifications: 1,
  },
  {
    id: 6,
    username: "qwjnkj123 님",
    message:
      "안녕하세요 메니저님, 제가 멤토링을 신청했는데 결제창에서 버튼이 안 눌려요...",
    date: "2025-03-21",
    time: "12:46",
    avatar: "/placeholder.svg?height=40&width=40",
    notifications: 1,
  },
  {
    id: 7,
    username: "jfdsfd_dds님",
    message:
      "안녕하세요 메니저님, 제가 멤토링을 신청했는데 결제창에서 버튼이 안 눌려요...",
    date: "2025-03-21",
    time: "12:46",
    avatar: "/placeholder.svg?height=40&width=40",
    notifications: 1,
  },
];

export function InquiryList() {
  return (
    <div className="container flex-1">
      {/* Message List */}
      <div className="flex-1">
        {MOCK_MESSAGES.map((message) => (
          <Link
            key={message.id}
            to={`${ROUTE_PATH.INQUERY}/${message.id}`}
            className="border-b flex items-center p-3 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src={message.avatar} alt={message.username} />
                <AvatarFallback>{message.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{message.username}</span>
                  {message.notifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 rounded-full p-0 flex items-center justify-center"
                    >
                      {message.notifications}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm truncate">
                  {message.message}
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-primary">
              <div>{message.date}</div>
              <div>{message.time}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div>
        <Pagination className="border-t py-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">11</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
