import { dementorApiFetchers } from "@repo/api";

export interface UseLoginProps {
  onLoginSuccess?: () => void;
  onLoginFailure?: (error: Error) => void;
}

export function useLogin({ onLoginSuccess, onLoginFailure }: UseLoginProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogin = async (email: string, password: string) => {
    try {
      await dementorApiFetchers.auth.login({
        queryParam: {
          email,
          password,
        },
      });

      onLoginSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        onLoginFailure?.(error);
      } else {
        onLoginFailure?.(new Error("로그인 실패"));
      }
    }
  };

  return { login: handleLogin };
}
