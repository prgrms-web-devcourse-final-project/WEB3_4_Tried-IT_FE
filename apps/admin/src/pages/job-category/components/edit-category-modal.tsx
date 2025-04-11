import { JobCategoryModel } from "@/entities/job/job-category.model";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  label: z.string().min(1, "카테고리명을 입력해주세요"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditCategoryModalProps {
  category: JobCategoryModel;
  onUpdate: (label: string) => void;
  onClose: () => void;
}

export function EditCategoryModal({
  category,
  onUpdate,
  onClose,
}: EditCategoryModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: category.label,
    },
  });

  const handleSubmit = (values: FormValues) => {
    onUpdate(values.label);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>직무 카테고리 수정</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리명</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="카테고리명을 입력하세요" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button type="submit">저장</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
