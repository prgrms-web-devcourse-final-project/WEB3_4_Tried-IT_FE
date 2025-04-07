import {
  ApiResponseApplyIdResponse,
  ApiResponseApplyPageResponse,
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
  { classId: number },
  void,
  void,
  ApiResponseVoid
>({
  endpoint: "/api/apply/{classId}",
  method: "DELETE",
});
