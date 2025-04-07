import type * as Enums from './enums';

export type MentorUpdateRequestDto = {
career?: number;
phone?: string;
currentCompany?: string;
jobId?: number;
email?: string;
introduction?: string;
bestFor?: string;
attachmentId?: Array<number>;
}

export type ApiResponseObject = {
isSuccess: boolean;
code: string;
message: string;
data?: Record<string, unknown>;
}

export type MentorApplyStatusRequest = {
/**
 * @description 신청 상태
 */
status?: Enums.Status;
}

export type ApiResponseMentorApplyStatusResponse = {
isSuccess: boolean;
code: string;
message: string;
data?: MentorApplyStatusResponse;
}

export type MentorApplyStatusResponse = {
applymentId?: number;
classId?: number;
status?: Enums.Status;
}

export type ApiResponseVoid = {
isSuccess: boolean;
code: string;
message: string;
data?: Record<string, unknown>;
}

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
}

export type ScheduleRequest = {
/**
 * @description 요일
 */
dayOfWeek?: Enums.DayOfWeek;
/**
 * @description 가능 시간
 */
time?: string;
}

export type ApiResponseMentoringClassUpdateResponse = {
isSuccess: boolean;
code: string;
message: string;
data?: MentoringClassUpdateResponse;
}

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
}

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
}

export type ScheduleInfo = {
/**
 * @description 요일
 */
dayOfWeek?: Enums.DayOfWeek;
/**
 * @description 시간
 */
time?: string;
}

export type JobUpdateRequest = {
jobName?: string;
}

export type MentorApplicationRequestDto = {
memberId: number;
name: string;
jobId: number;
phone: string;
email: string;
career: number;
currentCompany?: string;
introduction: string;
bestFor?: string;
attachmentId?: Array<number>;
}

export type SignupRequest = {
email: string;
password: string;
nickname: string;
name: string;
verifyCode: string;
}

export type LoginRequest = {
email: string;
password: string;
}

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
}

export type ApiResponseMentoringClassDetailResponse = {
isSuccess: boolean;
code: string;
message: string;
data?: MentoringClassDetailResponse;
}

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
}

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
}

export type ApplyCreateRequest = {
classId?: number;
inquiry?: string;
schedule?: string;
}

export type ApiResponseApplyIdResponse = {
isSuccess: boolean;
code: string;
message: string;
data?: ApplyIdResponse;
}

export type ApplyIdResponse = {
applyId?: number;
}

/**
 * @description 관리자 로그인 요청
 */
export type AdminLoginRequest = {
username: string;
password: string;
}

/**
 * @description 직무 생성 Request
 */
export type JobCreaeteRequest = {
/**
 * @description 직무 이름
 */
jobName?: string;
}

export type ApiResponseListMyMentoringResponse = {
isSuccess: boolean;
code: string;
message: string;
data?: Array<MyMentoringResponse>;
}

export type MyMentoringResponse = {
classId?: number;
stack?: Array<string>;
content?: string;
title?: string;
price?: number;
}

export type ApiResponseGetApplyMenteePageList = {
isSuccess: boolean;
code: string;
message: string;
data?: GetApplyMenteePageList;
}

export type ApplyMenteeDto = {
applyId?: number;
classId?: number;
memberId?: number;
nickname?: string;
status?: Enums.Status;
inquiry?: string;
schedule?: string;
}

export type GetApplyMenteePageList = {
applyments?: Array<ApplyMenteeDto>;
pagination?: Pagination;
}

export type Pagination = {
page?: number;
size?: number;
total_elements?: number;
total_pages?: number;
}

export type ApiResponseBoolean = {
isSuccess: boolean;
code: string;
message: string;
data?: boolean;
}

export type ApiResponseMemberInfoResponse = {
isSuccess: boolean;
code: string;
message: string;
data?: MemberInfoResponse;
}

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
}

export type Pageable = {
page?: number;
size?: number;
sort?: Array<string>;
}

export type ApiResponsePageMentoringClassFindResponse = {
isSuccess: boolean;
code: string;
message: string;
data?: PageMentoringClassFindResponse;
}

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
}

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
}

export type PageableObject = {
offset?: number;
sort?: SortObject;
paged?: boolean;
pageNumber?: number;
pageSize?: number;
unpaged?: boolean;
}

export type SortObject = {
empty?: boolean;
sorted?: boolean;
unsorted?: boolean;
}

export type ApiResponseApplyPageResponse = {
isSuccess: boolean;
code: string;
message: string;
data?: ApplyPageResponse;
}

export type ApplyDetailResponse = {
applyId?: number;
classId?: number;
mentorId?: number;
name?: string;
status?: Enums.Status;
inquiry?: string;
schedule?: string;
}

export type ApplyPageResponse = {
applyments?: Array<ApplyDetailResponse>;
pagination?: Pagination;
}

