import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonWithLoading,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@repo/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  label: z.string().min(1, "카테고리명을 입력해주세요"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCategoryModalProps {
  onAdd: (label: string) => Promise<void>;
}

export function AddCategoryModal({ onAdd }: AddCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    await onAdd(values.label);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>카테고리 추가</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 카테고리 추가</DialogTitle>
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                취소
              </Button>
              <ButtonWithLoading
                type="submit"
                loading={form.formState.isSubmitting}
              >
                추가
              </ButtonWithLoading>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
