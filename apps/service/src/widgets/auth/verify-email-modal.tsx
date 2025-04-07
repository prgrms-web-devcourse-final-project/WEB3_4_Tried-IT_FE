import { zodResolver } from "@hookform/resolvers/zod";
import {
  ButtonWithLoading,
  Dialog,
  DialogContent,
  DialogDescription,
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

export interface VerifyEmailModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  onValidateEmailVerifyCode: (
    email: string,
    verifyCode: string
  ) => Promise<void>;
  onVerifySuccess: (verifyCode: string) => void;
  onVerifyFailure: (error: string) => void;
}

export function VerifyEmailModal({
  email,
  isOpen,
  onClose,
  onValidateEmailVerifyCode,
  onVerifySuccess,
  onVerifyFailure,
}: VerifyEmailModalProps) {
  const form = useForm<{ verifyCode: string }>({
    defaultValues: {
      verifyCode: "",
    },
    resolver: zodResolver(
      z.object({ verifyCode: z.string().min(1, "인증 코드를 입력해주세요.") })
    ),
  });

  const handleSubmit = async (data: { verifyCode: string }) => {
    try {
      await onValidateEmailVerifyCode(email, data.verifyCode);
      onVerifySuccess(data.verifyCode);
    } catch (error) {
      console.error(error);
      onVerifyFailure(
        error instanceof Error ? error.message : "오류가 발생했습니다."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent>
        <DialogTitle>이메일 인증</DialogTitle>
        <DialogDescription>
          {`${email} 이메일로 인증코드가 전송되었습니다. 전달받은 인증 코드를 입력해주세요.`}
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="verifyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>인증 코드</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonWithLoading
              className="w-full"
              type="submit"
              loading={form.formState.isSubmitting}
            >
              인증
            </ButtonWithLoading>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
