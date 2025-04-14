import { JobCategoryModel } from "@/entities/model/class/job-category.model";
import { MentorModel } from "@/entities/model/mentor/mentor.model";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useGetJobCategories } from "@/features/job/hooks/use-get-job-categories";
import { MarkdownEditor } from "@/widgets/markdown-editor";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  UpdateMentorInfoParams,
  useUpdateMentorInfo,
} from "../hooks/use-update-mentor-info";

const mentorInfoFormSchema = z.object({
  jobId: z.coerce.number().min(1, { message: "직무를 선택해주세요." }),
  currentCompany: z.string().min(1, { message: "현재 직장을 입력해주세요." }),
  career: z.coerce.number().min(1, { message: "경력을 입력해주세요." }),
  introduction: z
    .string()
    .min(10, { message: "소개는 최소 10자 이상이어야 합니다." }),
});

type MentorInfoFormData = z.infer<typeof mentorInfoFormSchema>;

interface MentorProfileEditDialogProps {
  mentor: MentorModel;
  trigger: React.ReactNode;
}

export function MentorProfileEditDialog({
  mentor,
  trigger,
}: MentorProfileEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const { data: jobCategories = [] } = useGetJobCategories();
  const updateMentorInfo = useUpdateMentorInfo();
  const { user } = useAuth();

  const form = useForm<MentorInfoFormData>({
    resolver: zodResolver(mentorInfoFormSchema),
    defaultValues: {
      jobId: getJobIdFromJobTitle(mentor.job, jobCategories),
      career: mentor.career,
      currentCompany: mentor.currentCompany,
      introduction: mentor.introduction,
    },
  });

  // 직무명으로 직무 ID 찾기
  function getJobIdFromJobTitle(jobTitle: string, jobs: JobCategoryModel[]) {
    const job = jobs.find((job) => job.label === jobTitle);
    return parseInt(job?.id ?? "0");
  }

  const handleSubmit = async (data: MentorInfoFormData) => {
    if (!user?.id) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      const params: UpdateMentorInfoParams = {
        memberId: user.id,
        ...data,
      };

      await updateMentorInfo.mutateAsync(params);

      setResult({
        success: true,
        message:
          "멘토 정보가 성공적으로 수정되었습니다. 관리자의 승인 후 반영됩니다.",
      });

      // 성공 후 3초 뒤에 다이얼로그 닫기
      setTimeout(() => {
        setOpen(false);
        setResult(null);
      }, 3000);
    } catch (error) {
      console.error("멘토 정보 수정 중 오류 발생:", error);
      setResult({
        success: false,
        message: "멘토 정보 수정 중 오류가 발생했습니다.",
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
        jobId: getJobIdFromJobTitle(mentor.job, jobCategories),
        currentCompany: mentor.currentCompany,
        introduction: mentor.introduction,
      });
    }

    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>멘토 정보 수정</DialogTitle>
          <DialogDescription>
            멘토 정보를 수정합니다. 변경사항은 관리자 승인 후 적용됩니다.
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
              name="jobId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>직무</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="직무를 선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobCategories.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    자신의 전문 분야와 가장 가까운 직무를 선택하세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="career"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>경력</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={isSubmitting}
                      min={0}
                      step={1}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>현재 직장</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormDescription>
                    현재 재직 중인 회사나 기관의 이름을 입력하세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>소개</FormLabel>
                  <FormControl>
                    <div className="min-h-[250px]">
                      <MarkdownEditor
                        value={field.value}
                        onChange={field.onChange}
                        height={200}
                        visibleDragbar={false}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    멘티들에게 보여질 자기소개와 경력사항을 작성하세요. 마크다운
                    문법을 사용하여 서식을 꾸밀 수 있습니다.
                  </FormDescription>
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
