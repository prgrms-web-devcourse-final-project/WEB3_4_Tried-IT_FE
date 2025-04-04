import { SignupFormData } from "@/widgets/auth/signup-form";
import { dementorApiFetchers } from "@repo/api";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const { mutateAsync: signup, isPending } = useMutation({
    mutationFn: (data: SignupFormData) => {
      return dementorApiFetchers.auth.signUp({
        body: {
          email: data.email,
          name: data.name,
          nickname: data.nickname,
          password: data.password,
          verifyCode: data.verifyCode,
        },
      });
    },
  });

  const { mutateAsync: validateEmail, isPending: isValidateEmailPending } =
    useMutation({
      mutationFn: (email: string) => {
        return dementorApiFetchers.auth.validateEmail({
          queryParam: { email },
        });
      },
    });

  const {
    mutateAsync: sendEmailVerifyCode,
    isPending: isSendEmailVerifyCodePending,
  } = useMutation({
    mutationFn: (email: string) => {
      return dementorApiFetchers.auth.requestSignUpVerifyCode({
        queryParam: { email },
      });
    },
  });

  const {
    mutateAsync: verifyEmailVerifyCode,
    isPending: isVerifyEmailVerifyCodePending,
  } = useMutation({
    mutationFn: (data: { email: string; verifyCode: string }) => {
      return dementorApiFetchers.auth.verifySignUpVerifyCode({
        queryParam: {
          email: data.email,
          verifyCode: data.verifyCode,
        },
      });
    },
  });

  const {
    mutateAsync: validateNickname,
    isPending: isValidateNicknamePending,
  } = useMutation({
    mutationFn: (nickname: string) => {
      return dementorApiFetchers.auth.validateNickname({
        queryParam: { nickname },
      });
    },
    onSettled: (data) => {
      if (!data?.data.isNickname) {
        throw new Error("닉네임이 중복되었습니다.");
      }
    },
  });

  return {
    signup,
    isPending,
    validateEmail,
    isValidateEmailPending,
    sendEmailVerifyCode,
    isSendEmailVerifyCodePending,
    verifyEmailVerifyCode,
    isVerifyEmailVerifyCodePending,
    validateNickname,
    isValidateNicknamePending,
  };
}
