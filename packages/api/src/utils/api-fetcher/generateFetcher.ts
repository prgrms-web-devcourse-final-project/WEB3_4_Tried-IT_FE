/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTPError } from "./HTTPError";

type SerializableObject = Record<
  string,
  string | number | boolean | string[] | number[]
>;

export type WithPathParams<PathParams extends SerializableObject> = {
  pathParams: PathParams;
};

export type WithQueryParams<QueryParams extends SerializableObject> = {
  queryParam: QueryParams;
};

export type WithBody<Body> = {
  body: Body;
};

export type FetcherRequestOptions<
  PathParams extends SerializableObject | void = {
    [key: string]: string | number | boolean;
  } | void,
  QueryParam extends SerializableObject | void = any,
  Body extends Record<string, any> | void = any,
  Header extends HeadersInit | void = HeadersInit,
> = {
  baseUrl?: string;
} & (QueryParam extends SerializableObject
  ? WithQueryParams<QueryParam>
  : {
      queryParam?: any;
    }) &
  (PathParams extends SerializableObject
    ? WithPathParams<PathParams>
    : {
        pathParams?: any;
      }) &
  (Body extends Record<string, any>
    ? WithBody<Body>
    : {
        body?: any;
      }) &
  (Header extends SerializableObject
    ? {
        headers?: Header;
      }
    : {
        headers?: never;
      }) &
  Omit<RequestInit, "body" | "headers">;

type Fetcher<
  FetcherOptions extends FetcherRequestOptions = FetcherRequestOptions,
  FetcherResponse = any,
> = (options?: FetcherOptions) => Promise<FetcherResponse>;

export interface FetcherGeneratorOptions {
  base?: string;
  endpoint?: string;
  method?: string;
  requestContentType?: "json" | "form-data";
  responseContentType?: "json" | "text" | "blob";
  errorHandlerByCode?: {
    [statusCode: string]: (error: HTTPError) => void;
  };
  validateResponse?: (response: unknown) => void | Promise<void>;
  errorHandler?: (error: HTTPError) => void;
  credentialMode?: RequestCredentials;
}

export function generateFetcher<
  RequestPathParams extends SerializableObject | void = SerializableObject,
  RequestQueryParams extends SerializableObject | void = SerializableObject,
  RequestBody extends Record<string, any> | void = any,
  Response = any,
  Header extends HeadersInit | void = HeadersInit,
>({
  base = "",
  endpoint = "",
  method = "GET",
  requestContentType = "json",
  responseContentType = "json",
  validateResponse,
  errorHandlerByCode = {},
  errorHandler,
  credentialMode,
}: FetcherGeneratorOptions = {}) {
  const createUrl = (
    baseUrl: string,
    pathParams?: RequestPathParams,
    queryParam?: RequestQueryParams
  ) => {
    const endPointWithPathParamsReplaced = pathParams
      ? Object.keys(pathParams).reduce(
          (acc, key) => acc.replace(`{${key}}`, `${pathParams[key]}`),
          endpoint
        )
      : endpoint;
    const queryString = queryParam
      ? `?${Object.entries(queryParam)
          .filter(([, value]) => value !== undefined)
          // TODO: , seperator로 할지, 복수 query param으로 할지 옵션을 제공할 수 있도록 변경
          // 요소가 배열인경우, ","를 seperator로 직렬화
          .map(([key, value]) => {
            let serializedValue: string | number | boolean;
            if (Array.isArray(value)) {
              serializedValue = value.join(",");
            } else {
              serializedValue = value;
            }
            return `${key}=${encodeURIComponent(serializedValue)}`;
          })
          .join("&")}`
      : "";
    return `${baseUrl}${endPointWithPathParamsReplaced}${queryString}`;
  };

  const createHeaders = (headers?: HeadersInit) => {
    const newHeaders = new Headers(headers);
    if (requestContentType === "json") {
      newHeaders.append("Content-Type", "application/json");
    }
    return newHeaders;
  };

  const createBody = (body?: any) => {
    if (!body) return undefined;
    if (requestContentType === "form-data") {
      const formData = new FormData();
      Object.keys(body).forEach((key) => {
        formData.append(
          key,
          typeof body[key] === "object" ? JSON.stringify(body[key]) : body[key]
        );
      });
      return formData;
    }
    return JSON.stringify(body);
  };

  const fetcher: Fetcher<
    FetcherRequestOptions<
      RequestPathParams,
      RequestQueryParams,
      RequestBody,
      Header
    >,
    Response
  > = async (options) => {
    const {
      baseUrl = base,
      pathParams = undefined,
      queryParam = undefined,
      body = undefined,
      headers,
      ...requestOptions
    } = options ?? {};

    try {
      const res = await fetch(createUrl(baseUrl, pathParams, queryParam), {
        method,
        headers: createHeaders(headers),
        body: createBody(body),
        credentials: credentialMode,
        ...requestOptions,
      });

      if (!res.ok) {
        const body = res.body ? await res.json() : undefined;
        const httpError = new HTTPError(res.status.toString(), body);
        if (httpError.code && errorHandlerByCode[httpError.code]) {
          return errorHandlerByCode[httpError.code](httpError);
        } else if (errorHandler) {
          return errorHandler(httpError);
        } else {
          throw httpError;
        }
      }

      let data;
      switch (responseContentType) {
        case "json":
          data = await res.json();
          break;
        case "text":
          data = await res.text();
          break;
        case "blob":
          data = await res.blob();
          break;
      }

      if (validateResponse) {
        await validateResponse(data);
      }

      return data;
    } catch (e) {
      if (HTTPError.isHTTPError(e)) {
        throw e;
      }
      throw e;
    }
  };

  return fetcher;
}
