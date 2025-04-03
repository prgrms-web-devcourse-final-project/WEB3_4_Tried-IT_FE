import { ClassApplyModal } from "@/pages/available-classes/components/class-apply-modal/class-apply-modal";
import { ClassCard } from "@/pages/available-classes/components/class-card";
import { useGetAvailableClasses } from "@/pages/available-classes/hooks/useGetAvailableClasses";
import { Skeleton, TabsTrigger } from "@repo/ui";
import { overlay } from "overlay-kit";
import { ComponentProps } from "react";

export function AvailableClasses() {
  const { data: classes } = useGetAvailableClasses();

  const handleClassCardClick = (classId: number) => {
    overlay.open(({ isOpen, close }) => (
      <ClassApplyModal isOpen={isOpen} onClose={close} classId={classId} />
    ));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {classes.map((classModel, index) => (
        <ClassCard
          key={index}
          model={classModel}
          onClick={() => handleClassCardClick(classModel.id)}
        />
      ))}
    </div>
  );
}

AvailableClasses.Skeleton = AvailableClassesSkeleton;

function AvailableClassesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-[400px] bg-secondary/50" />
      ))}
    </div>
  );
}

export function StyledTabTrigger({
  value,
  children,
  ...props
}: ComponentProps<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      value={value}
      className="px-6 py-3 border-0 border-b-2 rounded-b-none bg-transparent
      data-[state=active]:border-primary dark:data-[state=active]:border-primary 
      data-[state=active]:shadow-none data-[state=active]:drop-shadow-xs data-[state=active]:shadow-primary/50
      dark:data-[state=active]:drop-shadow dark:data-[state=active]:shadow-primary/50
      "
      {...props}
    >
      {children}
    </TabsTrigger>
  );
}
