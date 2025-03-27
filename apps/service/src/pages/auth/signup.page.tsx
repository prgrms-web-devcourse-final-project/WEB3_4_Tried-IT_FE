import { PageLayout } from "@/shared/layouts/page-layout";
import { SignupForm } from "@/widgets/auth/signup-form";
import { Logo } from "@/widgets/logo";

export function SignupPage() {
  return (
    <PageLayout className="flex flex-col items-center justify-center">
      <div className="space-y-4 w-full px-4 max-w-xl">
        <div>
          <Logo className="text-center" />
        </div>
        <SignupForm
          onValidateNameDuplicate={() => Promise.resolve()}
          onValidateEmailDuplicate={() => Promise.resolve()}
          onValidateEmailAuth={() => Promise.resolve()}
          onSubmit={() => {}}
        />
      </div>
    </PageLayout>
  );
}
