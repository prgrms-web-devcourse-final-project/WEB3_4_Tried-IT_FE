import { ScheduleModel } from "@/entities/model/schedule/schedule.model";
import { Button, Calendar, Typography } from "@repo/ui";
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
    <div className="space-y-4 flex gap-8">
      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium">
          날짜 선택
        </label>
        <Calendar
          mode="single"
          id="date"
          animate
          selected={selectedDate.toDate()}
          dayButtonClassName="hover:bg-secondary/80 hover:text-secondary-foreground dark:hover:bg-secondary/80 dark:hover:text-secondary-foreground"
          selectedClassName="[&>button]:bg-secondary [&>button]:text-secondary-foreground [&>button]:hover:bg-secondary [&>button]:hover:text-secondary-foreground"
          onSelect={(date) => onDateChange(dayjs(date))}
        />
      </div>
      {selectedDate && (
        <div className="space-y-2">
          <Typography.H4>예약 가능한 시간</Typography.H4>
          <div className="grid grid-cols-3 gap-2">
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
      )}
    </div>
  );
}
