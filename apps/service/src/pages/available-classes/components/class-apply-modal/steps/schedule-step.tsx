import { ScheduleModel } from "@/entities/model/schedule/schedule.model";
import { Button, Calendar } from "@repo/ui";
import dayjs from "dayjs";

interface ScheduleStepProps {
  availableSchedules: ScheduleModel[];
  unavailableSchedules: ScheduleModel[];
  selectedDate: dayjs.Dayjs;
  selectedTimeSlot?: string;
  onDateChange: (date: dayjs.Dayjs) => void;
  onTimeSlotChange: (time: string) => void;
}

export function ScheduleStep({
  availableSchedules,
  unavailableSchedules,
  selectedDate,
  selectedTimeSlot,
  onDateChange,
  onTimeSlotChange,
}: ScheduleStepProps) {
  return (
    <div className="md:space-y-4 flex flex-col md:flex-row max-w-2xl gap-2">
      <div className="flex-1 space-y-2 flex flex-col items-center">
        <Calendar
          mode="single"
          id="date"
          selected={selectedDate.toDate()}
          disabled={(date) =>
            !availableSchedules.some((schedule) =>
              schedule.date.isSame(date, "day")
            )
          }
          navClassName="[&>button]:hover:bg-secondary [&>button]:hover:text-secondary-foreground dark:[&>button]:hover:bg-secondary/80 dark:[&>button]:hover:text-secondary-foreground"
          dayButtonClassName="hover:bg-secondary/80 hover:text-secondary-foreground dark:hover:bg-secondary/80 dark:hover:text-secondary-foreground"
          selectedClassName="[&>button]:bg-secondary [&>button]:text-secondary-foreground [&>button]:hover:bg-secondary [&>button]:hover:text-secondary-foreground"
          onSelect={(date) => onDateChange(dayjs(date))}
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 min-w-64">
          {[...availableSchedules, ...unavailableSchedules]
            .filter((schedule) => schedule.date.isSame(selectedDate, "day"))
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((schedule) => (
              <Button
                key={schedule.toJson().time}
                variant={
                  selectedTimeSlot === schedule.time ? "default" : "outline"
                }
                disabled={unavailableSchedules.some(
                  (unavailableSchedule) =>
                    unavailableSchedule.date.isSame(selectedDate, "day") &&
                    unavailableSchedule.time === schedule.time
                )}
                onClick={() => onTimeSlotChange(schedule.time)}
              >
                {schedule.time}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
