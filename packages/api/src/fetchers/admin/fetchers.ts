import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import {
  AdminLoginRequest,
  ApiResponseApplymentApprovalResponse,
  ApiResponseApplymentDetailResponse,
  ApiResponseApplymentRejectResponse,
  ApiResponseListJobFindResponse,
  ApiResponseObject,
  ApiResponsePageApplymentResponse,
  ApiResponseVoid,
  ApplymentRejectRequest,
  JobCreaeteRequest,
  JobCreateResponse,
  JobUpdateRequest,
  JobUpdateResponse,
} from "@/swagger/schemas";

export const putJobCategory = generateServiceFetcher<
  { jobId: number },
  void,
  JobUpdateRequest,
  JobUpdateResponse
>({
  endpoint: "/api/admin/job/{jobId}",
  method: "PUT",
});

export const deleteJobCategory = generateServiceFetcher<
  { jobId: number },
  void,
  void,
  ApiResponseObject
>({
  endpoint: "/api/admin/job/{jobId}",
  method: "DELETE",
});

export const getJobCategoryList = generateServiceFetcher<
  void,
  void,
  void,
  ApiResponseListJobFindResponse
>({
  endpoint: "/api/admin/job",
  method: "GET",
});

export const postJobCategory = generateServiceFetcher<
  void,
  void,
  JobCreaeteRequest,
  JobCreateResponse
>({
  endpoint: "/api/admin/job",
  method: "POST",
});

export const login = generateServiceFetcher<
  void,
  void,
  AdminLoginRequest,
  ApiResponseVoid
>({
  endpoint: "/api/admin/login",
  method: "POST",
});

export const logout = generateServiceFetcher<void, void, void, ApiResponseVoid>(
  {
    endpoint: "/api/admin/logout",
    method: "POST",
  }
);

export const getMentorApplicationList = generateServiceFetcher<
  void,
  {
    page: number;
    size: number;
    sort: "id,desc";
  },
  void,
  ApiResponsePageApplymentResponse
>({
  endpoint: "/api/admin/mentor",
  method: "GET",
});

export const getMentorApplicationDetail = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ApiResponseApplymentDetailResponse
>({
  endpoint: "/api/admin/mentor/applyment/{id}",
  method: "GET",
});

export const approveMentorApplication = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ApiResponseApplymentApprovalResponse
>({
  endpoint: "/api/admin/mentor/applyment/{id}",
  method: "POST",
});

export const rejectMentorApplication = generateServiceFetcher<
  { id: string | number },
  void,
  ApplymentRejectRequest,
  ApiResponseApplymentRejectResponse
>({
  endpoint: "/api/admin/mentor/applyment/{id}/reject",
  method: "PUT",
});

// TODO: API 명세 업데이트 예정
export const approveMentorInfoModification = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ApiResponseObject
>({
  endpoint: "/api/admin/mentor/modify/{id}/approve",
  method: "POST",
});

// TODO: API 명세 업데이트 예정
export const rejectMentorInfoModification = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ApiResponseObject
>({
  endpoint: "/api/admin/mentor/modify/{id}/reject",
  method: "POST",
});
