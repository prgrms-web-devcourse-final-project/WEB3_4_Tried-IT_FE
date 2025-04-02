import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import {
  MentorApplicationDetailResponse,
  ServerSuccessResponse,
} from "@/schemas";

export const login = generateServiceFetcher<
  void,
  void,
  { email: string; password: string },
  null
>({
  endpoint: "/api/admin/login",
  method: "POST",
});

export const logout = generateServiceFetcher<
  void,
  void,
  void,
  { message: string }
>({
  endpoint: "/api/admin/logout",
  method: "POST",
});

// TODO: API 명세 업데이트 예정
export const getMentorApplicationDetail = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  MentorApplicationDetailResponse
>({
  endpoint: "/api/admin/mentor/{id}",
  method: "GET",
});

// TODO: API 명세 업데이트 예정
export const getMentorApplicationList = generateServiceFetcher<
  void,
  void,
  void,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/admin/mentor",
  method: "GET",
});

// TODO: API 명세 업데이트 예정
export const approveMentorApplication = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/admin/mentor/{id}/approve",
  method: "POST",
});

// TODO: API 명세 업데이트 예정
export const rejectMentorApplication = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/admin/mentor/{id}/reject",
  method: "POST",
});

// TODO: API 명세 업데이트 예정
export const approveMentorInfoModification = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/admin/mentor/modify/{id}/approve",
  method: "POST",
});

// TODO: API 명세 업데이트 예정
export const rejectMentorInfoModification = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/admin/mentor/modify/{id}/reject",
  method: "POST",
});

// TODO: API 명세 업데이트 예정
export const getJobCategoryList = generateServiceFetcher<
  void,
  void,
  void,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/admin/job",
  method: "GET",
});

// TODO: API 명세 업데이트 예정
export const postJobCategory = generateServiceFetcher<
  void,
  void,
  void,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/admin/job",
  method: "POST",
});

// TODO: API 명세 업데이트 예정
export const putJobCategory = generateServiceFetcher<
  void,
  void,
  void,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/admin/job/{id}",
  method: "PUT",
});

// TODO: API 명세 업데이트 예정
export const deleteJobCategory = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/admin/job/{id}",
  method: "DELETE",
});
