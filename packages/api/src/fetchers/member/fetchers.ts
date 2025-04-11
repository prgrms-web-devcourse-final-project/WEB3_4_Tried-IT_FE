import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import {
  ApiResponseMemberInfoResponse,
  ApiResponseVoid,
} from "@/swagger/schemas";

export const getMyMemberInfo = generateServiceFetcher<
  void,
  void,
  void,
  ApiResponseMemberInfoResponse
>({
  endpoint: "/api/members/info",
  method: "GET",
});

export const putMyMemberInfo = generateServiceFetcher<
  void,
  { nickname: string },
  void,
  ApiResponseVoid
>({
  endpoint: "/api/members/info",
  method: "PUT",
});
