export interface UseLoginProps {
  onLoginSuccess?: () => void;
  onLoginFailure?: (error: Error) => void;
}

export function useLogin({ onLoginSuccess, onLoginFailure }: UseLoginProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogin = async (email: string, password: string) => {
    try {
      //  TODO: 로그인 API 호출
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
