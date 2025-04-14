import { MentoringPostModel } from "@/entities/model/mentoring-post/mentoring-post.model";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@repo/ui";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  UpdateMentoringPostParams,
  useUpdateMentoringPost,
} from "../hooks/use-update-mentoring-post";

const mentoringPostSchema = z.object({
  title: z.string().min(2, { message: "제목은 최소 2자 이상이어야 합니다." }),
  content: z
    .string()
    .min(10, { message: "내용은 최소 10자 이상이어야 합니다." }),
  price: z.coerce.number().min(0, { message: "가격은 0원 이상이어야 합니다." }),
  stack: z.string().min(1, { message: "기술 스택을 입력해주세요." }),
});

type MentoringPostFormData = z.infer<typeof mentoringPostSchema>;

interface MentoringPostEditDialogProps {
  post: MentoringPostModel;
  trigger: React.ReactNode;
}

export function MentoringPostEditDialog({
  post,
  trigger,
}: MentoringPostEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const updateMentoringPost = useUpdateMentoringPost();

  const form = useForm<MentoringPostFormData>({
    resolver: zodResolver(mentoringPostSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      price: post.price,
      stack: post.stack,
    },
  });

  const handleSubmit = async (data: MentoringPostFormData) => {
    setIsSubmitting(true);
    setResult(null);

    try {
      const params: UpdateMentoringPostParams = {
        classId: post.classId.toString(),
        title: data.title,
        content: data.content,
        price: data.price,
        stack: data.stack.split(",").map((s) => s.trim()),
      };

      await updateMentoringPost.mutateAsync(params);

      setResult({
        success: true,
        message: "멘토링 글이 성공적으로 수정되었습니다.",
      });

      // 성공 후 2초 뒤에 다이얼로그 닫기
      setTimeout(() => {
        setOpen(false);
        setResult(null);
      }, 2000);
    } catch (error) {
      console.error("멘토링 글 수정 중 오류 발생:", error);
      setResult({
        success: false,
        message: "멘토링 글 수정 중 오류가 발생했습니다.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    // 제출 중일 때는 닫기 방지
    if (isSubmitting) return;

    if (!newOpen) {
      // 닫을 때 상태 초기화
      setResult(null);
      form.reset({
        title: post.title,
        content: post.content,
        price: post.price,
        stack: post.stack,
      });
    }

    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>멘토링 글 수정</DialogTitle>
          <DialogDescription>
            등록한 멘토링 글의 정보를 수정합니다.
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
            <span>{result.message}</span>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>기술 스택</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormDescription>
                    기술 스택을 쉼표(,)로 구분하여 입력하세요. 예: React,
                    TypeScript, Next.js
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>가격 (원)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>내용</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-32"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : null}
                저장
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
