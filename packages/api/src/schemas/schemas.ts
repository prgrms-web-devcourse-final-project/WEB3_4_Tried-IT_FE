import {
  ApplyStatus,
  ChatRoomType,
  DateOfWeek,
  MessageSenderType,
  MessageType,
} from "../enums/enums";

export type ClassListResponse = {
  classes: {
    classId: number;
    mentor: {
      mentorId: number;
      name: string;
      job: string;
      career: number;
    };
    stack: string[];
    content: string;
    title: string;
    price: number;
  }[];
  page: {
    totalDataCnt: number; // 총 데이터 수
    totalPages: number; // 총 페이지 수
    isLastPage: boolean; // 요청한 리소스가 마지막 페이지인지 세팅한다
    isFirstPage: boolean; // 요청한 리소스가
    requestPage: number; // 요청한 페이지 번호
    requestSize: number; // 요청한 페이지 번호에서 데이터 수
  };
};

export type ClassDetailResponse = {
  classId: number;
  mentor: {
    mentorId: number;
    name: string;
    job: string;
    career: number;
  };
  stack: string;
  content: string;
  title: string;
  price: number;
};

type CommonClassRequest = {
  /**
   * @description 기술 스택
   */
  stack: string[];
  /**
   * @description 수업 내용
   */
  content: string;
  /**
   * @description 수업 제목
   */
  title: string;
  /**
   * @description 수업 가격
   */
  price: number;
  /**
   * @description 수업 일정
   */
  schedule: {
    /**
     * @description 요일
     */
    date_of_week: DateOfWeek;
    /**
     * @description 시간 예시: "10001100 : 오전 10시 ~ 오전 11시"
     */
    time: string;
  };
};

export type PostClassRequest = CommonClassRequest;

export type PutClassRequest = CommonClassRequest;

export type PutClassResponse = CommonClassRequest & {
  classId: string;
  mentor: {
    mentorId: number;
    name: string;
    job: string;
    career: number;
  };
};

export type DeleteClassResponse = {
  classId: string;
};

export type RegisteredClassListResponse = {
  class_id: number;
  mentor: {
    member_id: number;
    name: string;
    job: string;
    career: number;
  };
  stack: string;
  content: string;
  title: string;
  price: number;
  mentee: {
    member_id: number;
    date: Date;
  }[];
};
export type AppliedMenteeListResponse = {
  applyments: {
    /**
     * @description 신청된 아이디(기본 아이디)
     */
    applymentId: number;
    classId: number;
    memberId: number;
    nickname: string;
    /**
     * @description 신청 상태
     */
    status: ApplyStatus;
    /**
     * @description 멘티 문의
     */
    inquiry: string;
    /**
     * @description 신청 날짜 e.g. 2025-03-24T14:30+09:00 (UTC 기준 9시간 이후[한국])
     */
    schedule: string;
  }[];
  pagination: {
    page: number;
    size: number;
    total_elements: number;
    total_pages: number;
  };
};

export type AppliedClassListResponse = {
  applyments: {
    /**
     * @description 신청된 아이디(기본 아이디)
     */
    applymentId: number;
    /**
     * @description 클래스 아이디
     */
    classId: number;
    /**
     * @description 멘토 아이디
     */
    mentorId: number;
    /**
     * @description 멘토 이름
     */
    name: string;
    /**
     * @description 신청 상태
     */
    status: ApplyStatus;
    /**
     * @description 멘티 문의
     */
    inquiry: string;
    /**
     * @description 신청 날짜 e.g. 2025-03-24T14:00+09:00 (UTC 기준 9시간 이후[한국])
     */
    schedule: string;
  }[];
  pagination: {
    /**
     * @description 페이지 크기
     */
    size: number;
    /**
     * @description 총 요소 수
     */
    total_elements: number;
    /**
     * @description 페이지 번호. one-based index
     */
    page: number;
    /**
     * @description 총 페이지 수
     */
    total_pages: number;
  };
};

export type ApplyClassRequest = {
  /**
   * @description 클래스 아이디
   */
  classId: number;
  /**
   * @description 멘티에게 남길 메시지
   */
  inquiry: string;
  /**
   * @description 신청일정 예시: ISO 8601 형식. e.g. "2025-03-24T14:30+09:00 (UTC 기준 9시간 이후[한국])"
   */
  schedule: string;
};

export type ApplyClassResponse = {
  applymentId: number;
};

export type SignUpRequest = {
  name: string;
  email: string;
  nickname: string;
  password: string;
  /**
   * @description 이메일 인증 코드
   */
  verifyCode: string;
};

export type GetMyMemberInfoResponse = {
  id: string;
  email: string;
  nickname: string;
  /**
   * @description ISO 8601 형식. e.g. "2025-03-24T14:00+09:00 (UTC 기준 9시간 이후[한국])"
   */
  created_at: string;
};

export type PutMyMemberInfoRequest = {
  nickname: string;
};

export type MentorApplicationDetailResponse = {
  id: number;
  name: string;
  job: string;
  career: number;
  currentCompany: string;
  phone: string;
  /**
   * @description 자기소개
   */
  introduction: string;
  /**
   * @description 최고로 해당 멘토를 추천하는 분야
   */
  bestFor: string;
  /**
   * @description 지원날짜. ISO 8601 형식. e.g. "2025-03-24T14:00+09:00 (UTC 기준 9시간 이후[한국])"
   */
  applicationDate: string;
  // TODO: 아마 응답 구조가 바뀔 것임.
  attachment: File;
};

export type HandleMentoringApplicationResponse = {
  applymentId: number;
  classId: string;
  status: ApplyStatus;
};

export type MentorInfoResponse = {
  memberInfo: {
    /**
     * @description 회원(멘토) ID
     */
    memberId: number;
    /**
     * @description 멘토 이름(실명)
     */
    name: string;
    job: {
      /**
       * @description 직무ID
       */
      jobId: number;
      /**
       * @description 직무명
       */
      jobName: string;
    };
    /**
     * @description 경력
     */
    career: number;
    /**
     * @description 전화번호
     */
    phone: string;
    /**
     * @description 현재 직장
     */
    currentCompany: string;
    /**
     * @description "나를 소개하는 글" 소개글
     */
    introduction: string;
    /**
     * @description 추천 대상
     */
    bestFor: string;
    ApprovalStatus: ApplyStatus;
    /**
     * @description 작성한 멘토링 수
     */
    totalClasses: number;
    /**
     * @description 멘토가 아직 승인하지 않은 멘토링 신청 개수
     */
    pendingRequests: number;
    /**
     * @description 완료된 멘토링 수
     */
    completedSessions: number;
  };
};

export type MentorRoleApplicationRequest = {
  /**
   * @description 사용자 ID
   */
  memberId: number | string;
  /**
   * @description 멘토 이름(실명)
   */
  name: string;
  /**
   * @description 직무 ID
   */
  jobId: number;
  /**
   * @description 전화번호 (digit only e.g. 01012345678)
   */
  phone: string;
  /**
   * @description 연락할 이메일
   */
  email: string;
  /**
   * @description 경력(년차)
   */
  career: number;
  /**
   * @description 현재 기업
   */
  currentCompany: string;
  /**
   * @description "나를 소개하는 글" (마크다운 형식)
   */
  introduction: string;
  /**
   * @description "이런 분들에게 좋아요" 질문에 대한 답변
   */
  bestFor: string;
  /**
   * @description 경력증명서 파일 ID 목록 (여러 파일 첨부 가능)
   */
  attachmentId: number[];
};
export type RequestUpdateMentorInfoRequest = {
  job: {
    /**
     * @description 직문
     */
    jobId: number;
    /**
     * @description 직문
     */
    jobName: string;
  };
  /**
   * @description 경력
   */
  career: number;
  /**
   * @description 전화번호
   */
  phone: string;
  /**
   * @description 현재 회사
   */
  currentCompany: string;
  /**
   * @description 소개글
   */
  introduction: string;
  /**
   * @description "이런 분들에게 좋아요" 추천대상
   */
  bestFor: string;
  /**
   * @description 첨부 파일 ID 목록 (여러 파일 첨부 가능)
   */
  attachmentId: number[];
};

export type RequestUpdateMentorInfoResponse = {
  memberId: number;
  /**
   * @description 수정 요청 상태 (관리자 승인 대기 중)
   */
  modification_status: ApplyStatus;
};

export type GetMentorInfoModificationRequestListRequest = {
  status: ApplyStatus;
  page: number;
  size: number;
};
/**
 * @description 멘토 정보 수정 요청 목록 응답 타입
 */
export type GetMentorInfoModificationRequestListResponse = {
  /**
   * @description 수정 요청 목록
   */
  modificationRequests: {
    /**
     * @description 수정 요청 ID
     */
    modificationId: number;
    /**
     * @description 수정 요청 상태 ("PENDING", "APPROVED", "REJECTED" 중 하나)
     */
    status: ApplyStatus;
    /**
     * @description 요청 날짜 (ISO 8601 형식, UTC+9 한국 시간)
     */
    requestDate: string;
    /**
     * @description 수정된 필드들
     */
    modifiedFields: {
      /**
       * @description 경력 변경 정보
       */
      career: {
        /**
         * @description 변경 전 값
         */
        before: number;
        /**
         * @description 변경 후 값
         */
        after: number;
      };
      /**
       * @description 소개글 변경 정보
       */
      introduction: {
        /**
         * @description 변경 전 값
         */
        before: string;
        /**
         * @description 변경 후 값
         */
        after: string;
      };
      /**
       * @description 추천 대상 변경 정보
       */
      bestFor: {
        /**
         * @description 변경 전 값 (없을 경우 null)
         */
        before: string | null;
        /**
         * @description 변경 후 값
         */
        after: string;
      };
    };
  }[];
  /**
   * @description 페이지네이션 정보
   */
  pagination: {
    /**
     * @description 현재 페이지
     */
    page: number;
    /**
     * @description 페이지 크기
     */
    size: number;
    /**
     * @description 전체 요소 수
     */
    totalElements: number;
  };
};

export type UploadFileResponse = Array<{
  /**
   * @description 저장된 파일의 ID
   */
  attachmentId: number;
  /**
   * @description 원본 파일명
   */
  originalFilename: string;
  /**
   * @description 파일 크기 (단위: 바이트)
   */
  fileSize: number;
  /**
   * @description 마크다운에서 참조할 URL (imageType이 MARKDOWN*인 경우)
   */
  fileUrl: string;
  /**
   * @description 마크다운 내 이미지 참조용 식별자 (imageType이 MARKDOWN인 경우)
   */
  uniqueIdentifier: string;
}>;

export type GetChatListResponse = Array<{
  chatRoomId: number;
  /**
   * @description number일 경우 멘토링 신청으로 생성된 챗. null일 경우 관리자문의 챗
   */
  applymentId?: number | null;
  /**
   * @description 멘티 닉네임
   */
  nickname: string;
  /**
   * @description 마지막 메시지
   */
  lastMessage: string;
  /**
   * @description 마지막 메시지 보낸 시간
   */
  lastSentAt: string;
}>;

export type CreateMentoringChatRoomRequest = {
  roomType: ChatRoomType.MENTORING;
  applymentId: number;
};

export type CreateAdminChatRoomRequest = {
  roomType: ChatRoomType.ADMIN;
};

export type CreateChatRoomRequest =
  | CreateMentoringChatRoomRequest
  | CreateAdminChatRoomRequest;

export type CreateChatRoomResponse = {
  roomType: ChatRoomType;
  chatRoomId: number;
};

export type GetChatRoomHistoryRequest = {
  beforeMessageId?: number;
  size: number;
};

export type GetChatRoomHistoryResponse = {
  messages: Array<{
    messageId: number;
    type: MessageType;
    senderType: MessageSenderType;
    memberId: number;
    nickname: string;
    message: string;
    createdAt: string;
  }>;
  hasMore: boolean;
  nextCursor: number;
};

export type UpdateMentoringScheduleRequest = {
  /**
   * @description 멘토링 클래스 ID
   */
  classId: number;
  /**
   * @description 원래 일정 날짜 (YYYY-MM-DD)
   */
  yearMonthDay: string;
  /**
   * @description [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 9시 예약
   */
  timePattern: number[];
  /**
   * @description 멘토링 신청 ID
   */
  applymentId: number;
  /**
   * @description 새 날짜 (같은 날짜 내 변경 시 생략 가능)
   */
  newYearMonthDay?: string;
  /**
   * @description [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0] 14시 예약
   */
  newTimePattern?: number[];
};

export type UpdateMentoringScheduleResponse = {
  /**
   * @description 작업이 적용된 날짜(YYYY-MM-DD)
   */
  yearMonthDay: string;
  /**
   * @description [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0] 업데이트된 시간 패턴
   */
  updatedTimePattern: number[];
  /**
   * @description 멘토링 신청 ID
   */
  applymentId: number;
};

export type GetMentorAvailableScheduleRequest = {
  /**
   * @description 연월일 (YYYY-MM-DD)
   */
  yearMonthDay: string;
  /**
   * @description 멘토링 클래스 ID (선택적)
   */
  classId?: number;
};

export type GetMentorAvailableScheduleResponse = {
  /**
   * @description 멘토 ID
   */
  memberId: number;
  /**
   * @description 연월일 (YYYY-MM-DD)
   */
  yearMonthDay: string; // "YYYY-MM-DD"
  /**
   * @description 해당 월의 총 일수
   */
  daysInMonth: number; // 해당 월의 총 일수
  availableDates: {
    /**
     * @description 날짜 (YYYY-MM-DD)
     */
    date: string; // "YYYY-MM-DD"
    /**
     * @description 사용 가능한 시간 슬롯. e.g. ["09:00-10:00", "14:00-15:00"]
     */
    availableTimeSlots: string[];
    /**
     * @description 예약된 시간 슬롯. e.g. ["16:00-17:00"]
     */
    bookedTimeSlots: string[];
  }[];
};

export type PutMentorAvailableSchedulePathParams = {
  /**
   * @description 멘토 ID
   */
  memberId: string;
  /**
   * @description 연월일 (YYYY-MM-DD)
   */
  yearMonthDay: string;
};

/**
 * @description 멘토 가용 일정 수정 요청 타입
 */
export type PutMentorAvailableScheduleRequest = {
  classId: number; // 멘토링 클래스 ID
  /**
   * @description 시간 패턴
   * e.g. [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0] 기존 시간대 : 16-17시, 19시 가용
   * e.g. [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0] 변경 시간대 : 15시 17시 가용상태
   * 15시는 추가, 16,19시는 삭제!
   */
  timePattern: number[];
};
export type PutMentorAvailableScheduleResponse = {
  /**
   * @description 연월일 (YYYY-MM-DD)
   */
  yearMonthDay: string;
  /**
   * @description 가용 시간대 문자열 배열 (HH:MM-HH:MM 형식)
   */
  availableTimeSlots: string[];
};
