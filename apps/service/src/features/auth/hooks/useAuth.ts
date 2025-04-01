import { useLogin } from "@/features/auth/hooks/useLogin";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useGetUserInfo } from "@/pages/my/hooks/useGetUserInfo";
import { ROUTE_PATH } from "@app/routes";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export function useAuth() {
  const navigate = useNavigate();

  const { data: user, refetch, DEV_setIsLoggedIn } = useGetUserInfo();
  const isAuthenticated = useMemo(() => user !== null, [user]);

  const { login } = useLogin({
    onLoginSuccess: () => {
      DEV_setIsLoggedIn(true);
      refetch();
    },
    onLoginFailure: (error) => {
      console.error(error);
    },
  });
  const { logout: handleLogout } = useLogout({
    onLogoutSuccess: () => {
      DEV_setIsLoggedIn(false);
      refetch();
      navigate(ROUTE_PATH.HOME);
    },
    onLogoutFailure: (error) => {
      console.error(error);
    },
  });

  return { user, login, logout: handleLogout, isAuthenticated };
}
