import {
  ApiResponseApplyIdResponse,
  ApiResponseApplyPageResponse,
  ApiResponseApplyScheduleResponse,
  ApiResponseVoid,
  ApplyCreateRequest,
} from "@/swagger/schemas";
import { generateServiceFetcher } from "../generate-service-fetcher";

export const applyClass = generateServiceFetcher<
  void,
  void,
  ApplyCreateRequest,
  ApiResponseApplyIdResponse
>({
  endpoint: "/api/apply",
  method: "POST",
});

/**
 * @description page: one-based index
 */
export const getAppliedClassList = generateServiceFetcher<
  void,
  { page: number; size: number },
  void,
  ApiResponseApplyPageResponse
>({
  endpoint: "/api/apply",
  method: "GET",
});

export const cancelApplyClass = generateServiceFetcher<
  { applyId: number },
  void,
  void,
  ApiResponseVoid
>({
  endpoint: "/api/apply/{applyId}",
  method: "DELETE",
});

/**
 * @description startDate: YYYYMMDD, endDate: YYYYMMDD
 */
export const getClassAppliedScheduleList = generateServiceFetcher<
  { classId: number },
  { startDate: string; endDate: string },
  void,
  ApiResponseApplyScheduleResponse
>({
  endpoint: "/api/apply/schedules/{classId}",
  method: "GET",
});
