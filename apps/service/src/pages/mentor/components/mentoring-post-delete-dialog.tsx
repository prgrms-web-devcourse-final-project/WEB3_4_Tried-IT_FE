import { MentoringPostModel } from "@/entities/model/mentoring-post/mentoring-post.model";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  toast,
} from "@repo/ui";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  DeleteMentoringPostParams,
  useDeleteMentoringPost,
} from "../hooks/use-delete-mentoring-post";

interface MentoringPostDeleteDialogProps {
  post: MentoringPostModel;
  trigger: React.ReactNode;
}

export function MentoringPostDeleteDialog({
  post,
  trigger,
}: MentoringPostDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const deleteMentoringPost = useDeleteMentoringPost();

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      const params: DeleteMentoringPostParams = {
        classId: post.classId.toString(),
      };

      await deleteMentoringPost.mutateAsync(params);

      toast.success("멘토링 글이 성공적으로 삭제되었습니다.");

      setOpen(false);
    } catch (error) {
      console.error("멘토링 글 삭제 중 오류 발생:", error);
      toast.error("멘토링 글 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>멘토링 글 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            정말로 이 멘토링 글을 삭제하시겠습니까? 이 작업은 되돌릴 수
            없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mb-4 p-4 border rounded-md bg-amber-50">
          <p className="font-medium text-amber-800">{post.title}</p>
          <p className="text-sm text-amber-700 mt-1">
            {post.stack} | {post.formattedPrice}
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
                handleDelete();
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : null}
              삭제
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
