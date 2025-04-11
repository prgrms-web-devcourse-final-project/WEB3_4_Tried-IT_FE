import { useLogin } from "@/features/auth/hooks/use-login";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useGetMentorApplicant } from "@/features/mentor-applicant/hooks/use-get-mentor-applicant";
import { ROUTE_PATH } from "@app/routes";
import { BadRequestError } from "@repo/api";
import { toast } from "@repo/ui";
import { useMemo } from "react";
import { useNavigate } from "react-router";
export function useAuth() {
  const navigate = useNavigate();
  const { data: mentorApplicant, refetch } = useGetMentorApplicant({
    page: 1,
    size: 10,
  });

  const isLoggedIn = useMemo(() => {
    return !!mentorApplicant;
  }, [mentorApplicant]);

  const { login } = useLogin({
    onLoginSuccess: () => {
      refetch();
      navigate(ROUTE_PATH.HOME);
    },
    onLoginFailure: (error) => {
      if (error instanceof BadRequestError) {
        toast.error("로그인에 실패하였습니다", {
          description: "계정 정보를 다시 확인해주세요.",
        });
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

  return { login, logout: handleLogout, isLoggedIn };
}
