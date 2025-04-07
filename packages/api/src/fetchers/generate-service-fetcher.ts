import { ServiceError } from "../errors/service-error";
import { generateFetcher } from "../utils/api-fetcher/generateFetcher";

export const generateServiceFetcher: typeof generateFetcher = (options) => {
  return generateFetcher({
    ...options,
    base: import.meta.env.VITE_API_BASE_URL ?? "/",
    credentialMode: "include",
    errorHandler: (error) => {
      throw ServiceError.byHTTPError(error);
    },
    validateResponse: (response) => {
      if (
        typeof response === "object" &&
        response !== null &&
        "code" in response
      ) {
        if (parseInt(response.code as string) >= 400) {
          const message =
            "message" in response
              ? (response.message as string)
              : `Unknown Error ${JSON.stringify(response)}`;
          throw ServiceError.byCode(response.code as string, message);
        }
      }
    },
  });
};
