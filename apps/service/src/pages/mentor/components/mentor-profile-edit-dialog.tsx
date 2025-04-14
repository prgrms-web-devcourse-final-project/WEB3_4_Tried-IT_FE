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
  toast,
} from "@repo/ui";
import { Loader2, Trash2, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  UpdateMentorInfoParams,
  useUpdateMentorInfo,
} from "../hooks/use-update-mentor-info";

// 최대 첨부파일 수와 크기 제한
const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_SIZE_MB = 10;
const MAX_ATTACHMENT_SIZE_BYTES = MAX_ATTACHMENT_SIZE_MB * 1024 * 1024;

const mentorInfoFormSchema = z.object({
  jobId: z.coerce.number().min(1, { message: "직무를 선택해주세요." }),
  currentCompany: z.string().min(1, { message: "현재 직장을 입력해주세요." }),
  career: z.coerce.number().min(1, { message: "경력을 입력해주세요." }),
  introduction: z
    .string()
    .min(10, { message: "소개는 최소 10자 이상이어야 합니다." }),
  attachments: z.array(z.instanceof(File)).optional(),
});

type MentorInfoFormData = z.infer<typeof mentorInfoFormSchema>;

interface MentorProfileEditDialogProps {
  mentor: MentorModel;
  isOpen: boolean;
  onClose: () => void;
}

export function MentorProfileEditDialog({
  mentor,
  isOpen,
  onClose,
}: MentorProfileEditDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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
      attachments: [],
    },
  });

  // 직무명으로 직무 ID 찾기
  function getJobIdFromJobTitle(jobTitle: string, jobs: JobCategoryModel[]) {
    const job = jobs.find((job) => job.label === jobTitle);
    return parseInt(job?.id ?? "0");
  }

  // 파일 선택 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    let errorMessage = "";

    // 파일 수 및 크기 검증
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // 파일 크기 검증
      if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
        errorMessage = `파일 크기는 최대 ${MAX_ATTACHMENT_SIZE_MB}MB까지 가능합니다.`;
        continue;
      }

      // 최대 파일 수 검증
      if (selectedFiles.length + newFiles.length >= MAX_ATTACHMENTS) {
        errorMessage = `첨부파일은 최대 ${MAX_ATTACHMENTS}개까지 가능합니다.`;
        break;
      }

      newFiles.push(file);
    }

    if (errorMessage) {
      alert(errorMessage);
    }

    if (newFiles.length > 0) {
      const updatedFiles = [...selectedFiles, ...newFiles];
      setSelectedFiles(updatedFiles);
      form.setValue("attachments", updatedFiles);
    }

    // 입력 필드 초기화
    e.target.value = "";
  };

  // 파일 삭제 핸들러
  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    form.setValue("attachments", updatedFiles);
  };

  const handleSubmit = async (data: MentorInfoFormData) => {
    if (!user?.id) return;

    setIsSubmitting(true);

    try {
      const params: UpdateMentorInfoParams = {
        memberId: user.id,
        jobId: data.jobId,
        career: data.career,
        currentCompany: data.currentCompany,
        introduction: data.introduction,
        files: selectedFiles.length > 0 ? selectedFiles : undefined,
      };

      await updateMentorInfo.mutateAsync(params);

      toast.success(
        "멘토 정보가 성공적으로 수정되었습니다. 관리자의 승인 후 반영됩니다."
      );

      // 성공 후 다이얼로그 닫기
      onClose();
    } catch (error) {
      toast.error("멘토 정보 수정 중 오류가 발생했습니다.", {
        description:
          error instanceof Error ? error.message : JSON.stringify(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    // 제출 중일 때는 닫기 방지
    if (isSubmitting) return;

    if (!newOpen) {
      onClose();
    }
  };

  useEffect(() => {
    return () => {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 100);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>멘토 정보 수정</DialogTitle>
          <DialogDescription>
            멘토 정보를 수정합니다. 변경사항은 관리자 승인 후 적용됩니다.
          </DialogDescription>
        </DialogHeader>

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

            <FormField
              control={form.control}
              name="attachments"
              render={() => (
                <FormItem>
                  <FormLabel>첨부파일</FormLabel>
                  <div className="mt-1">
                    <label
                      htmlFor="attachments"
                      className="flex items-center gap-2 border border-input rounded-md p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Upload className="h-5 w-5" />
                      <span>
                        {selectedFiles.length > 0
                          ? `${selectedFiles.length}개 파일 선택됨`
                          : "파일을 선택해주세요."}
                      </span>
                      <input
                        id="attachments"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        multiple
                        disabled={isSubmitting}
                      />
                    </label>

                    {selectedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border rounded-md p-2"
                          >
                            <span className="text-sm truncate max-w-[350px]">
                              {file.name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFile(index)}
                              disabled={isSubmitting}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <FormDescription className="mt-1">
                      PDF, Word, 이미지 파일을 업로드해주세요. (최대{" "}
                      {MAX_ATTACHMENT_SIZE_MB}MB, 최대 {MAX_ATTACHMENTS}개)
                    </FormDescription>
                  </div>
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
