import { Model } from "@/entities/model/_interface/model.interface";
import { DateFormatter } from "@/shared/date/date-formatter";
import { MenteeRequestStatus } from "./mentee-request-status.enum";

export interface MenteeRequestModelJson {
  applymentId: number;
  classId: number;
  memberId: number;
  nickname: string;
  status: MenteeRequestStatus;
  inquiry: string;
  schedule: string;
}

export interface MenteeRequestModelConstructorOptions {
  applymentId: number;
  classId: number;
  memberId: number;
  nickname: string;
  status: MenteeRequestStatus;
  inquiry: string;
  schedule: string;
}

export class MenteeRequestModel implements Model<MenteeRequestModelJson> {
  readonly applymentId: number;
  readonly classId: number;
  readonly memberId: number;
  readonly nickname: string;
  readonly status: MenteeRequestStatus;
  readonly inquiry: string;
  readonly scheduleFormatter: DateFormatter;

  constructor(options: MenteeRequestModelConstructorOptions) {
    this.applymentId = options.applymentId;
    this.classId = options.classId;
    this.memberId = options.memberId;
    this.nickname = options.nickname;
    this.status = options.status;
    this.inquiry = options.inquiry;
    this.scheduleFormatter = new DateFormatter(options.schedule);
  }

  toJson(): MenteeRequestModelJson {
    return {
      applymentId: this.applymentId,
      classId: this.classId,
      memberId: this.memberId,
      nickname: this.nickname,
      status: this.status,
      inquiry: this.inquiry,
      schedule: this.scheduleFormatter.isoString,
    };
  }

  /**
   * 상태를 한글로 반환합니다.
   */
  get statusText(): string {
    const statusMap: Record<MenteeRequestStatus, string> = {
      [MenteeRequestStatus.PENDING]: "대기중",
      [MenteeRequestStatus.APPROVED]: "승인",
      [MenteeRequestStatus.REJECTED]: "거절",
    };
    return statusMap[this.status];
  }

  /**
   * 멘티 이름의 첫 두 글자를 반환합니다.
   */
  get nicknameInitials(): string {
    return this.nickname.substring(0, 2);
  }

  /**
   * 대기 상태인지 여부를 반환합니다.
   */
  get isPending(): boolean {
    return this.status === MenteeRequestStatus.PENDING;
  }

  /**
   * 승인 상태인지 여부를 반환합니다.
   */
  get isApproved(): boolean {
    return this.status === MenteeRequestStatus.APPROVED;
  }

  /**
   * 거절 상태인지 여부를 반환합니다.
   */
  get isRejected(): boolean {
    return this.status === MenteeRequestStatus.REJECTED;
  }
}
