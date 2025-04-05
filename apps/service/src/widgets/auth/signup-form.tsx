import { DuplicateError } from "@/app/errors/duplicate.error";
import { VerifyEmailModal } from "@/widgets/auth/verify-email-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonWithLoading,
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
import { overlay } from "overlay-kit";
import { useEffect, useMemo, useState } from "react";
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
    emailDuplicateChecked: z.boolean().refine((val) => val === true, {
      message: "이메일 중복 확인이 필요합니다.",
    }),
    verifyCode: z.string().min(1, {
      message: "이메일 코드를 인증해주세요.",
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
    nickname: z.string().min(1, {
      message: "닉네임을 입력해주세요.",
    }),
    nicknameDuplicateChecked: z.boolean().refine((val) => val === true, {
      message: "닉네임 중복 확인이 필요합니다.",
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
  onValidateNicknameDuplicate: (name: string) => Promise<void>;
  onValidateEmailDuplicate: (email: string) => Promise<void>;
  onValidateEmailAuth: (email: string) => Promise<void>;
  onValidateEmailVerifyCode: (
    email: string,
    verifyCode: string
  ) => Promise<void>;
  onSubmit: (formData: SignupFormData) => Promise<void>;
}

// TODO: Validation 과정 구체화
export function SignupForm({
  onValidateNicknameDuplicate,
  onValidateEmailDuplicate,
  onValidateEmailAuth,
  onValidateEmailVerifyCode,
  onSubmit,
}: SignupFormProps) {
  const [isValidating, setIsValidating] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      nickname: "",
    },
    mode: "onChange",
    resolver: zodResolver(signupFormSchema),
  });

  const watchedEmail = form.watch("email");
  const watchedNickname = form.watch("nickname");

  useEffect(() => {
    form.setValue("emailDuplicateChecked", false);
  }, [form, watchedEmail]);

  useEffect(() => {
    form.setValue("nicknameDuplicateChecked", false);
  }, [form, watchedNickname]);

  const isSubmitDisabled = useMemo(() => {
    // TODO 임시로 무조건 false

    return false;
    // return (
    //   form.formState.isSubmitting ||
    //   form.formState.isValidating ||
    //   !form.formState.isValid ||
    //   isValidating
    // );
  }, [form.formState, isValidating]);

  const handleSubmit = (data: SignupFormData) => {
    onSubmit(data);
  };

  const handleValidateNameDuplicate = async (name: string) => {
    try {
      setIsValidating(true);
      await onValidateNicknameDuplicate(name);
      form.clearErrors("nicknameDuplicateChecked");
      form.setValue("nicknameDuplicateChecked", true);
    } catch (error) {
      if (error instanceof DuplicateError) {
        form.setError("nicknameDuplicateChecked", {
          message: "이미 사용중인 닉네임입니다.",
        });
      } else {
        console.error(error);
        form.setError("nicknameDuplicateChecked", {
          message: `알수 없는 에러: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
        });
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleValidateEmailDuplicate = async (email: string) => {
    try {
      setIsValidating(true);
      await onValidateEmailDuplicate(email);
      form.clearErrors("emailDuplicateChecked");
      form.setValue("emailDuplicateChecked", true);
    } catch (error) {
      if (error instanceof DuplicateError) {
        form.setError("emailDuplicateChecked", {
          message: "이미 사용중인 이메일입니다.",
        });
      } else {
        console.error(error);
        form.setError("emailDuplicateChecked", {
          message: `알수 없는 에러: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
        });
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleValidateEmailAuth = async (email: string) => {
    try {
      setIsValidating(true);
      await onValidateEmailAuth(email);

      const verifiedCode = await overlay.openAsync<string | null>(
        ({ isOpen, close }) => (
          <VerifyEmailModal
            email={email}
            isOpen={isOpen}
            onClose={() => {
              close(null);
            }}
            onVerifySuccess={(verifyCode) => {
              close(verifyCode);
            }}
            onVerifyFailure={(error) => {
              console.error(error);
            }}
            onValidateEmailVerifyCode={onValidateEmailVerifyCode}
          />
        ),
        {
          overlayId: "email-verify-code-input",
        }
      );

      if (verifiedCode) {
        form.setValue("verifyCode", verifiedCode);
      } else {
        form.setError("verifyCode", { message: "이메일 인증에 실패했습니다." });
      }
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
                <FormLabel>이름</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
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
                    <Input type="email" autoComplete="email" {...field} />
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
                <FormMessage>
                  {form.formState.errors.emailDuplicateChecked &&
                    form.formState.errors.emailDuplicateChecked.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <div>
                    <ButtonWithLoading
                      variant="outline"
                      type="button"
                      onClick={() => handleValidateNameDuplicate(field.value)}
                    >
                      중복 확인
                    </ButtonWithLoading>
                  </div>
                </div>
                <FormMessage>
                  {form.formState.errors.nicknameDuplicateChecked &&
                    form.formState.errors.nicknameDuplicateChecked.message}
                </FormMessage>
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
