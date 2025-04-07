import {
  ApiResponseMentoringClassDetailResponse,
  ApiResponseMentoringClassUpdateResponse,
  ApiResponseObject,
  ApiResponsePageMentoringClassFindResponse,
  MentoringClassCreateRequest,
  MentoringClassUpdateRequest,
} from "@/swagger/schemas";
import { generateServiceFetcher } from "../generate-service-fetcher";

export const getClasses = generateServiceFetcher<
  void,
  {
    jobId: string;
    page: number;
    size: number;
    sort: ("created_at" | "title")[];
  },
  void,
  ApiResponsePageMentoringClassFindResponse
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
  ApiResponseMentoringClassDetailResponse
>({
  endpoint: "/api/class/{classId}",
  method: "GET",
});

export const postClass = generateServiceFetcher<
  void,
  void,
  MentoringClassCreateRequest,
  ApiResponseMentoringClassDetailResponse
>({
  endpoint: "/api/class",
  method: "POST",
});

export const putClass = generateServiceFetcher<
  {
    classId: string;
  },
  void,
  MentoringClassUpdateRequest,
  ApiResponseMentoringClassUpdateResponse
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
  ApiResponseObject
>({
  endpoint: "/api/class/{classId}",
  method: "DELETE",
});
