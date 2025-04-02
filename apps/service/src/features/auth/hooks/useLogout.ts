export interface UseLogoutProps {
  onLogoutSuccess?: () => void;
  onLogoutFailure?: (error: Error) => void;
}

export function useLogout({
  onLogoutSuccess,
  onLogoutFailure,
}: UseLogoutProps) {
  const handleLogout = async () => {
    try {
      //  TODO: 로그아웃 API 호출
      onLogoutSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        onLogoutFailure?.(error);
      } else {
        onLogoutFailure?.(new Error("알 수 없는 로그아웃 실패"));
      }
    }
  };

  return { logout: handleLogout };
}
