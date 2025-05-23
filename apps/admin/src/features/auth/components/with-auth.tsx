import { useAuth } from "@/features/auth/hooks/use-auth";
import { ROUTE_PATH } from "@app/routes";
import { ComponentType, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * 인증이 필요한 라우트를 보호하는 컴포넌트
 *
 * @param children 보호할 컴포넌트/페이지
 * @param requireAuth 인증이 필요한지 여부 (기본값: true)
 * @param redirectTo 인증되지 않았을 때 리디렉션할 경로 (기본값: 로그인 페이지)

 */
export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = ROUTE_PATH.AUTH.LOGIN,
}: AuthGuardProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 인증이 필요하고, 인증되지 않은 경우
    if (requireAuth && !isLoggedIn) {
      navigate(redirectTo, {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    // 인증이 필요없고, 이미 인증된 경우 (예: 로그인 페이지에 이미 로그인한 사용자가 접근)
    if (!requireAuth && isLoggedIn) {
      navigate(ROUTE_PATH.HOME, { replace: true });
    }
  }, [isLoggedIn, navigate, requireAuth, redirectTo, location.pathname]);

  // 리디렉션이 일어날 때는 아무것도 렌더링하지 않음
  if ((requireAuth && !isLoggedIn) || (!requireAuth && isLoggedIn)) {
    return null;
  }

  return <>{children}</>;
}

interface WithAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * 컴포넌트를 인증으로 보호하는 고차 컴포넌트 (HOC)
 *
 * @param Component 보호할 컴포넌트
 * @param options 인증 옵션
 * @param options.requireAuth 인증이 필요한지 여부 (기본값: true)
 * @param options.redirectTo 인증되지 않았을 때 리디렉션할 경로 (기본값: 로그인 페이지)
 * @returns 인증으로 보호된 새 컴포넌트
 */
export function withAuth<P extends object>(
  Component: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { requireAuth = true, redirectTo = ROUTE_PATH.AUTH.LOGIN } = options;

  const WithAuthComponent = (props: P) => {
    return (
      <AuthGuard requireAuth={requireAuth} redirectTo={redirectTo}>
        <Component {...props} />
      </AuthGuard>
    );
  };

  // 디버깅을 위한 컴포넌트 이름 설정
  const displayName = Component.displayName || Component.name || "Component";
  WithAuthComponent.displayName = `withAuth(${displayName})`;

  return WithAuthComponent;
}
