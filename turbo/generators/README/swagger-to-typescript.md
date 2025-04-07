# Swagger to Typescript

Swagger로 작성된 API 스키마를 Typescript type으로 변환합니다.

## Usage

```sh
$ turbo generate swagger-to-typescript

$ ? What is the baseURL of the Swagger/OpenAPI schema?
// Swagger 문서가 호스팅된 baseURL을 입력하세요.(e.g. https://api.example.com)

$ ? Where should the TypeScript types be saved?
// 저장할 경로를 입력하세요.
```

## Example

### Input

```sh

$ turbo generate swagger-to-typescript

? What is the baseURL of the Swagger/OpenAPI schema?
https://api.example.com
? Where should the TypeScript types be saved?
src/types
```

### Output

```typescript
// src/types/schemas.ts

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface Comment {
  id: number;
  content: string;
}
```
