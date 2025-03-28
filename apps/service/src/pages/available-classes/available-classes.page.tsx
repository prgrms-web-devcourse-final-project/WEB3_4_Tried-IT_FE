import { AvailableClasses } from "@/pages/available-classes/components/available-classes";
import { ClassesFilterSelect } from "@/pages/available-classes/components/classes-filter-select";
import { PageLayout } from "@/shared/layouts/page-layout";
import { Typography } from "@/shared/ui/typography";

const jobs = [
  {
    value: "Java",
    label: "자바",
  },
  {
    value: "JavaScript",
    label: "자바스크립트",
  },
  {
    value: "Python",
    label: "파이썬",
  },
  {
    value: "C#",
    label: "C#",
  },
];

const orders = [
  {
    value: "popular",
    label: "인기순",
  },
  {
    value: "latest",
    label: "최신순",
  },
  {
    value: "reviews",
    label: "후기많은순",
  },
  {
    value: "beauty",
    label: "비용순",
  },
];

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
        <ClassesFilterSelect
          jobs={jobs}
          orders={orders}
          initialJobs={[]}
          initialOrder="popular"
          onFilterChange={() => {}}
        />
        <AvailableClasses />
      </div>
    </PageLayout>
  );
}
