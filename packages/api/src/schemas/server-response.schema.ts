export type ServerSuccessResponse<T> = {
  code: string;
  message: string;
  data?: T;
  isSuccess: boolean;
};

export type ServerErrorResponse<E = Record<string, unknown>> = {
  error?: E;
  code: string;
  details: string;
};

export function isServerSuccessResponse<T>(
  response: unknown
): response is ServerSuccessResponse<T> {
  if (typeof response !== "object" || response === null) return false;
  const { isSuccess } = response as ServerSuccessResponse<T>;
  return isSuccess;
}

export function isServerErrorResponse(
  response: unknown
): response is ServerErrorResponse {
  if (typeof response !== "object" || response === null) return false;
  const { code } = response as ServerErrorResponse;
  return parseInt(code) >= 400;
}
