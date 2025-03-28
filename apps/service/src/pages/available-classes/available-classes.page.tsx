import { AvailableClassesTabs } from "@/pages/available-classes/components/available-classes-tabs";
import { PageLayout } from "@/shared/layouts/page-layout";
import { Typography } from "@/shared/ui/typography";

export function AvailableClassesPage() {
  return (
    <PageLayout>
      <div className="space-y-4 py-20 px-10 ">
        <div className="text-center">
          <Typography.H1>멘토링 신청하기</Typography.H1>
          <Typography.P className="text-muted-foreground">
            자신이 원하는 멘토링을 확인하고 신청해주세요!
          </Typography.P>
        </div>
        <AvailableClassesTabs />
      </div>
    </PageLayout>
  );
}
