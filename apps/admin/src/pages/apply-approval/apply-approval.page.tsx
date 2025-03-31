import { useState } from "react";

import { PageLayout } from "@/shared/layouts/page-layout";
import {
  Badge,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@repo/ui";

import { Applicant, ApplyItem } from "./components/apply-item";

const MOCK_MODIFICATION_REQUEST_COUNT = 4;
const MOCK_APPROVAL_REQUEST_COUNT = 6;

export function ApplyApprovalPage() {
  const [requests, setRequests] = useState<Applicant[]>([
    {
      id: 1,
      type: "profile",
      category: "modification",
      title: "멤버 정보 수정",
      description: "멤버 ? 님이 정보 처리 수정 요청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "김모호",
      },
    },
    {
      id: 2,
      type: "blank",
      category: "approval",
      title: "멤버 승인",
      description: "? 님이 멤버 신청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "이모호",
      },
    },
    {
      id: 3,
      type: "blank",
      category: "approval",
      title: "멤버 승인",
      description: "? 님이 멤버 신청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "박모호",
      },
    },
    {
      id: 4,
      type: "profile",
      category: "modification",
      title: "멤버 정보 수정",
      description: "멤버 ? 님이 정보 처리 수정 요청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "최모호",
      },
    },
    {
      id: 5,
      type: "blank",
      category: "approval",
      title: "멤버 승인",
      description: "? 님이 멤버 신청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "정모호",
      },
    },
    {
      id: 6,
      type: "profile",
      category: "modification",
      title: "멤버 정보 수정",
      description: "멤버 ? 님이 정보 처리 수정 요청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "김모호",
      },
    },
    {
      id: 7,
      type: "blank",
      category: "approval",
      title: "멤버 승인",
      description: "? 님이 멤버 신청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "이모호",
      },
    },
    {
      id: 8,
      type: "blank",
      category: "approval",
      title: "멤버 승인",
      description: "? 님이 멤버 신청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "박모호",
      },
    },
    {
      id: 9,
      type: "profile",
      category: "modification",
      title: "멤버 정보 수정",
      description: "멤버 ? 님이 정보 처리 수정 요청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "최모호",
      },
    },
    {
      id: 10,
      type: "blank",
      category: "approval",
      title: "멤버 승인",
      description: "? 님이 멤버 신청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "정모호",
      },
    },
    {
      id: 11,
      type: "blank",
      category: "approval",
      title: "멤버 승인",
      description: "? 님이 멤버 신청을 하셨습니다.",
      timestamp: "2025-03-21 12:46",
      mentor: {
        name: "김모호",
      },
    },
  ]);

  const handleApprove = (id: number) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, approved: true } : request
      )
    );
  };

  const handleReject = (id: number) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, approved: false } : request
      )
    );
  };

  const filteredRequests = requests.filter(
    (request) => request.category === "modification"
  );

  const totalPages = Math.ceil(filteredRequests.length / 5);
  const paginationItems: (number | string)[] = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => i + 1
  );
  if (totalPages > 5) {
    paginationItems.push("...");
    paginationItems.push(totalPages);
  }

  return (
    <PageLayout className="max-h-dvh overflow-y-auto">
      <div className="flex items-center mb-6">
        <Typography.H3>승인 요청 목록</Typography.H3>
      </div>

      <Tabs defaultValue="modification" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="modification" className="relative">
            멤버 정보 수정
            {MOCK_MODIFICATION_REQUEST_COUNT > 0 && (
              <Badge className="absolute z-10 -top-3 -right-3 w-5 h-5 rounded-full text-xs">
                {MOCK_MODIFICATION_REQUEST_COUNT}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approval" className="relative">
            멤버 승인
            {MOCK_APPROVAL_REQUEST_COUNT > 0 && (
              <Badge className="absolute z-10 -top-3 -right-3 w-5 h-5 rounded-full text-xs">
                {MOCK_APPROVAL_REQUEST_COUNT}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modification">
          <div className="space-y-4">
            {requests
              .filter((request) => request.category === "modification")
              .map((request) => (
                <ApplyItem
                  key={request.id}
                  applicant={request}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approval">
          <div className="space-y-4">
            {requests
              .filter((request) => request.category === "approval")
              .map((request) => (
                <ApplyItem
                  key={request.id}
                  applicant={request}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-center py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </PageLayout>
  );
}
