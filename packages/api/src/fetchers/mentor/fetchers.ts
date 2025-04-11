import { ConflictingAppointmentError, FieldsError } from "@/errors";

import { Status } from "@/swagger/enums";
import {
  ApiResponseGetApplyMenteePageList,
  ApiResponseMentorApplyStatusResponse,
  ApiResponseObject,
} from "@/swagger/schemas";
import { generateServiceFetcher } from "../generate-service-fetcher";

export const getRegisteredClassList = generateServiceFetcher<
  { memberId: string },
  void,
  void,
  ApiResponseObject
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
  ApiResponseGetApplyMenteePageList
>({
  endpoint: "/api/mentor/apply",
  method: "GET",
});

export const handleMentoringApplication = generateServiceFetcher<
  { applyId: string | number },
  void,
  { status: Omit<Status, "PENDING"> },
  ApiResponseMentorApplyStatusResponse
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
  ApiResponseObject
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
  {
    mentorApplyData: {
      currentCompany: string;
      name: string;
      phone: string;
      memberId: number;
      jobId: number;
      introduction: string;
      email: string;
      attachmentId: number[];
      career: 3;
    };
    files: File[];
  },
  ApiResponseObject
>({
  endpoint: "/api/mentor",
  method: "POST",
  requestContentType: "form-data",
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
  {
    mentorUpdateData: {
      jobId: number;
      career: 3;
      currentCompany: string;
      introduction: string;
      attachmentId: number[];
    };
    files: File[];
  },
  ApiResponseObject
>({
  endpoint: "/api/mentor/{memberId}",
  method: "PUT",
});

export const getMentorInfoModificationRequestList = generateServiceFetcher<
  { memberId: string },
  { status: Status; page?: number; size?: number },
  void,
  ApiResponseObject
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

// TODO: need update
export const updateMentoringSchedule = generateServiceFetcher<
  { memberId: string },
  void,
  void,
  ApiResponseObject
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

// TODO: need update
export const getMentorAvailableSchedule = generateServiceFetcher<
  { memberId: string },
  void,
  void,
  ApiResponseObject
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

// TODO: need update
export const putMentorAvailableSchedule = generateServiceFetcher<
  void,
  void,
  void,
  ApiResponseObject
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
