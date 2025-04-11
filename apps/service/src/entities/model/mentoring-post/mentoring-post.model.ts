import { Model } from "@/entities/model/_interface/model.interface";

export interface MentoringPostModelJson {
  classId: number;
  stack: string;
  content: string;
  title: string;
  price: number;
}

export interface MentoringPostModelConstructorOptions {
  classId: number;
  stack: string;
  content: string;
  title: string;
  price: number;
}

export class MentoringPostModel implements Model<MentoringPostModelJson> {
  readonly classId: number;
  readonly stack: string;
  readonly content: string;
  readonly title: string;
  readonly price: number;

  constructor(options: MentoringPostModelConstructorOptions) {
    this.classId = options.classId;
    this.stack = options.stack;
    this.content = options.content;
    this.title = options.title;
    this.price = options.price;
  }

  toJson(): MentoringPostModelJson {
    return {
      classId: this.classId,

      stack: this.stack,
      content: this.content,
      title: this.title,
      price: this.price,
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
}
