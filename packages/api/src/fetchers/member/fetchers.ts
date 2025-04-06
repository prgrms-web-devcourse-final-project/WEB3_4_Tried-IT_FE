import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import {
  GetMyMemberInfoResponse,
  PutMyMemberInfoRequest,
  ServerSuccessResponse,
} from "@/schemas";

export const getMyMemberInfo = generateServiceFetcher<
  void,
  void,
  void,
  ServerSuccessResponse<GetMyMemberInfoResponse>
>({
  endpoint: "/api/members/info",
  method: "GET",
});

export const putMyMemberInfo = generateServiceFetcher<
  void,
  void,
  PutMyMemberInfoRequest,
  null
>({
  endpoint: "/api/member/me",
  method: "PUT",
});
