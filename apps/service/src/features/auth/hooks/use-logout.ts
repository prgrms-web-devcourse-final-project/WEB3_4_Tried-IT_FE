import { dementorApiFetchers } from "@repo/api";

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
      await dementorApiFetchers.auth.logout();
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
