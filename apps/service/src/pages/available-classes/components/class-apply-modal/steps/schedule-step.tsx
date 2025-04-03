import { ScheduleModel } from "@/entities/model/schedule/schedule.model";
import { Button, Typography } from "@repo/ui";

interface ScheduleStepProps {
  availableSchedules: ScheduleModel[];
  unavailableSchedules: ScheduleModel[];
  selectedDate: string;
  selectedTimeSlot?: string;
  onDateChange: (date: string) => void;
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
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium">
          날짜 선택
        </label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full rounded-md border p-2"
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
