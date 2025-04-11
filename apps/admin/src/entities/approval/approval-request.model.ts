import dayjs from "dayjs";

export interface ApprovalRequestModelJson {
  id: number;
  type: "profile" | "blank";
  category: "modification" | "approval";
  title: string;
  description: string;
  createdAt: string;
  mentor: {
    name: string;
  };
  approved?: boolean;
}

export interface ApprovalRequestModelConstructorOptions {
  id: number;
  type: "profile" | "blank";
  category: "modification" | "approval";
  title: string;
  description: string;
  createdAt: string | dayjs.Dayjs | Date;
  mentor: {
    name: string;
  };
  approved?: boolean;
}

export class ApprovalRequestModel {
  readonly id: number;
  readonly type: "profile" | "blank";
  readonly category: "modification" | "approval";
  readonly title: string;
  readonly description: string;
  readonly createdAt: dayjs.Dayjs;
  readonly mentor: {
    name: string;
  };
  readonly approved?: boolean;

  constructor(constructorOptions: ApprovalRequestModelConstructorOptions) {
    this.id = constructorOptions.id;
    this.type = constructorOptions.type;
    this.category = constructorOptions.category;
    this.title = constructorOptions.title;
    this.description = constructorOptions.description;
    this.createdAt = dayjs(constructorOptions.createdAt);
    this.mentor = constructorOptions.mentor;
    this.approved = constructorOptions.approved;
  }

  get formattedCreatedAt(): string {
    return this.createdAt.format("YYYY-MM-DD HH:mm:ss");
  }

  toJson(): ApprovalRequestModelJson {
    return {
      id: this.id,
      type: this.type,
      category: this.category,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt.toISOString(),
      mentor: this.mentor,
      approved: this.approved,
    };
  }
}
