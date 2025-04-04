import { handleError } from "@/app/error-handler/error-handler";
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
            try {
              await validateNickname(nickname);
            } catch (error) {
              handleError(error);
              throw error;
            }
          }}
          onValidateEmailDuplicate={async (email) => {
            try {
              await validateEmail(email);
            } catch (error) {
              handleError(error);
              throw error;
            }
          }}
          onValidateEmailAuth={async (email) => {
            try {
              await sendEmailVerifyCode(email);
            } catch (error) {
              handleError(error);
              throw error;
            }
          }}
          onValidateEmailVerifyCode={async (email, verifyCode) => {
            try {
              await verifyEmailVerifyCode({ email, verifyCode });
            } catch (error) {
              handleError(error);
              throw error;
            }
          }}
          onSubmit={async (formData) => {
            try {
              await signup(formData);
            } catch (error) {
              handleError(error);
              throw error;
            }
          }}
        />
      </div>
    </PageLayout>
  );
}
