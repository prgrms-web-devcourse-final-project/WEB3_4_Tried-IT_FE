import { Model } from "@/entities/model/_interface/model.interface";
import dayjs from "dayjs";

export interface ScheduleModelJson {
  date: string;
  time: string;
}

export interface ScheduleModelConstructorOptions {
  /**
   * @example "2025-01-01"
   */
  date: string;
  /**
   * @example "10:00"
   */
  time: string;
}

export class ScheduleModel implements Model<ScheduleModelJson> {
  readonly date: dayjs.Dayjs;

  constructor(constructorOptions: ScheduleModelConstructorOptions) {
    const [hour, minute] = constructorOptions.time.split(":");
    this.date = dayjs(constructorOptions.date)
      .set("hour", parseInt(hour))
      .set("minute", parseInt(minute));
  }

  get time() {
    return this.date.format("HH:mm");
  }

  toJson(): ScheduleModelJson {
    return {
      date: this.date.format("YYYY-MM-DD"),
      time: this.time,
    };
  }
}
