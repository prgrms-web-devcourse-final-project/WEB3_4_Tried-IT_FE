import { useGetMentorInfoModificationRequest } from "@/features/mentor-modification-request/use-get-mentor-info-modification-requests";
import { useGetJobCategories } from "@/pages/job-category/hooks/use-get-job-categories";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@repo/ui";
import MDEditor from "@uiw/react-md-editor";
import { Download, FileText } from "lucide-react";
import { Suspense, useState } from "react";

interface MentorModificationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: number;
  proposalId: number;
}

export function MentorModificationDetailModal({
  isOpen,
  onClose,
  memberId,
  proposalId,
}: MentorModificationDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto w-[92vw] p-3 sm:p-6 max-w-full">
        <DialogHeader>
          <DialogTitle>멘토 정보 수정 요청 내역</DialogTitle>
          <DialogDescription>
            멘토 정보 수정 요청 목록과 처리 상태를 확인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <Suspense fallback={<ModificationRequestsLoadingSkeleton />}>
          <ModificationRequestsContent
            memberId={memberId}
            proposalId={proposalId}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}

interface ModificationRequestsContentProps {
  memberId: number;
  proposalId: number;
}

function ModificationRequestsContent({
  memberId,
  proposalId,
}: ModificationRequestsContentProps) {
  const { data } = useGetMentorInfoModificationRequest({
    memberId,
    proposalId,
  });

  return (
    <div>
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableBody>{data && <RequestRow request={data} />}</TableBody>
        </Table>
      </div>
    </div>
  );
}

interface RequestRowProps {
  request: NonNullable<
    Awaited<ReturnType<typeof useGetMentorInfoModificationRequest>>["data"]
  >;
}

function RequestRow({ request }: RequestRowProps) {
  const { data: jobCategories } = useGetJobCategories();
  const [detailOpen, setDetailOpen] = useState(true);

  // 파일 다운로드 처리 함수
  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const fullUrl = `${import.meta.env.VITE_API_URL}${fileUrl}`;
      const response = await fetch(fullUrl, {
        method: "GET",
        credentials: "include", // 쿠키를 포함하여 요청
      });

      if (!response.ok) {
        throw new Error("파일 다운로드에 실패했습니다.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // 리소스 정리
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast.success("파일 다운로드가 완료되었습니다.");
    } catch (error) {
      console.error("파일 다운로드 오류:", error);
      toast.error("파일 다운로드에 실패했습니다.");
    }
  };

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
        case "attachments":
          return "첨부파일";
        default:
          return key;
      }
    })
    .join(", ");

  // 파일명 축약 함수
  const truncateFileName = (fileName: string, maxLength: number = 40) => {
    if (!fileName) return "파일명 없음";
    if (fileName.length <= maxLength) return fileName;

    const extension =
      fileName.lastIndexOf(".") > 0
        ? fileName.substring(fileName.lastIndexOf("."))
        : "";

    const nameWithoutExt = fileName.substring(
      0,
      fileName.lastIndexOf(".") > 0
        ? fileName.lastIndexOf(".")
        : fileName.length
    );
    const truncatedName =
      nameWithoutExt.substring(0, maxLength - 3 - extension.length) + "...";

    return truncatedName + extension;
  };

  return (
    <>
      <TableRow>
        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
          {request.requestDate.date}
        </TableCell>
        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
          {modifiedFieldsText}
        </TableCell>
        <TableCell className="text-right text-xs sm:text-sm py-2 sm:py-4">
          <StatusBadge status={request.status} />
        </TableCell>
        <TableCell className="py-2 sm:py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDetailOpen(!detailOpen)}
            className="p-1 sm:p-2"
          >
            <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </TableCell>
      </TableRow>

      {detailOpen && (
        <TableRow>
          <TableCell colSpan={4} className="bg-muted/20 p-2 sm:p-4">
            <div className="overflow-x-auto">
              <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                수정 상세 내역
              </h4>

              {request.modifiedFields.jobId && (
                <div className="mb-2 sm:mb-3">
                  <div className="font-medium mb-1 text-xs sm:text-sm">
                    직무
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        이전
                      </div>
                      <div className="text-xs sm:text-sm">
                        {
                          jobCategories?.find(
                            (category) =>
                              category.id ===
                              request.modifiedFields.jobId?.before.toString()
                          )?.label
                        }
                      </div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        변경
                      </div>
                      <div className="text-xs sm:text-sm">
                        {
                          jobCategories?.find(
                            (category) =>
                              category.id ===
                              request.modifiedFields.jobId?.after.toString()
                          )?.label
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {request.modifiedFields.career && (
                <div className="mb-2 sm:mb-3">
                  <div className="font-medium mb-1 text-xs sm:text-sm">
                    경력
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        이전
                      </div>
                      <div className="text-xs sm:text-sm">
                        {request.modifiedFields.career.before}년
                      </div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        변경
                      </div>
                      <div className="text-xs sm:text-sm">
                        {request.modifiedFields.career.after}년
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {request.modifiedFields.currentCompany && (
                <div className="mb-2 sm:mb-3">
                  <div className="font-medium mb-1 text-xs sm:text-sm">
                    현재 직장
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        이전
                      </div>
                      <div className="text-xs sm:text-sm">
                        {request.modifiedFields.currentCompany.before}
                      </div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        변경
                      </div>
                      <div className="text-xs sm:text-sm">
                        {request.modifiedFields.currentCompany.after}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {request.modifiedFields.introduction && (
                <div className="mb-2 sm:mb-3">
                  <div className="font-medium mb-1 text-xs sm:text-sm">
                    소개
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        이전
                      </div>
                      <div className="whitespace-pre-wrap text-xs sm:text-sm">
                        <MDEditor.Markdown
                          className="bg-transparent!"
                          source={request.modifiedFields.introduction.before}
                        />
                      </div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">
                        변경
                      </div>
                      <div className="whitespace-pre-wrap text-xs sm:text-sm">
                        <MDEditor.Markdown
                          className="bg-transparent!"
                          source={request.modifiedFields.introduction.after}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {request.modifiedFields.attachments &&
                request.modifiedFields.attachments.length > 0 && (
                  <div>
                    <div className="font-medium mb-1 text-xs sm:text-sm">
                      첨부파일
                    </div>
                    <div className="p-2 bg-muted/30 rounded-md">
                      <div className="space-y-2">
                        {request.modifiedFields.attachments.map(
                          (attachment, index) => (
                            <div
                              key={index}
                              className="flex flex-col sm:flex-row sm:items-center border-b pb-2 last:border-0 break-all"
                            >
                              <div className="min-w-0 w-full mb-2 sm:mb-0 sm:mr-2">
                                <span
                                  className="text-xs sm:text-sm block truncate"
                                  title={attachment.fileName || "파일명 없음"}
                                >
                                  {truncateFileName(
                                    attachment.fileName || "파일명 없음",
                                    40
                                  )}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleDownload(
                                    attachment.fileUrl ?? "",
                                    attachment.fileName || `file-${index}`
                                  )
                                }
                                className="flex items-center justify-center gap-1 shrink-0 text-xs h-8 w-full sm:w-auto"
                              >
                                <Download className="h-3 w-3" />
                                <span>다운로드</span>
                              </Button>
                            </div>
                          )
                        )}
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
          className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 text-xs px-1.5 py-0 sm:px-2 sm:py-0.5"
        >
          승인됨
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200 text-xs px-1.5 py-0 sm:px-2 sm:py-0.5"
        >
          거절됨
        </Badge>
      );
    case "PENDING":
    default:
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200 text-xs px-1.5 py-0 sm:px-2 sm:py-0.5"
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
            <TableHead className="w-[90px] sm:w-[100px] text-xs sm:text-sm">
              요청 날짜
            </TableHead>
            <TableHead className="text-xs sm:text-sm">수정된 항목</TableHead>
            <TableHead className="w-[80px] sm:w-[100px] text-right text-xs sm:text-sm">
              상태
            </TableHead>
            <TableHead className="w-[50px] sm:w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-3 sm:h-4 w-16 sm:w-24 bg-muted/30" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 sm:h-4 w-24 sm:w-32 bg-muted/30" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 sm:h-6 w-12 sm:w-16 ml-auto bg-muted/30" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 sm:h-8 w-6 sm:w-8 bg-muted/30" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
