import { MentorApplicationForm } from "@/pages/mentor-application/components/mentor-application-form";
import { PageLayout } from "@/shared/layouts/page-layout";
import { AspectRatio, Typography } from "@repo/ui";

export function MentorApplicationPage() {
  const handleSubmit = (values: unknown) => {
    alert(JSON.stringify(values));
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
