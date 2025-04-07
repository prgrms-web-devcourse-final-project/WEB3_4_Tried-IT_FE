import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import {
  AdminLoginRequest,
  ApiResponseObject,
  ApiResponseVoid,
} from "@/swagger/schemas";

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

// TODO: API 명세 업데이트 예정
export const getMentorApplicationList = generateServiceFetcher<
  void,
  void,
  void,
  ApiResponseObject
>({
  endpoint: "/api/admin/mentor",
  method: "GET",
});

// TODO: API 명세 업데이트 예정
export const approveMentorApplication = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ApiResponseObject
>({
  endpoint: "/api/admin/mentor/{id}/approve",
  method: "POST",
});

// TODO: API 명세 업데이트 예정
export const rejectMentorApplication = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ApiResponseObject
>({
  endpoint: "/api/admin/mentor/{id}/reject",
  method: "POST",
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

// TODO: API 명세 업데이트 예정
export const getJobCategoryList = generateServiceFetcher<
  void,
  void,
  void,
  ApiResponseObject
>({
  endpoint: "/api/admin/job",
  method: "GET",
});

// TODO: API 명세 업데이트 예정
export const postJobCategory = generateServiceFetcher<
  void,
  void,
  void,
  ApiResponseObject
>({
  endpoint: "/api/admin/job",
  method: "POST",
});

// TODO: API 명세 업데이트 예정
export const putJobCategory = generateServiceFetcher<
  void,
  void,
  void,
  ApiResponseObject
>({
  endpoint: "/api/admin/job/{id}",
  method: "PUT",
});

// TODO: API 명세 업데이트 예정
export const deleteJobCategory = generateServiceFetcher<
  { id: string | number },
  void,
  void,
  ApiResponseObject
>({
  endpoint: "/api/admin/job/{id}",
  method: "DELETE",
});
