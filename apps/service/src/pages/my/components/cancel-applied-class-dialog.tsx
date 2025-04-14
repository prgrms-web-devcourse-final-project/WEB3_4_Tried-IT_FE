import { AppliedClassModel } from "@/entities/model/applied-class/applied-class.model";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  toast,
} from "@repo/ui";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  CancelAppliedClassParams,
  useCancelAppliedClass,
} from "../hooks/use-cancel-applied-class";

interface CancelAppliedClassDialogProps {
  appliedClass: AppliedClassModel;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CancelAppliedClassDialog({
  appliedClass,
  isOpen,
  onOpenChange,
}: CancelAppliedClassDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cancelAppliedClass = useCancelAppliedClass();

  const handleCancel = async () => {
    setIsSubmitting(true);

    try {
      const params: CancelAppliedClassParams = {
        applyId: appliedClass.id,
      };

      await cancelAppliedClass.mutateAsync(params);

      toast.success("멘토링 신청이 성공적으로 취소되었습니다.");
      onOpenChange(false);
    } catch (error) {
      console.error("멘토링 신청 취소 중 오류 발생:", error);
      toast.error("멘토링 신청 취소 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>멘토링 신청 취소</AlertDialogTitle>
          <AlertDialogDescription>
            정말로 이 멘토링 신청을 취소하시겠습니까? 이 작업은 되돌릴 수
            없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mb-4 p-4 border rounded-md bg-amber-50">
          <p className="font-medium text-amber-800">
            멘토: {appliedClass.mentor.name}
          </p>
          <p className="text-sm text-amber-700 mt-1">
            문의: {appliedClass.inquiry}
          </p>
          <p className="text-sm text-amber-700 mt-1">
            예약일: {appliedClass.scheduleFormatter.fullDateTime}
          </p>
          <p className="text-sm text-amber-700 mt-1">
            상태: {appliedClass.statusLabel}
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={isSubmitting}>
              취소
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={(e) => {
                e.preventDefault(); // AlertDialog의 자동 닫힘 방지
                handleCancel();
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : null}
              신청 취소
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
