import { DayOfWeek, DayOfWeekConst } from "@repo/api";
import dayjs from "dayjs";

const dayOfWeekMap = {
  [DayOfWeekConst.MONDAY]: 1,
  [DayOfWeekConst.TUESDAY]: 2,
  [DayOfWeekConst.WEDNESDAY]: 3,
  [DayOfWeekConst.THURSDAY]: 4,
  [DayOfWeekConst.FRIDAY]: 5,
  [DayOfWeekConst.SATURDAY]: 6,
  [DayOfWeekConst.SUNDAY]: 0,
};

/*
 * @description 요일 정보를 전달받았을때, 오늘을 기준으로 한달뒤까지에 해당 요일에 해당하는 날짜 정보를 반환.
 */
export function getDatesFromDay(
  day: DayOfWeek,
  startDate: Date | dayjs.Dayjs,
  endDate: Date | dayjs.Dayjs
) {
  let currentDay = dayjs(startDate);
  const dates = [];

  while (currentDay.isBefore(endDate)) {
    if (currentDay.day() === dayOfWeekMap[day]) {
      dates.push(currentDay);
    }
    currentDay = currentDay.add(1, "day");
  }

  return dates;
}
