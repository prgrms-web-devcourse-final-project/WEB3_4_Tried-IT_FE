export type ServerSuccessResponse<T> = {
  data: T;
  message: string;
  success: true;
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
  const { success } = response as ServerSuccessResponse<T>;
  return !!success;
}

export function isServerErrorResponse(
  response: unknown
): response is ServerErrorResponse {
  if (typeof response !== "object" || response === null) return false;
  const { code } = response as ServerErrorResponse;
  return parseInt(code) >= 400;
}
