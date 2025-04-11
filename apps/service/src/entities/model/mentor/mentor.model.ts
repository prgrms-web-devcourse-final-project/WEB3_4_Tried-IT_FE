import { Model } from "@/entities/model/_interface/model.interface";

export interface MentorModelJson {
  memberId: number;
  name: string;
  job: string;
  career: number;
  phone: string;
  currentCompany: string;
  introduction: string;
  bestFor: string;
  isApproved: boolean;
  totalClasses: number;
  pendingRequests: number;
  completedSessions: number;
}

export interface MentorModelConstructorOptions {
  memberId: number;
  name: string;
  job: string;
  career: number;
  phone: string;
  currentCompany: string;
  introduction: string;
  bestFor: string;
  isApproved: boolean;
  totalClasses: number;
  pendingRequests: number;
  completedSessions: number;
}

export class MentorModel implements Model<MentorModelJson> {
  readonly memberId: number;
  readonly name: string;
  readonly job: string;
  readonly career: number;
  readonly phone: string;
  readonly currentCompany: string;
  readonly introduction: string;
  readonly bestFor: string;
  readonly isApproved: boolean;
  readonly totalClasses: number;
  readonly pendingRequests: number;
  readonly completedSessions: number;

  constructor(constructorOptions: MentorModelConstructorOptions) {
    this.memberId = constructorOptions.memberId;
    this.name = constructorOptions.name;
    this.job = constructorOptions.job;
    this.career = constructorOptions.career;
    this.phone = constructorOptions.phone;
    this.currentCompany = constructorOptions.currentCompany;
    this.introduction = constructorOptions.introduction;
    this.bestFor = constructorOptions.bestFor;
    this.isApproved = constructorOptions.isApproved;
    this.totalClasses = constructorOptions.totalClasses;
    this.pendingRequests = constructorOptions.pendingRequests;
    this.completedSessions = constructorOptions.completedSessions;
  }

  toJson(): MentorModelJson {
    return {
      memberId: this.memberId,
      name: this.name,
      job: this.job,
      career: this.career,
      phone: this.phone,
      currentCompany: this.currentCompany,
      introduction: this.introduction,
      bestFor: this.bestFor,
      isApproved: this.isApproved,
      totalClasses: this.totalClasses,
      pendingRequests: this.pendingRequests,
      completedSessions: this.completedSessions,
    };
  }

  /**
   * 경력 연수를 문자열로 반환합니다. (예: "5년")
   */
  get careerText(): string {
    return `${this.career}년`;
  }

  /**
   * 승인 대기 중인 요청이 있는지 여부를 반환합니다.
   */
  get hasPendingRequests(): boolean {
    return this.pendingRequests > 0;
  }

  /**
   * 멘토링 완료율을 반환합니다. (0-100)
   */
  get completionRate(): number {
    if (this.totalClasses === 0) return 0;
    return Math.round((this.completedSessions / this.totalClasses) * 100);
  }
}
