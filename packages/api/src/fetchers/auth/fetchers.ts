import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import { ServerSuccessResponse, SignUpRequest } from "@/schemas";

export const signUp = generateServiceFetcher<
  void,
  void,
  SignUpRequest,
  ServerSuccessResponse<{ message: string }>
>({
  endpoint: "/api/signup",
  method: "POST",
});

export const validateEmail = generateServiceFetcher<
  void,
  { email: string },
  void,
  ServerSuccessResponse<{ isEmail: boolean }>
>({
  endpoint: "/api/signup/isEmail",
  method: "GET",
});

export const requestSignUpVerifyCode = generateServiceFetcher<
  void,
  { email: string },
  void,
  null
>({
  endpoint: "/api/signup/verifyCode",
  method: "POST",
});

export const verifySignUpVerifyCode = generateServiceFetcher<
  void,
  { email: string; verifyCode: string },
  void,
  { verifyEmail: boolean }
>({
  endpoint: "/api/signup/verifyCode",
  method: "POST",
});

export const validateNickname = generateServiceFetcher<
  void,
  { nickname: string },
  void,
  ServerSuccessResponse<{ isNickname: boolean }>
>({
  endpoint: "/api/signup/isNickname",
  method: "GET",
});

export const login = generateServiceFetcher<
  void,
  { email: string; password: string },
  void,
  null
>({
  endpoint: "/api/login",
  method: "POST",
});

export const logout = generateServiceFetcher<
  void,
  void,
  void,
  { message: string }
>({
  endpoint: "/api/logout",
  method: "POST",
});
