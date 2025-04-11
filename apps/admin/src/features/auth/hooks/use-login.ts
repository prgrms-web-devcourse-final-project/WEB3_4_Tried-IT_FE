import { dementorApiFetchers } from "@repo/api";

export interface UseLoginProps {
  onLoginSuccess?: () => void;
  onLoginFailure?: (error: Error) => void;
}

export function useLogin({ onLoginSuccess, onLoginFailure }: UseLoginProps) {
  const handleLogin = async (username: string, password: string) => {
    try {
      await dementorApiFetchers.admin.login({
        body: {
          username,
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
