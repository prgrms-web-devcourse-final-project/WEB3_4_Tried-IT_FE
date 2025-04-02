import {
  ClassDetailResponse,
  ClassListResponse,
  DeleteClassResponse,
  PostClassRequest,
  PutClassRequest,
} from "../../schemas/schemas";
import { ServerSuccessResponse } from "../../schemas/server-response.schema";
import { generateServiceFetcher } from "../generate-service-fetcher";

export const getClasses = generateServiceFetcher<
  void,
  {
    job_id: string;
    page: number;
    sort_by: "created_at" | "title";
    order: "asc" | "desc";
  },
  void,
  ServerSuccessResponse<ClassListResponse>
>({
  endpoint: "/api/class",
  method: "GET",
});

export const getClassDetail = generateServiceFetcher<
  {
    classId: string;
  },
  void,
  void,
  ServerSuccessResponse<ClassDetailResponse>
>({
  endpoint: "/api/class/{classId}",
  method: "GET",
});

export const postClass = generateServiceFetcher<
  void,
  void,
  PostClassRequest,
  null
>({
  endpoint: "/api/class",
  method: "POST",
});

export const putClass = generateServiceFetcher<
  {
    classId: string;
  },
  void,
  PutClassRequest,
  null
>({
  endpoint: "/api/class/{classId}",
  method: "PUT",
});

export const deleteClass = generateServiceFetcher<
  {
    classId: string;
  },
  void,
  void,
  ServerSuccessResponse<DeleteClassResponse>
>({
  endpoint: "/api/class/{classId}",
  method: "DELETE",
});
