# API Fetcher

API 요청을 생성하고 처리하기 위한 유틸리티 모듈입니다.

## 주요 기능

- 타입 안전한 API 요청 생성
- Path 파라미터, 쿼리 파라미터, 요청 본문 지원
- 에러 핸들링
- 다양한 콘텐츠 타입 지원 (JSON, Form-data)
- 응답 형식 지원 (JSON, Text, Blob)

## 사용법

### 기본 Fetcher 생성

```ts
const getFetcher = generateFetcher({
  base: "https://api.example.com",
  endpoint: "/users",
  method: "GET",
});
```

### Path 파라미터 사용

```ts
const getUserFetcher = generateFetcher<{ id: string }>({
  endpoint: "/users/{id}",
  method: "GET",
});
// 사용
await getUserFetcher({
  pathParams: { id: "123" },
});
```

### 쿼리 파라미터 사용

```ts
const searchUsersFetcher = generateFetcher<
  void,
  { query: string; page: number }
>({
  endpoint: "/users/search",
  method: "GET",
});
// 사용
await searchUsersFetcher({
  queryParam: { query: "john", page: 1 },
});
```

### 요청 본문 사용

```ts
type CreateUserBody = {
  name: string;
  email: string;
};
const createUserFetcher = generateFetcher<void, void, CreateUserBody>({
  endpoint: "/users",
  method: "POST",
});
// 사용
await createUserFetcher({
  body: { name: "John", email: "john@example.com" },
});
```

### 응답 타입 지정

```ts
const getUserFetcher = generateFetcher<void, void, void, { name: string }>({
  endpoint: "/user",
  method: "GET",
});
// 사용
const user = await getUserFetcher(); // { name: "John" }
```

### 에러 핸들링

```ts
const fetcher = generateFetcher({
  endpoint: "/api",
  errorHandlers: {
    "404": (error) => {
      // 404 에러 처리
    },
    "500": (error) => {
      // 500 에러 처리
    },
  },
});
```

## 타입 정의

### FetcherGeneratorOptions

```ts
interface FetcherGeneratorOptions {
  base?: string; // 기본 URL
  endpoint?: string; // 엔드포인트 경로
  method?: string; // HTTP 메서드
  requestContentType?: "json" | "form-data"; // 요청 콘텐츠 타입
  responseContentType?: "json" | "text" | "blob"; // 응답 콘텐츠 타입
  errorHandlers?: {
    // 에러 핸들러
    [statusCode: string]: (error: ServerError) => void;
  };
  credentialMode?: RequestCredentials; // 인증 모드
}
```

## 주의사항

- Path 파라미터는 `{paramName}` 형식으로 endpoint에 지정해야 합니다.
- 배열 형태의 쿼리 파라미터는 쉼표(,)로 구분된 문자열로 직렬화됩니다.
- 서버 에러 응답은 `ServerError` 형식으로 변환되어 처리됩니다.
