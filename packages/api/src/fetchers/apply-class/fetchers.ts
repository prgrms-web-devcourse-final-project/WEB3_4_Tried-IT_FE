import {
  AppliedClassListResponse,
  ApplyClassRequest,
  ApplyClassResponse,
} from "../../schemas/schemas";
import { ServerSuccessResponse } from "../../schemas/server-response.schema";
import { generateServiceFetcher } from "../generate-service-fetcher";

export const applyClass = generateServiceFetcher<
  void,
  void,
  ApplyClassRequest,
  ServerSuccessResponse<ApplyClassResponse>
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
  ServerSuccessResponse<AppliedClassListResponse>
>({
  endpoint: "/api/apply",
  method: "GET",
});

export const cancelApplyClass = generateServiceFetcher<
  { classId: number },
  void,
  void,
  ServerSuccessResponse<null>
>({
  endpoint: "/api/apply/{classId}",
  method: "DELETE",
});
