import { useApplicationDetail } from "@/pages/apply-approval/hooks/use-application-detail";
import { DateFormatter } from "@/shared/date/date-formatter";
import { StatusConst } from "@repo/api";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from "@repo/ui";
import MDEditor from "@uiw/react-md-editor";

interface ApplyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  applymentId: number;
}

export function ApplyDetailModal({
  isOpen,
  onClose,
  applymentId,
}: ApplyDetailModalProps) {
  const { applicationDetail, isLoading } = useApplicationDetail(applymentId);

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case StatusConst.APPROVED:
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            승인됨
          </Badge>
        );
      case StatusConst.REJECTED:
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            거절됨
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            대기중
          </Badge>
        );
    }
  };

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
    } catch (error) {
      console.error("파일 다운로드 오류:", error);
      alert("파일 다운로드에 실패했습니다.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto min-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>멘토 지원 상세 정보</span>
            {applicationDetail && getStatusBadge(applicationDetail.status)}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : applicationDetail ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500">기본 정보</h3>
              <div className="border rounded-md p-5 space-y-3">
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">이름</span>
                  <span className="text-sm col-span-2">
                    {applicationDetail.name}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">이메일</span>
                  <span className="text-sm col-span-2">
                    {applicationDetail.email}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">전화번호</span>
                  <span className="text-sm col-span-2">
                    {applicationDetail.phone}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">신청일</span>
                  <span className="text-sm col-span-2">
                    {
                      new DateFormatter(
                        applicationDetail.createdAt ?? new Date()
                      ).date
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500">직업 정보</h3>
              <div className="border rounded-md p-5 space-y-3">
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">직종</span>
                  <span className="text-sm col-span-2">
                    {applicationDetail.job?.jobName}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">경력</span>
                  <span className="text-sm col-span-2">
                    {applicationDetail.career}년
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">회사</span>
                  <span className="text-sm col-span-2">
                    {applicationDetail.currentCompany}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h3 className="text-sm font-semibold text-gray-500">자기소개</h3>
              <div className="border rounded-md p-5">
                <div className="rounded-md">
                  {applicationDetail.introduction ? (
                    <MDEditor.Markdown
                      className="bg-transparent!"
                      style={{
                        color: "var(--background-foreground)",
                      }}
                      source={applicationDetail.introduction}
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      자기소개가 없습니다.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h3 className="text-sm font-semibold text-gray-500">첨부파일</h3>
              <div className="border rounded-md p-5">
                {applicationDetail.attachments &&
                applicationDetail.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {applicationDetail.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-2 last:border-0"
                      >
                        <span className="text-sm">
                          {attachment.fileName || "파일명 없음"}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDownload(
                              attachment.fileUrl ?? "",
                              attachment.fileName || `file-${index}`
                            )
                          }
                        >
                          다운로드
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">첨부파일이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            정보를 불러오는데 실패했습니다.
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
