import MenteeRequests from "@/pages/mentor/components/mentee-requests";
import MentorInfo from "@/pages/mentor/components/mentor-info";
import MentoringPosts from "@/pages/mentor/components/mentoring-posts";
import { PageLayout } from "@/shared/layouts/page-layout";
import { Typography } from "@/shared/ui/typography";

export function MentorDashboardPage() {
  return (
    <PageLayout>
      <div className="container mx-auto py-6 space-y-8">
        <Typography.H2>멘토 대시보드</Typography.H2>

        <div className="container mx-auto space-y-8">
          <MentorInfo />
          <MentoringPosts />
          <MenteeRequests />
        </div>
      </div>
    </PageLayout>
  );
}
