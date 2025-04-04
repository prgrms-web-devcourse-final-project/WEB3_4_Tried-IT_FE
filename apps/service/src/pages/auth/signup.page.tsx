import { useSignup } from "@/features/auth/hooks/use-signup/use-signup";
import { PageLayout } from "@/shared/layouts/page-layout";
import { SignupForm } from "@/widgets/auth/signup-form";
import { Logo } from "@/widgets/logo";

export function SignupPage() {
  const {
    signup,
    validateEmail,
    sendEmailVerifyCode,
    verifyEmailVerifyCode,
    validateNickname,
  } = useSignup();

  return (
    <PageLayout className="flex flex-col items-center justify-center">
      <div className="space-y-4 w-full px-4 max-w-xl">
        <div>
          <Logo className="text-center" />
        </div>
        <SignupForm
          onValidateNicknameDuplicate={async (nickname) => {
            await validateNickname(nickname);
          }}
          onValidateEmailDuplicate={async (email) => {
            await validateEmail(email);
          }}
          onValidateEmailAuth={async (email) => {
            await sendEmailVerifyCode(email);
          }}
          onValidateEmailVerifyCode={async (email, verifyCode) => {
            await verifyEmailVerifyCode({ email, verifyCode });
          }}
          onSubmit={async (formData) => {
            await signup(formData);
          }}
        />
      </div>
    </PageLayout>
  );
}
