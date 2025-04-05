import { useAuth } from "@/features/auth/hooks/use-auth";
import { PageLayout } from "@/shared/layouts/page-layout";
import { LoginForm } from "@/widgets/auth/login-form";
import { Logo } from "@/widgets/logo";
import { ROUTE_PATH } from "@app/routes";
import { useNavigate } from "react-router";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    navigate(ROUTE_PATH.HOME);
  };

  return (
    <PageLayout className="flex flex-col items-center justify-center">
      <div className="space-y-4 w-full px-4 max-w-xl">
        <div>
          <Logo className="text-center" />
        </div>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </PageLayout>
  );
}
