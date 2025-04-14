import { Status, StatusConst } from "@repo/api";
import dayjs from "dayjs";

export interface ApprovalRequestModelJson {
  id: number;
  memberId: number;
  type: "profile" | "blank";
  category: "modification" | "approval";
  title: string;
  description: string;
  createdAt: string;
  mentor: {
    name: string;
  };
  status: Status;
}

export interface ApprovalRequestModelConstructorOptions {
  id: number;
  memberId: number;
  type: "profile" | "blank";
  category: "modification" | "approval";
  title: string;
  description: string;
  createdAt: string | dayjs.Dayjs | Date;
  mentor: {
    name: string;
  };
  status?: Status;
}

export class ApprovalRequestModel {
  readonly id: number;
  readonly memberId: number;
  readonly type: "profile" | "blank";
  readonly category: "modification" | "approval";
  readonly title: string;
  readonly description: string;
  readonly createdAt: dayjs.Dayjs;
  readonly mentor: {
    name: string;
  };
  readonly status: Status;

  constructor(constructorOptions: ApprovalRequestModelConstructorOptions) {
    this.id = constructorOptions.id;
    this.memberId = constructorOptions.memberId;
    this.type = constructorOptions.type;
    this.category = constructorOptions.category;
    this.title = constructorOptions.title;
    this.description = constructorOptions.description;
    this.createdAt = dayjs(constructorOptions.createdAt);
    this.mentor = constructorOptions.mentor;
    this.status = constructorOptions.status ?? StatusConst.PENDING;
  }

  get formattedCreatedAt(): string {
    return this.createdAt.format("YYYY-MM-DD HH:mm:ss");
  }

  toJson(): ApprovalRequestModelJson {
    return {
      id: this.id,
      memberId: this.memberId,
      type: this.type,
      category: this.category,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt.toISOString(),
      mentor: this.mentor,
      status: this.status,
    };
  }
}
