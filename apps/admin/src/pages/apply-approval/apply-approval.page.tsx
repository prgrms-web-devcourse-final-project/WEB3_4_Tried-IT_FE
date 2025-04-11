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

import { toast } from "@repo/ui";
import { ApplyItem } from "./components/apply-item";
import { useApprovalRequests } from "./hooks/use-approval-requests";

export function ApplyApprovalPage() {
  const { requests, approveRequest, rejectRequest } = useApprovalRequests();

  const handleApprove = (id: number, category: "modification" | "approval") => {
    approveRequest(
      { id, category },
      {
        onSuccess: () => {
          toast.success("승인되었습니다.");
        },
        onError: () => {
          toast.error("승인 처리 중 오류가 발생했습니다.");
        },
      }
    );
  };

  const handleReject = (id: number, category: "modification" | "approval") => {
    rejectRequest(
      { id, category },
      {
        onSuccess: () => {
          toast.success("거절되었습니다.");
        },
        onError: () => {
          toast.error("거절 처리 중 오류가 발생했습니다.");
        },
      }
    );
  };

  const modificationRequests = requests.filter(
    (request) => request.category === "modification"
  );
  const approvalRequests = requests.filter(
    (request) => request.category === "approval"
  );

  return (
    <PageLayout className="max-h-dvh overflow-y-auto">
      <div className="flex items-center mb-6">
        <Typography.H3>승인 요청 목록</Typography.H3>
      </div>

      <Tabs defaultValue="modification" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="modification" className="relative">
            멤버 정보 수정
            {modificationRequests.length > 0 && (
              <Badge className="absolute z-10 -top-3 -right-3 w-5 h-5 rounded-full text-xs">
                {modificationRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approval" className="relative">
            멤버 승인
            {approvalRequests.length > 0 && (
              <Badge className="absolute z-10 -top-3 -right-3 w-5 h-5 rounded-full text-xs">
                {approvalRequests.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modification">
          <div className="space-y-4">
            {modificationRequests.map((request) => (
              <ApplyItem
                key={request.id}
                applicant={request}
                onApprove={() => handleApprove(request.id, "modification")}
                onReject={() => handleReject(request.id, "modification")}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approval">
          <div className="space-y-4">
            {approvalRequests.map((request) => (
              <ApplyItem
                key={request.id}
                applicant={request}
                onApprove={() => handleApprove(request.id, "approval")}
                onReject={() => handleReject(request.id, "approval")}
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
