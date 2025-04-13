import { MenteeRequestStatus } from "@/entities/model/mentee-request/mentee-request-status.enum";
import { MenteeRequestModel } from "@/entities/model/mentee-request/mentee-request.model";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import {
  HandleMenteeRequestParams,
  useHandleMenteeRequest,
} from "../hooks/use-handle-mentee-request";

interface MenteeRequestDialogProps {
  menteeRequest: MenteeRequestModel;
  trigger: React.ReactNode;
}

export function MenteeRequestDialog({
  menteeRequest,
  trigger,
}: MenteeRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    action: string;
  } | null>(null);
  const handleMenteeRequest = useHandleMenteeRequest();

  const handleAction = async (status: Omit<MenteeRequestStatus, "PENDING">) => {
    setIsSubmitting(true);
    setResult(null);

    try {
      const params: HandleMenteeRequestParams = {
        applyId: menteeRequest.applymentId,
        status,
      };

      await handleMenteeRequest.mutateAsync(params);

      setResult({
        success: true,
        action: status === MenteeRequestStatus.APPROVED ? "승인" : "거절",
      });

      // 성공 후 3초 뒤에 다이얼로그 닫기
      setTimeout(() => {
        setOpen(false);
        setResult(null);
      }, 1500);
    } catch (error) {
      console.error("멘티 요청 처리 중 오류 발생:", error);
      setResult({
        success: false,
        action: status === MenteeRequestStatus.APPROVED ? "승인" : "거절",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = () => handleAction(MenteeRequestStatus.APPROVED);
  const handleReject = () => handleAction(MenteeRequestStatus.REJECTED);

  const handleOpenChange = (newOpen: boolean) => {
    // 제출 중일 때는 닫기 방지
    if (isSubmitting) return;

    if (!newOpen) {
      // 닫을 때 상태 초기화
      setResult(null);
    }

    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>멘티 요청 관리</DialogTitle>
          <DialogDescription>
            {menteeRequest.nickname}님의 멘토링 요청을 처리합니다.
          </DialogDescription>
        </DialogHeader>

        {/* 결과 표시 */}
        {result && (
          <div
            className={`p-4 rounded-md mb-4 flex items-center gap-2 ${result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
          >
            {result.success ? (
              <CheckCircle className="size-5" />
            ) : (
              <XCircle className="size-5" />
            )}
            <span>
              {result.success
                ? `요청이 성공적으로 ${result.action}되었습니다.`
                : `요청 ${result.action} 중 오류가 발생했습니다.`}
            </span>
          </div>
        )}

        <div className="p-4 border rounded-md bg-muted/20 mb-4">
          <div className="mb-3">
            <span className="font-semibold">멘티:</span>{" "}
            {menteeRequest.nickname}
          </div>
          <div className="mb-3">
            <span className="font-semibold">일정:</span>{" "}
            {menteeRequest.scheduleFormatter.fullDateTime}
          </div>
          <div className="mb-3">
            <span className="font-semibold">문의내용:</span>
            <p className="mt-1">{menteeRequest.inquiry}</p>
          </div>
          <div>
            <span className="font-semibold">현재 상태:</span>{" "}
            <span
              className={`font-medium ${menteeRequest.isPending ? "text-yellow-500" : menteeRequest.isApproved ? "text-green-500" : "text-red-500"}`}
            >
              {menteeRequest.statusText}
            </span>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between">
          {menteeRequest.isPending && !result && (
            <div className="flex gap-2 w-full">
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : null}
                거절하기
              </Button>
              <Button
                onClick={handleApprove}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : null}
                승인하기
              </Button>
            </div>
          )}
          {(!menteeRequest.isPending || result) && (
            <div className="w-full">
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isSubmitting}
                className="w-full"
              >
                닫기
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
