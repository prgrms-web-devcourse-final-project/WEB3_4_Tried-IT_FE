import { Skeleton, TabsTrigger } from "@repo/ui";
import { overlay } from "overlay-kit";
import { ComponentProps } from "react";

import { ClassApplyModal } from "@/pages/available-classes/components/class-apply-modal/class-apply-modal";
import { ClassCard } from "@/pages/available-classes/components/class-card";
import { useGetAvailableClasses } from "@/pages/available-classes/hooks/use-get-available-classes";
import { Pagination, usePagination } from "@/widgets/pagination";

export interface AvailableClassesProps {
  jobIds?: string[];
}

export function AvailableClasses({ jobIds }: AvailableClassesProps) {
  const { page, size, setPage, setSize } = usePagination();
  const {
    data: { contents: classes, pagination },
  } = useGetAvailableClasses({
    page,
    size,
    jobIds,
  });

  const handleClassCardClick = (classId: number) => {
    overlay.open(({ isOpen, close }) => (
      <ClassApplyModal isOpen={isOpen} onClose={close} classId={classId} />
    ));
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {classes.length === 0 && (
          <div className="col-span-full my-20 md:my-40">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">등록된 수업이 없습니다.</p>
            </div>
          </div>
        )}
        {classes.map((classModel, index) => (
          <ClassCard
            key={index}
            model={classModel}
            onClick={() => handleClassCardClick(classModel.id)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center py-4">
        <Pagination
          pagination={pagination}
          onPageChange={setPage}
          onSizeChange={setSize}
        />
      </div>
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
