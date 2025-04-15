import { useAuth } from "@/features/auth/hooks/use-auth";
import { ROUTE_PATH } from "@app/routes";
import { Button } from "@repo/ui";
import { Link } from "react-router";

export function AuthButton() {
  const { isLoggedIn, logout } = useAuth();

  return isLoggedIn ? (
    <Button variant="outline" onClick={logout}>
      로그아웃
    </Button>
  ) : (
    <Button variant="outline" asChild>
      <Link to={ROUTE_PATH.AUTH.LOGIN}>로그인</Link>
    </Button>
  );
}
