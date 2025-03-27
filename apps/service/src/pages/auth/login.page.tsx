import { PageLayout } from "@/shared/layouts/page-layout";
import { LoginForm } from "@/widgets/auth/login-form";
import { Logo } from "@/widgets/logo";

export function LoginPage() {
  const handleLogin = (email: string, password: string) => {
    alert(`email: ${email}, password: ${password}`);
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
