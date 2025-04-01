import { ClassListOrderModel } from "@/entities/model/class/class-list-order.model";
import { JobCategoryModel } from "@/entities/model/class/job-category.model";
import {
  MultiSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";

interface ClassesFilterSelectProps {
  jobs: JobCategoryModel[];
  orders: ClassListOrderModel[];
  initialJobs?: JobCategoryModel[];
  initialOrder?: ClassListOrderModel;
  onFilterChange: ({
    jobIds,
    orderId,
  }: {
    jobIds?: string[];
    orderId?: string;
  }) => void;
}

export function ClassesFilterSelect({
  jobs,
  orders,
  initialJobs = [],
  initialOrder = orders[0],
  onFilterChange,
}: ClassesFilterSelectProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 items-center">
      <MultiSelect
        options={jobs.map((job) => ({
          value: job.id,
          label: job.label,
        }))}
        value={initialJobs.map((job) => job.id)}
        onValueChange={(value) => onFilterChange({ jobIds: value })}
        placeholder="전체 직무"
        maxCount={5}
        className="w-full md:w-auto min-w-[200px] bg-background hover:bg-background/80"
      />

      <Select
        value={initialOrder.value}
        onValueChange={(value) => onFilterChange({ orderId: value })}
      >
        <SelectTrigger className="text-muted-foreground w-full md:w-auto bg-background hover:bg-background/80">
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent>
          {orders.map((order) => (
            <SelectItem key={order.value} value={order.value}>
              {order.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
