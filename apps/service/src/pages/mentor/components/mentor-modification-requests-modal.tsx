import { usePagination } from "@/widgets/pagination";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui";
import { FileText, Info } from "lucide-react";
import { Suspense, useState } from "react";
import {
  ModificationRequest,
  useGetMentorInfoModificationRequests,
} from "../hooks/use-get-mentor-info-modification-requests";

interface MentorModificationRequestsModalProps {
  trigger: React.ReactNode;
}

export function MentorModificationRequestsModal({
  trigger,
}: MentorModificationRequestsModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>멘토 정보 수정 요청 내역</DialogTitle>
          <DialogDescription>
            멘토 정보 수정 요청 목록과 처리 상태를 확인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="PENDING">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="PENDING">대기중</TabsTrigger>
            <TabsTrigger value="APPROVED">승인됨</TabsTrigger>
            <TabsTrigger value="REJECTED">거절됨</TabsTrigger>
          </TabsList>
          <TabsContent value="PENDING">
            <Suspense fallback={<ModificationRequestsLoadingSkeleton />}>
              <ModificationRequestsContent status="PENDING" />
            </Suspense>
          </TabsContent>
          <TabsContent value="APPROVED">
            <Suspense fallback={<ModificationRequestsLoadingSkeleton />}>
              <ModificationRequestsContent status="APPROVED" />
            </Suspense>
          </TabsContent>
          <TabsContent value="REJECTED">
            <Suspense fallback={<ModificationRequestsLoadingSkeleton />}>
              <ModificationRequestsContent status="REJECTED" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

interface ModificationRequestsContentProps {
  status: "PENDING" | "APPROVED" | "REJECTED";
}

function ModificationRequestsContent({
  status,
}: ModificationRequestsContentProps) {
  const { page, setPage } = usePagination();
  const { data } = useGetMentorInfoModificationRequests({
    status,
    page,
    size: 10, // 고정 사이즈 사용
  });

  const { requests, pagination } = data;

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Info className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">요청 내역이 없습니다</p>
        <p className="text-muted-foreground">
          {status === "PENDING"
            ? "현재 처리 대기 중인 수정 요청이 없습니다."
            : status === "APPROVED"
              ? "승인된 수정 요청 내역이 없습니다."
              : "거절된 수정 요청 내역이 없습니다."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">요청 날짜</TableHead>
              <TableHead>수정된 항목</TableHead>
              <TableHead className="w-[100px] text-right">상태</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <RequestRow key={request.requestId} request={request} />
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(Math.max(1, page - 1))}
                  className={
                    page <= 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    Math.abs(p - page) < 2 ||
                    p === 1 ||
                    p === pagination.totalPages
                )
                .map((p, i, arr) => {
                  // 페이지 사이에 건너뛰는 경우 ... 표시
                  if (i > 0 && p > arr[i - 1] + 1) {
                    return (
                      <PaginationItem key={`ellipsis-${p}`}>
                        <span className="px-4">...</span>
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={page === p}
                        onClick={() => setPage(p)}
                        className="cursor-pointer"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage(Math.min(pagination.totalPages, page + 1))
                  }
                  className={
                    page >= pagination.totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

interface RequestRowProps {
  request: ModificationRequest;
}

function RequestRow({ request }: RequestRowProps) {
  const [detailOpen, setDetailOpen] = useState(false);

  // 수정된 필드들을 문자열로 변환
  const modifiedFieldsText = Object.keys(request.modifiedFields)
    .filter(
      (key) =>
        !!request.modifiedFields[key as keyof typeof request.modifiedFields]
    )
    .map((key) => {
      switch (key) {
        case "career":
          return "경력";
        case "currentCompany":
          return "직장";
        case "introduction":
          return "소개";
        case "jobId":
          return "직무";
        default:
          return key;
      }
    })
    .join(", ");

  return (
    <>
      <TableRow>
        <TableCell>{request.requestDate.date}</TableCell>
        <TableCell>{modifiedFieldsText}</TableCell>
        <TableCell className="text-right">
          <StatusBadge status={request.status} />
        </TableCell>
        <TableCell>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDetailOpen(!detailOpen)}
          >
            <FileText className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

      {detailOpen && (
        <TableRow>
          <TableCell colSpan={4} className="bg-muted/20">
            <div className="p-4">
              <h4 className="font-medium mb-3">수정 상세 내역</h4>

              {request.modifiedFields.jobId && (
                <div className="mb-3">
                  <div className="font-medium mb-1">직무</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        이전
                      </div>
                      <div>{request.modifiedFields.jobId.before}</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        변경
                      </div>
                      <div>{request.modifiedFields.jobId.after}</div>
                    </div>
                  </div>
                </div>
              )}

              {request.modifiedFields.career && (
                <div className="mb-3">
                  <div className="font-medium mb-1">경력</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        이전
                      </div>
                      <div>{request.modifiedFields.career.before}년</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        변경
                      </div>
                      <div>{request.modifiedFields.career.after}년</div>
                    </div>
                  </div>
                </div>
              )}

              {request.modifiedFields.currentCompany && (
                <div className="mb-3">
                  <div className="font-medium mb-1">현재 직장</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        이전
                      </div>
                      <div>{request.modifiedFields.currentCompany.before}</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        변경
                      </div>
                      <div>{request.modifiedFields.currentCompany.after}</div>
                    </div>
                  </div>
                </div>
              )}

              {request.modifiedFields.introduction && (
                <div>
                  <div className="font-medium mb-1">소개</div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        이전
                      </div>
                      <div className="whitespace-pre-wrap">
                        {request.modifiedFields.introduction.before}
                      </div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        변경
                      </div>
                      <div className="whitespace-pre-wrap">
                        {request.modifiedFields.introduction.after}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "APPROVED":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
        >
          승인됨
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
        >
          거절됨
        </Badge>
      );
    case "PENDING":
    default:
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200"
        >
          대기중
        </Badge>
      );
  }
}

function ModificationRequestsLoadingSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">요청 날짜</TableHead>
            <TableHead>수정된 항목</TableHead>
            <TableHead className="w-[100px] text-right">상태</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-24 bg-muted/30" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32 bg-muted/30" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-6 w-16 ml-auto bg-muted/30" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-8 bg-muted/30" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
