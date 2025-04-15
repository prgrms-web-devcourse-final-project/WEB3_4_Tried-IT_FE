import { ClassDetailModel } from "@/entities/model/class/class-detail.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { getDatesFromDay } from "@/shared/date/calculate-date-from-day";
import { dementorApiFetchers, NotFoundError } from "@repo/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export function useGetClassDetail(classId: number) {
  const query = useSuspenseQuery({
    queryKey: ["classDetail", classId],
    queryFn: async () => {
      const [classDetailResponse, appliedScheduleResponse] = await Promise.all([
        dementorApiFetchers.class.getClassDetail({
          pathParams: {
            classId: classId.toString(),
          },
        }),
        dementorApiFetchers.applyClass.getClassAppliedScheduleList({
          pathParams: {
            classId: classId,
          },
          queryParam: {
            startDate: dayjs().format("YYYYMMDD"),
            endDate: dayjs().add(1, "month").format("YYYYMMDD"),
          },
        }),
      ]);
      return {
        ...classDetailResponse.data,
        unavailableSchedules: appliedScheduleResponse.data?.applyments ?? [],
      };
    },
    select: (data) => {
      if (!data) {
        throw new NotFoundError("수업 정보를 찾을 수 없습니다.");
      }

      const unavailableSchedules =
        data.unavailableSchedules?.map((applyment) => ({
          date: dayjs(applyment.schedule).format("YYYY-MM-DD"),
          time: `${dayjs(applyment.schedule).format("HH")}:00`,
        })) ?? [];
      const availableSchedules = (
        data.schedules?.flatMap((schedule) =>
          getDatesFromDay(
            schedule.dayOfWeek!,
            dayjs(),
            dayjs().add(1, "month")
          ).map((date) => ({
            date: date.format("YYYY-MM-DD"),
            time: schedule.time?.split("~")[0] ?? "",
          }))
        ) ?? []
      ).filter(
        (schedule) =>
          !unavailableSchedules.some(
            (unavailableSchedule) =>
              unavailableSchedule.date === schedule.date &&
              unavailableSchedule.time === schedule.time
          )
      );
      return ModelCreator.create(ClassDetailModel, {
        id: data.classId ?? -1,
        description: data.content ?? "",
        mentor: {
          name: data.mentor?.name ?? "",
          job: data.mentor?.job ?? "",
          career: data.mentor?.career ?? 0,
        },
        price: data.price ?? 0,
        image: "",
        message: data.content ?? "",
        stack: data.stack?.join(",") ?? "",
        title: data.title ?? "",
        availableSchedules,
        unavailableSchedules,
      });
    },
  });

  return query;
}
