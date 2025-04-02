import { ApplyStatus } from "@/enums";
import { ConflictingAppointmentError, FieldsError } from "@/errors";
import {
  AppliedMenteeListResponse,
  GetMentorAvailableScheduleRequest,
  GetMentorAvailableScheduleResponse,
  GetMentorInfoModificationRequestListRequest,
  GetMentorInfoModificationRequestListResponse,
  HandleMentoringApplicationResponse,
  MentorInfoResponse,
  MentorRoleApplicationRequest,
  PutMentorAvailableSchedulePathParams,
  PutMentorAvailableScheduleRequest,
  PutMentorAvailableScheduleResponse,
  RegisteredClassListResponse,
  RequestUpdateMentorInfoRequest,
  RequestUpdateMentorInfoResponse,
  UpdateMentoringScheduleRequest,
  UpdateMentoringScheduleResponse,
} from "../../schemas/schemas";
import { ServerSuccessResponse } from "../../schemas/server-response.schema";
import { generateServiceFetcher } from "../generate-service-fetcher";

export const getRegisteredClassList = generateServiceFetcher<
  { memberId: string },
  void,
  void,
  ServerSuccessResponse<RegisteredClassListResponse>
>({
  endpoint: "/api/mentor/class/{memberId}",
  method: "GET",
});

/**
 * @description 멘토가 자신의 멘토링 신청한 멘티 목록을 조회하기 위한 API 엔드 포인트
 * @param page 페이지 번호. one-based index
 * @param size 페이지 크기
 * @default page = 1, size = 10
 */
export const getAppliedMenteeList = generateServiceFetcher<
  void,
  { page?: number; size?: number },
  void,
  ServerSuccessResponse<AppliedMenteeListResponse>
>({
  endpoint: "/api/mentor/apply",
  method: "GET",
});

export const handleMentoringApplication = generateServiceFetcher<
  { applyId: string | number },
  void,
  { status: ApplyStatus },
  ServerSuccessResponse<HandleMentoringApplicationResponse>
>({
  endpoint: "/api/mentor/apply/{applyId}/status",
  method: "POST",
});

/**
 * @description 멘토로서의 본인 정보를 조회합니다.
 */
export const getMentorInfo = generateServiceFetcher<
  { memberId: string },
  void,
  void,
  ServerSuccessResponse<MentorInfoResponse>
>({
  endpoint: "/api/mentor/{memberId}/info",
  method: "GET",
});

/**
 * @description 멘토 지원을 합니다.
 */
export const applyForMentorRole = generateServiceFetcher<
  void,
  void,
  MentorRoleApplicationRequest,
  ServerSuccessResponse<null>
>({
  endpoint: "/api/mentor",
  method: "POST",
  errorHandlerByCode: {
    "400": (error) => {
      if (FieldsError.isFieldsErrorBody(error.body)) {
        throw new FieldsError(error.body.fields, error.body.message);
      }
      throw error;
    },
  },
});

/**
 * @description 기존 멘토 정보를 수정합니다. 관리자의 승인이 필요합니다.
 */
export const requestUpdateMentorInfo = generateServiceFetcher<
  { memberId: string },
  void,
  RequestUpdateMentorInfoRequest,
  ServerSuccessResponse<RequestUpdateMentorInfoResponse>
>({
  endpoint: "/api/mentor/{memberId}",
  method: "PUT",
});

export const getMentorInfoModificationRequestList = generateServiceFetcher<
  { memberId: string },
  GetMentorInfoModificationRequestListRequest,
  void,
  ServerSuccessResponse<GetMentorInfoModificationRequestListResponse>
>({
  endpoint: "/api/mentor/{memberId}/modification-request",
  method: "GET",
  errorHandlerByCode: {
    "400": (error) => {
      if (FieldsError.isFieldsErrorBody(error.body)) {
        throw new FieldsError(error.body.fields, error.body.message);
      }
      throw error;
    },
  },
});

export const updateMentoringSchedule = generateServiceFetcher<
  { memberId: string },
  void,
  UpdateMentoringScheduleRequest,
  ServerSuccessResponse<UpdateMentoringScheduleResponse>
>({
  endpoint: "/api/mentor/{memberId}/schedule",
  method: "PUT",
  errorHandlerByCode: {
    "400": (error) => {
      if (FieldsError.isFieldsErrorBody(error.body)) {
        throw new FieldsError(error.body.fields, error.body.message);
      }
      throw error;
    },
    "409": (error) => {
      if (
        ConflictingAppointmentError.isConflictingAppointmentBody(error.body)
      ) {
        throw new ConflictingAppointmentError(
          error.body.data.conflictingAppointments,
          error.body.message
        );
      }
      throw error;
    },
  },
});

export const getMentorAvailableSchedule = generateServiceFetcher<
  { memberId: string },
  GetMentorAvailableScheduleRequest,
  void,
  ServerSuccessResponse<GetMentorAvailableScheduleResponse>
>({
  endpoint: "/api/mentor/{memberId}/availability",
  method: "GET",
  errorHandlerByCode: {
    "400": (error) => {
      if (FieldsError.isFieldsErrorBody(error.body)) {
        throw new FieldsError(error.body.fields, error.body.message);
      }
      throw error;
    },
  },
});

export const putMentorAvailableSchedule = generateServiceFetcher<
  PutMentorAvailableSchedulePathParams,
  void,
  PutMentorAvailableScheduleRequest,
  ServerSuccessResponse<PutMentorAvailableScheduleResponse>
>({
  endpoint: "/api/mentor/{memberId}/availability/{yearMonthDay}",
  method: "PUT",
  errorHandlerByCode: {
    "400": (error) => {
      if (FieldsError.isFieldsErrorBody(error.body)) {
        throw new FieldsError(error.body.fields, error.body.message);
      }
      throw error;
    },
  },
});
