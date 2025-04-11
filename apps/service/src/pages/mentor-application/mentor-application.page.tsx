import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  MentorApplicationForm,
  MentorApplicationFormValues,
} from "@/pages/mentor-application/components/mentor-application-form";
import { usePostMentorApplication } from "@/pages/mentor-application/hooks/use-post-mentor-application";
import { PageLayout } from "@/shared/layouts/page-layout";
import { ROUTE_PATH } from "@app/routes";
import { AspectRatio, toast, Typography } from "@repo/ui";
import { useNavigate } from "react-router";

export function MentorApplicationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { postMentorApplication } = usePostMentorApplication({
    memberId: user?.id,
  });

  const handleSubmit = async (values: MentorApplicationFormValues) => {
    try {
      await postMentorApplication(values);
      toast.success(
        "멘토 지원에 성공했습니다. 관리자의 승인이 완료되면 멘토 활동을 시작할 수 있습니다."
      );
      navigate(ROUTE_PATH.HOME);
    } catch (e) {
      toast.error("멘토 지원에 실패했습니다.", {
        description: e instanceof Error ? e.message : JSON.stringify(e),
      });
    }
  };

  return (
    <PageLayout>
      <div className="space-y-4 py-20 px-4 md:px-10">
        <div className="w-[200px] mx-auto">
          <AspectRatio ratio={1 / 1}>
            <img
              src="mentor-character.png"
              alt="멘토 지원하기"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
        <div className="text-center">
          <Typography.H2>
            <span className="text-primary text-4xl font-bold">멘토</span>{" "}
            지원하기
          </Typography.H2>
          <Typography.P>
            멘토링을 제공하고 싶으신 분들은 아래 양식을 작성해주세요.
            <br />
            관리자의 승인이 완료되면 멘토 활동을 시작할 수 있습니다.
          </Typography.P>
        </div>
        <MentorApplicationForm onSubmit={handleSubmit} />
      </div>
    </PageLayout>
  );
}
