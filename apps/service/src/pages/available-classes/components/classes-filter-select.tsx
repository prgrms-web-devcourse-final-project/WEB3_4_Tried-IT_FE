import {
  MultiSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";

interface ClassesFilterSelectProps {
  jobs: { value: string; label: string }[];
  orders: { value: string; label: string }[];
  initialJobs?: string[];
  initialOrder?: string;
  onFilterChange: ({ job, order }: { job?: string[]; order?: string }) => void;
}

export function ClassesFilterSelect({
  jobs,
  orders,
  initialJobs = [],
  initialOrder = "all",
  onFilterChange,
}: ClassesFilterSelectProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 items-center">
      <MultiSelect
        options={jobs}
        onValueChange={(value) => onFilterChange({ job: value })}
        defaultValue={initialJobs}
        placeholder="전체 직무"
        maxCount={5}
        className="w-full md:w-auto min-w-[200px] bg-background hover:bg-background/80"
      />

      <Select
        defaultValue={initialOrder}
        onValueChange={(value) => onFilterChange({ order: value })}
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
