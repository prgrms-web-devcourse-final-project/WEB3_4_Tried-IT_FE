import { Model } from "@/entities/model/_interface/model.interface";
import { MentoringPostMentee } from "@/entities/model/mentoring-post/mentoring-post-mentee.interface";
import { MentoringPostMentor } from "@/entities/model/mentoring-post/mentoring-post-mentor.interface";
import { DateFormatter } from "@/shared/date/date-formatter";

export interface MentoringPostModelJson {
  classId: number;
  mentor: {
    memberId: number;
    name: string;
    job: string;
    career: number;
  };
  stack: string;
  content: string;
  title: string;
  price: number;
  mentee: Array<{
    memberId: number;
    date: string;
  }>;
}

export interface MentoringPostModelConstructorOptions {
  classId: number;
  mentor: MentoringPostMentor;
  stack: string;
  content: string;
  title: string;
  price: number;
  mentee: Array<{
    memberId: number;
    date: string;
  }>;
}

export class MentoringPostModel implements Model<MentoringPostModelJson> {
  readonly classId: number;
  readonly mentor: MentoringPostMentor;
  readonly stack: string;
  readonly content: string;
  readonly title: string;
  readonly price: number;
  readonly mentee: MentoringPostMentee[];

  constructor(options: MentoringPostModelConstructorOptions) {
    this.classId = options.classId;
    this.mentor = options.mentor;
    this.stack = options.stack;
    this.content = options.content;
    this.title = options.title;
    this.price = options.price;
    this.mentee = options.mentee.map((m) => ({
      memberId: m.memberId,
      date: new DateFormatter(m.date),
    }));
  }

  toJson(): MentoringPostModelJson {
    return {
      classId: this.classId,
      mentor: {
        memberId: this.mentor.memberId,
        name: this.mentor.name,
        job: this.mentor.job,
        career: this.mentor.career,
      },
      stack: this.stack,
      content: this.content,
      title: this.title,
      price: this.price,
      mentee: this.mentee.map((m) => ({
        memberId: m.memberId,
        date: m.date.isoString,
      })),
    };
  }

  /**
   * 기술 스택을 배열로 반환합니다.
   */
  get stackArray(): string[] {
    return this.stack.split(",").map((s) => s.trim());
  }

  /**
   * 가격을 원 단위로 포맷팅하여 반환합니다.
   */
  get formattedPrice(): string {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(this.price);
  }

  /**
   * 멘티 수를 반환합니다.
   */
  get menteeCount(): number {
    return this.mentee.length;
  }
}
