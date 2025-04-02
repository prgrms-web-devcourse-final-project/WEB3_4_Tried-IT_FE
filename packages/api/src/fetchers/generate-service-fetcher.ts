import { ServiceError } from "../errors/service-error";
import { generateFetcher } from "../utils/api-fetcher/generateFetcher";

export const generateServiceFetcher: typeof generateFetcher = (options) => {
  return generateFetcher({
    ...options,
    base: import.meta.env.VITE_API_BASE_URL ?? "/",
    errorHandler: (error) => {
      throw ServiceError.byHTTPError(error);
    },
  });
};
