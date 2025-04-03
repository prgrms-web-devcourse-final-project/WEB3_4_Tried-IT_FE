import { AvailableClasses } from "@/pages/available-classes/components/available-classes";
import { ClassesFilterSelect } from "@/pages/available-classes/components/classes-filter-select";
import { useAvailableClassesFilter } from "@/pages/available-classes/hooks/useAvailableClassesFilter";
import { MenteeTheme } from "@/shared/components/mentee-theme/mentee-theme";
import { PageLayout } from "@/shared/layouts/page-layout";
import { AspectRatio, Typography } from "@repo/ui";
import { Suspense } from "react";

export function AvailableClassesPage() {
  const {
    jobCategories,
    classListOrders,
    selectedJobCategories,
    selectedClassListOrder,
    handleJobCategoriesChangeById,
    handleClassListOrderChangeById,
  } = useAvailableClassesFilter();

  return (
    <PageLayout>
      <MenteeTheme className="space-y-4 py-20 px-4 md:px-10">
        <div className="w-[200px] mx-auto">
          <AspectRatio ratio={1 / 1}>
            <img
              src="mentee-character.png"
              alt="멘토링 신청하기"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
        <div className="text-center">
          <Typography.H2>
            <span className="text-secondary font-bold text-4xl">멘토링</span>{" "}
            신청하기
          </Typography.H2>
          <Typography.P className="text-muted-foreground">
            자신이 원하는 멘토링을 확인하고 신청해주세요!
          </Typography.P>
        </div>
        <ClassesFilterSelect
          jobs={jobCategories}
          orders={classListOrders}
          initialJobs={selectedJobCategories}
          initialOrder={selectedClassListOrder}
          onFilterChange={({ jobIds, orderId }) => {
            if (jobIds) {
              handleJobCategoriesChangeById(jobIds);
            }
            if (orderId) {
              handleClassListOrderChangeById(orderId);
            }
          }}
        />
        <Suspense fallback={<AvailableClasses.Skeleton />}>
          <AvailableClasses />
        </Suspense>
      </MenteeTheme>
    </PageLayout>
  );
}
