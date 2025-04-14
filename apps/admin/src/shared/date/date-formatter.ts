import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export class DateFormatter {
  private dayjsDate: dayjs.Dayjs;

  constructor(date: string | Date | dayjs.Dayjs) {
    this.dayjsDate = dayjs(date);
  }

  /**
   * 상대적 시간을 반환합니다. (예: "3일 전", "방금 전")
   */
  get relativeTime(): string {
    return this.dayjsDate.fromNow();
  }

  /**
   * 날짜와 시간을 함께 표시합니다. (예: "2024년 4월 1일 오후 3:30")
   */
  get fullDateTime(): string {
    return this.dayjsDate.format("YYYY년 M월 D일 a h:mm");
  }

  /**
   * 날짜만 표시합니다. (예: "2024년 4월 1일")
   */
  get date(): string {
    return this.dayjsDate.format("YYYY년 M월 D일");
  }

  /**
   * 시간만 표시합니다. (예: "오후 3:30")
   */
  get time(): string {
    return this.dayjsDate.format("a h:mm");
  }

  /**
   * ISO 문자열로 반환합니다.
   */
  get isoString(): string {
    return this.dayjsDate.toISOString();
  }

  /**
   * 원본 Dayjs 객체를 반환합니다.
   */
  get dayjs(): dayjs.Dayjs {
    return this.dayjsDate;
  }
}
