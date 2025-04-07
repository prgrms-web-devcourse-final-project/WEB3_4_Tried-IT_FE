import { handleError } from "@/app/error-handler/error-handler";
import { useLogin } from "@/features/auth/hooks/use-login";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useGetUserInfo } from "@/pages/my/hooks/use-get-user-info";
import { ROUTE_PATH } from "@app/routes";
import { BadRequestError } from "@repo/api";
import { toast } from "@repo/ui";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export function useAuth() {
  const navigate = useNavigate();

  const { data: user, refetch } = useGetUserInfo();
  const isAuthenticated = useMemo(() => user !== null, [user]);

  const { login } = useLogin({
    onLoginSuccess: () => {
      refetch();
    },
    onLoginFailure: (error) => {
      if (error instanceof BadRequestError) {
        toast.error("로그인에 실패하였습니다", {
          description: "계정 정보를 다시 확인해주세요.",
        });
      } else {
        handleError(error);
      }
      throw error;
    },
  });
  const { logout: handleLogout } = useLogout({
    onLogoutSuccess: () => {
      refetch();
      navigate(ROUTE_PATH.HOME);
    },
    onLogoutFailure: (error) => {
      console.error(error);
    },
  });

  return { user, login, logout: handleLogout, isAuthenticated };
}
