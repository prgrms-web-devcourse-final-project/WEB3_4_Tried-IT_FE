import { DuplicateError } from "@/app/errors/duplicate.error";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CustomPasswordInput,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
} from "@repo/ui";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupFormSchema = z
  .object({
    email: z
      .string()
      .nonempty({
        message: "이메일을 입력해주세요.",
      })
      .email({
        message: "이메일 형식이 올바르지 않습니다.",
      }),
    password: z
      .string()
      .nonempty({
        message: "비밀번호를 입력해주세요.",
      })
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(16, {
        message: "비밀번호는 16자 이하여야 합니다.",
      })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
      }),
    confirmPassword: z.string().min(1, {
      message: "비밀번호 확인을 입력해주세요.",
    }),
    name: z.string().min(1, {
      message: "이름을 입력해주세요.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });

export type SignupFormData = z.infer<typeof signupFormSchema>;

interface SignupFormProps {
  onValidateNameDuplicate: (name: string) => Promise<void>;
  onValidateEmailDuplicate: (email: string) => Promise<void>;
  onValidateEmailAuth: (email: string) => Promise<void>;
  onSubmit: (email: string, password: string, name: string) => void;
}

// TODO: Validation 과정 구체화
export function SignupForm({
  onValidateNameDuplicate,
  onValidateEmailDuplicate,
  onValidateEmailAuth,
  onSubmit,
}: SignupFormProps) {
  const [isValidating, setIsValidating] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    mode: "onChange",
    resolver: zodResolver(signupFormSchema),
  });

  const isSubmitDisabled = useMemo(() => {
    return (
      form.formState.isSubmitting ||
      form.formState.isValidating ||
      !form.formState.isValid ||
      isValidating
    );
  }, [form.formState, isValidating]);

  const handleSubmit = (data: SignupFormData) => {
    onSubmit(data.email, data.password, data.name);
  };

  const handleValidateNameDuplicate = async (name: string) => {
    try {
      setIsValidating(true);
      await onValidateNameDuplicate(name);
    } catch (error) {
      if (error instanceof DuplicateError) {
        form.setError("name", { message: "이미 사용중인 닉네임입니다." });
      } else {
        console.error(error);
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleValidateEmailDuplicate = async (email: string) => {
    try {
      setIsValidating(true);
      await onValidateEmailDuplicate(email);
    } catch (error) {
      if (error instanceof DuplicateError) {
        form.setError("email", { message: "이미 사용중인 이메일입니다." });
      } else {
        console.error(error);
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleValidateEmailAuth = async (email: string) => {
    try {
      setIsValidating(true);
      await onValidateEmailAuth(email);
    } catch (error) {
      console.error(error);
      form.setError("email", { message: "이메일 인증에 실패했습니다." });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <div>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => handleValidateNameDuplicate(field.value)}
                    >
                      중복 확인
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => handleValidateEmailDuplicate(field.value)}
                    >
                      중복 확인
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => handleValidateEmailAuth(field.value)}
                    >
                      이메일 인증
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <CustomPasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <CustomPasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />
          <Button
            variant="gradient"
            className="w-full"
            type="submit"
            disabled={isSubmitDisabled}
          >
            회원가입
          </Button>
        </div>
      </form>
    </Form>
  );
}
