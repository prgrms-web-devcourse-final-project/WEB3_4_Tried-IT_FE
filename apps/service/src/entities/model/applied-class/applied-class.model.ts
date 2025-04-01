import { Model } from "@/entities/model/_interface/model.interface";
import { DateFormatter } from "@/shared/date/date-formatter";

export interface AppliedClassModelJson {
  id: number;
  mentor: {
    name: string;
  };
  inquiry: string;
  status: "진행중" | "예약됨" | "대기중" | "거절됨";
  schedule: string;
}

export interface AppliedClassModelConstructorOptions {
  id: number;
  mentor: {
    name: string;
  };
  inquiry: string;
  status: "진행중" | "예약됨" | "대기중" | "거절됨";
  schedule: string | Date;
}

export class AppliedClassModel implements Model<AppliedClassModelJson> {
  readonly id: number;
  readonly mentor: {
    name: string;
  };
  readonly inquiry: string;
  readonly status: "진행중" | "예약됨" | "대기중" | "거절됨";
  readonly scheduleFormatter: DateFormatter;

  constructor(constructorOptions: AppliedClassModelConstructorOptions) {
    this.id = constructorOptions.id;
    this.mentor = constructorOptions.mentor;
    this.inquiry = constructorOptions.inquiry;
    this.status = constructorOptions.status;
    this.scheduleFormatter = new DateFormatter(constructorOptions.schedule);
  }

  toJson(): AppliedClassModelJson {
    return {
      id: this.id,
      mentor: this.mentor,
      inquiry: this.inquiry,
      status: this.status,
      schedule: this.scheduleFormatter.fullDateTime,
    };
  }
}
