import { ApplyClassFormValues } from "@/pages/available-classes/components/class-apply-modal/class-apply-modal";
import { dementorApiFetchers } from "@repo/api";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";

export function useApplyClass() {
  return useMutation({
    mutationFn: (applyment: ApplyClassFormValues) => {
      const schedule = dayjs(applyment.date)
        .set("hour", parseInt(applyment.timeSlot.split(":")[0]))
        .set("minute", parseInt(applyment.timeSlot.split(":")[1]));

      return dementorApiFetchers.applyClass.applyClass({
        body: {
          classId: applyment.classId,
          inquiry: applyment.message,
          schedule: schedule.format("YYYY-MM-DDTHH:mm:ss"),
        },
      });
    },
  });
}
