import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import { ServerSuccessResponse, SignUpRequest } from "@/schemas";

export const signUp = generateServiceFetcher<
  void,
  void,
  SignUpRequest,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/members",
  method: "POST",
});

export const validateEmail = generateServiceFetcher<
  void,
  { email: string },
  void,
  ServerSuccessResponse<{ isEmail: boolean }>
>({
  endpoint: "/api/members/isEmail",
  method: "GET",
});

export const requestSignUpVerifyCode = generateServiceFetcher<
  void,
  { email: string },
  void,
  null
>({
  endpoint: "/api/members/verifyCode",
  method: "POST",
});

export const verifySignUpVerifyCode = generateServiceFetcher<
  void,
  { email: string; verifyCode: string },
  void,
  { verifyEmail: boolean }
>({
  endpoint: "/api/members/verifyEmail",
  method: "GET",
});

export const validateNickname = generateServiceFetcher<
  void,
  { nickname: string },
  void,
  ServerSuccessResponse<{ isNickname: boolean }>
>({
  endpoint: "/api/members/isNickname",
  method: "GET",
});

export const login = generateServiceFetcher<
  void,
  { email: string; password: string },
  void,
  null
>({
  endpoint: "/api/members/login",
  method: "POST",
});

export const logout = generateServiceFetcher<
  void,
  void,
  void,
  { message: string }
>({
  endpoint: "/api/members/logout",
  method: "POST",
});
