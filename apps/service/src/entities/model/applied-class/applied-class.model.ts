import { Model } from "@/entities/model/_interface/model.interface";
import { DateFormatter } from "@/shared/date/date-formatter";
import { Status } from "@repo/api";

export interface AppliedClassModelJson {
  id: number;
  mentor: {
    name: string;
  };
  inquiry: string;
  status: Status;
  schedule: string;
}

export interface AppliedClassModelConstructorOptions {
  id: number;
  mentor: {
    name: string;
  };
  inquiry: string;
  status: Status;
  schedule: string | Date;
}

export class AppliedClassModel implements Model<AppliedClassModelJson> {
  readonly id: number;
  readonly mentor: {
    name: string;
  };
  readonly inquiry: string;
  readonly status: Status;
  readonly scheduleFormatter: DateFormatter;

  constructor(constructorOptions: AppliedClassModelConstructorOptions) {
    this.id = constructorOptions.id;
    this.mentor = constructorOptions.mentor;
    this.inquiry = constructorOptions.inquiry;
    this.status = constructorOptions.status;
    this.scheduleFormatter = new DateFormatter(constructorOptions.schedule);
  }

  get statusLabel() {
    switch (this.status) {
      case "PENDING":
        return "대기중";
      case "APPROVED":
        return "진행중";
      case "REJECTED":
        return "거절됨";
      default:
        return "예약됨";
    }
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
