import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import {
  ApiResponseBoolean,
  ApiResponseVoid,
  LoginRequest,
  SignupRequest,
} from "@/swagger/schemas";

export const signUp = generateServiceFetcher<
  void,
  void,
  SignupRequest,
  ApiResponseVoid
>({
  endpoint: "/api/members",
  method: "POST",
});

export const validateEmail = generateServiceFetcher<
  void,
  { email: string },
  void,
  ApiResponseBoolean
>({
  endpoint: "/api/members/isEmail",
  method: "GET",
});

export const requestSignUpVerifyCode = generateServiceFetcher<
  void,
  { email: string },
  void,
  ApiResponseVoid
>({
  endpoint: "/api/members/verifyCode",
  method: "POST",
});

export const verifySignUpVerifyCode = generateServiceFetcher<
  void,
  { email: string; verifyCode: string },
  void,
  ApiResponseBoolean
>({
  endpoint: "/api/members/verifyEmail",
  method: "GET",
});

export const validateNickname = generateServiceFetcher<
  void,
  { nickname: string },
  void,
  ApiResponseBoolean
>({
  endpoint: "/api/members/isNickname",
  method: "GET",
});

export const login = generateServiceFetcher<
  void,
  void,
  LoginRequest,
  ApiResponseVoid
>({
  endpoint: "/api/members/login",
  method: "POST",
});

export const logout = generateServiceFetcher<void, void, void, ApiResponseVoid>(
  {
    endpoint: "/api/members/logout",
    method: "POST",
  }
);
