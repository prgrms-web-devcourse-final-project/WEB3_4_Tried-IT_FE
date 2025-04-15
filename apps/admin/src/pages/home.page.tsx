import { PageLayout } from "@/shared/layouts/page-layout";
import { Typography } from "@repo/ui";

export function HomePage() {
  return (
    <PageLayout>
      <div className="flex justify-center pt-12">
        <div>
          <Typography.H1 className="text-center">
            <span className="text-primary">DeMentor</span>
            <span className="text-lg">Admin</span>
          </Typography.H1>
          <Typography.P className="text-center">관리자 대시보드</Typography.P>
        </div>
      </div>
    </PageLayout>
  );
}
