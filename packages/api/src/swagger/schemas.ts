import type * as Enums from "./enums";

export type MentorEditProposalRequest = {
  jobId?: number;
  career?: number;
  currentCompany?: string;
  introduction?: string;
  attachmentId?: Array<number>;
};

export type ApiResponseObject = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: Record<string, unknown>;
};

export type MentorApplyStatusRequest = {
  /**
   * @description 신청 상태
   */
  status?: Enums.Status;
};

export type ApiResponseMentorApplyStatusResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: MentorApplyStatusResponse;
};

export type MentorApplyStatusResponse = {
  applymentId?: number;
  classId?: number;
  status?: Enums.Status;
};

export type ApiResponseVoid = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: Record<string, unknown>;
};

/**
 * @description 멘토링 수업 수정 요청
 */
export type MentoringClassUpdateRequest = {
  /**
   * @description 수업 제목
   */
  title?: string;
  /**
   * @description 수업 내용
   */
  content?: string;
  /**
   * @description 수업 가격
   */
  price?: number;
  /**
   * @description 기술 스택 목록
   */
  stack?: Array<string>;
  /**
   * @description 스케줄 정보
   */
  schedule?: ScheduleRequest;
};

export type ScheduleRequest = {
  /**
   * @description 요일
   */
  dayOfWeek?: Enums.DayOfWeek;
  /**
   * @description 가능 시간
   */
  time?: string;
};

export type ApiResponseMentoringClassUpdateResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: MentoringClassUpdateResponse;
};

export type MentorInfo = {
  /**
   * @description 멘토 ID
   */
  mentorId?: number;
  /**
   * @description 멘토 이름
   */
  name?: string;
  /**
   * @description 멘토 직무
   */
  job?: string;
  /**
   * @description 멘토 경력
   */
  career?: number;
};

export type MentoringClassUpdateResponse = {
  /**
   * @description 수업 ID
   */
  classId?: number;
  /**
   * @description 멘토 정보
   */
  mentor?: MentorInfo;
  /**
   * @description 기술 스택 목록
   */
  stack?: Array<string>;
  /**
   * @description 수업 내용
   */
  content?: string;
  /**
   * @description 수업 제목
   */
  title?: string;
  /**
   * @description 수업 가격
   */
  price?: number;
  /**
   * @description 스케줄 정보
   */
  schedule?: ScheduleInfo;
};

export type ScheduleInfo = {
  /**
   * @description 요일
   */
  dayOfWeek?: Enums.DayOfWeek;
  /**
   * @description 시간
   */
  time?: string;
};

export type ApplymentRejectRequest = {
  reason: string;
};

export type ApiResponseApplymentRejectResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: ApplymentRejectResponse;
};

export type ApplymentRejectResponse = {
  applymentId?: number;
  memberId?: number;
  name?: string;
  status?: Enums.Status;
  modifiedAt?: string;
  reason?: string;
};

export type JobUpdateRequest = {
  jobName?: string;
};

export type ApiResponseJobUpdateResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: JobUpdateResponse;
};

/**
 * @description 직무명 수정
 */
export type JobUpdateResponse = {
  /**
   * @description 직무명
   */
  jobName?: string;
};

export type ApiResponseMentorEditUpdateRenewalResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: MentorEditUpdateRenewalResponse;
};

export type MentorEditUpdateRenewalResponse = {
  id?: number;
  memberId?: number;
  status?: Enums.Status;
  modifiedAt?: string;
};

export type MentorApplyProposalRequestDto = {
  memberId: number;
  name: string;
  jobId: number;
  phone: string;
  email: string;
  career: number;
  currentCompany?: string;
  introduction: string;
  attachmentId?: Array<number>;
};

export type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
  name: string;
  verifyCode: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

/**
 * @description 멘토링 수업 생성 요청
 */
export type MentoringClassCreateRequest = {
  /**
   * @description 기술 스택 목록
   */
  stack?: Array<string>;
  /**
   * @description 수업 내용
   */
  content?: string;
  /**
   * @description 수업 제목
   */
  title?: string;
  /**
   * @description 수업 가격
   */
  price?: number;
  /**
   * @description 수업 일정 목록
   */
  schedules?: Array<ScheduleRequest>;
};

export type ApiResponseMentoringClassDetailResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: MentoringClassDetailResponse;
};

/**
 * @description 멘토링 수업 상세 조회 응답
 */
export type MentoringClassDetailResponse = {
  /**
   * @description 수업 ID
   */
  classId?: number;
  /**
   * @description 멘토 정보
   */
  mentor?: MentorInfo;
  /**
   * @description 기술 스택 목록
   */
  stack?: Array<string>;
  /**
   * @description 수업 내용
   */
  content?: string;
  /**
   * @description 수업 제목
   */
  title?: string;
  /**
   * @description 수업 가격
   */
  price?: number;
  /**
   * @description 수업 일정 목록
   */
  schedules?: Array<ScheduleResponse>;
};

/**
 * @description 수업 일정 응답
 */
export type ScheduleResponse = {
  /**
   * @description 요일
   */
  dayOfWeek?: Enums.DayOfWeek;
  /**
   * @description 시간
   */
  time?: string;
};

export type ChatMessageSendDto = {
  chatRoomId?: number;
  senderType?: Enums.SenderType;
  senderId?: number;
  content?: string;
};

export type ChatMessageResponseDto = {
  chatRoomId?: number;
  senderId?: number;
  senderType?: Enums.SenderType;
  content?: string;
  sentAt?: string;
};

export type ChatRoomResponseDto = {
  chatRoomId?: number;
  roomType?: Enums.RoomType;
  lastMessage?: string;
  lastMessageAt?: string;
  targetNickname?: string;
};

export type ApplyCreateRequest = {
  classId?: number;
  inquiry?: string;
  schedule?: string;
};

export type ApiResponseApplyIdResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: ApplyIdResponse;
};

export type ApplyIdResponse = {
  applyId?: number;
  mentorId?: number;
  menteeId?: number;
  chatRoomId?: number;
};

export type ApiResponseApplymentApprovalResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: ApplymentApprovalResponse;
};

export type ApplymentApprovalResponse = {
  id?: number;
  memberId?: number;
  mentorId?: number;
  name?: string;
  status?: string;
  modifiedAt?: string;
};

/**
 * @description 관리자 로그인 요청
 */
export type AdminLoginRequest = {
  username: string;
  password: string;
};

/**
 * @description 직무 생성 Request
 */
export type JobCreaeteRequest = {
  /**
   * @description 직무 이름
   */
  jobName?: string;
};

export type ApiResponseJobCreateResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: JobCreateResponse;
};

export type JobCreateResponse = {
  jobId?: number;
  name?: string;
};

export type ApiResponseListMyMentoringResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: Array<MyMentoringResponse>;
};

export type MyMentoringResponse = {
  classId?: number;
  stack?: Array<string>;
  content?: string;
  title?: string;
  price?: number;
};

export type ApiResponseGetApplyMenteePageList = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: GetApplyMenteePageList;
};

export type ApplyMenteeDto = {
  applyId?: number;
  classId?: number;
  memberId?: number;
  nickname?: string;
  status?: Enums.Status;
  inquiry?: string;
  schedule?: string;
};

export type GetApplyMenteePageList = {
  applyments?: Array<ApplyMenteeDto>;
  pagination?: Pagination;
};

export type Pagination = {
  page?: number;
  size?: number;
  total_elements?: number;
  total_pages?: number;
};

export type ApiResponseBoolean = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: boolean;
};

export type ApiResponseMemberInfoResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: MemberInfoResponse;
};

/**
 * @description 내 정보 조회
 */
export type MemberInfoResponse = {
  /**
   * @description member_id
   */
  id?: number;
  /**
   * @description email
   */
  email?: string;
  /**
   * @description nickname
   */
  nickname?: string;
  /**
   * @description created_at
   */
  created_at?: string;
};

export type Pageable = {
  page?: number;
  size?: number;
  sort?: Array<string>;
};

export type ApiResponsePageMentoringClassFindResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: PageMentoringClassFindResponse;
};

/**
 * @description 멘토링 수업 조회 응답
 */
export type MentoringClassFindResponse = {
  /**
   * @description 수업 ID
   */
  classId?: number;
  /**
   * @description 멘토 정보
   */
  mentor?: MentorInfo;
  /**
   * @description 기술 스택 목록
   */
  stack?: Array<string>;
  /**
   * @description 수업 내용
   */
  content?: string;
  /**
   * @description 수업 제목
   */
  title?: string;
  /**
   * @description 수업 가격
   */
  price?: number;
};

export type PageMentoringClassFindResponse = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: Array<MentoringClassFindResponse>;
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
};

export type PageableObject = {
  offset?: number;
  sort?: SortObject;
  paged?: boolean;
  pageNumber?: number;
  pageSize?: number;
  unpaged?: boolean;
};

export type SortObject = {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
};

export type ApiResponseApplyPageResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: ApplyPageResponse;
};

export type ApplyDetailResponse = {
  applyId?: number;
  classId?: number;
  mentorId?: number;
  name?: string;
  status?: Enums.Status;
  inquiry?: string;
  schedule?: string;
};

export type ApplyPageResponse = {
  applyments?: Array<ApplyDetailResponse>;
  pagination?: Pagination;
};

export type ApiResponseApplyScheduleResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: ApplyScheduleResponse;
};

export type ApplyScheduleResponse = {
  applyments?: Array<ScheduleItem>;
};

export type ScheduleItem = {
  schedule?: string;
};

export type ApiResponsePageApplymentResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: PageApplymentResponse;
};

export type ApplymentResponse = {
  id?: number;
  memberId?: number;
  name?: string;
  email?: string;
  jobName?: string;
  career?: number;
  status?: string;
  createdAt?: string;
};

export type PageApplymentResponse = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: Array<ApplymentResponse>;
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
};

export type ApiResponseApplymentDetailResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: ApplymentDetailResponse;
};

export type ApplymentDetailResponse = {
  applymentInfo?: ApplymentInfo;
};

export type ApplymentInfo = {
  applymentId?: number;
  memberId?: number;
  name?: string;
  job?: JobInfo;
  career?: number;
  phone?: string;
  email?: string;
  currentCompany?: string;
  introduction?: string;
  status?: string;
  createdAt?: string;
  modifiedAt?: string;
};

export type JobInfo = {
  jobId?: number;
  jobName?: string;
};

export type ApiResponseListJobFindResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: Array<JobFindResponse>;
};

/**
 * @description 직무 전체조회 응답
 */
export type JobFindResponse = {
  /**
   * @description 직무 ID
   */
  jobId?: number;
  /**
   * @description 직무 이름
   */
  name?: string;
};

export type ApiResponsePageMentorEditFindAllRenewalResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data?: PageMentorEditFindAllRenewalResponse;
};

export type MentorEditFindAllRenewalResponse = {
  id?: number;
  memberId?: number;
  memberName?: string;
  status?: Enums.Status;
  createdAt?: string;
  career?: number;
  currentCompany?: string;
  introduction?: string;
};

export type PageMentorEditFindAllRenewalResponse = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: Array<MentorEditFindAllRenewalResponse>;
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
};
