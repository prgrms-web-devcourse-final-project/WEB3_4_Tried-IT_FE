import { useAuth } from "@/features/auth/hooks/use-auth";
import { AvailableClasses } from "@/pages/available-classes/components/available-classes";
import { ClassesFilterSelect } from "@/pages/available-classes/components/classes-filter-select";
import { useAvailableClassesFilter } from "@/pages/available-classes/hooks/use-available-classes-filter";
import { useCreateClass } from "@/pages/available-classes/hooks/use-create-class";
import { MenteeTheme } from "@/shared/components/mentee-theme/mentee-theme";
import { PageLayout } from "@/shared/layouts/page-layout";
import { MentorClassCreateModal } from "@/widgets/mentor/mentor-class-create-modal";
import { AspectRatio, Button, toast, Typography } from "@repo/ui";
import { Plus } from "lucide-react";
import { overlay } from "overlay-kit";
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
  const { isMentor } = useAuth();
  const { createClass } = useCreateClass();

  const handleCreateClass = () => {
    overlay.open(({ isOpen, close }) => (
      <MentorClassCreateModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={async (values) => {
          try {
            await createClass(values);
            toast.success("수업 생성 완료");
            close();
          } catch (e) {
            toast.error("수업 생성 실패", {
              description: e instanceof Error ? e.message : JSON.stringify(e),
            });
          }
        }}
      />
    ));
  };

  return (
    <PageLayout>
      <div className="relative">
        {isMentor && (
          <Button
            className="fixed left-10 bottom-10 z-50 shadow-xl"
            onClick={handleCreateClass}
          >
            <Plus className="mr-2 h-4 w-4" />
            수업 생성하기
          </Button>
        )}
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
            jobs={jobCategories ?? []}
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
            <AvailableClasses
              jobIds={selectedJobCategories.map((category) => category.id)}
            />
          </Suspense>
        </MenteeTheme>
      </div>
    </PageLayout>
  );
}
