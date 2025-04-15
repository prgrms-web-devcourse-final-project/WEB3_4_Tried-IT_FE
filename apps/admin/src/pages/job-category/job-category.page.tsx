import { PageLayout } from "@/shared/layouts/page-layout";
import { Typography } from "@repo/ui";
import { JobCategoryList } from "./components/job-category-list";

export function JobCategoryPage() {
  return (
    <PageLayout>
      <div className="flex items-center mb-6">
        <Typography.H3>직무 카테고리 관리</Typography.H3>
      </div>
      <JobCategoryList />
    </PageLayout>
  );
}
