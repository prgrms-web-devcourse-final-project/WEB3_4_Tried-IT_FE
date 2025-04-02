# DeMentor - Admin

디멘터의 관리자용 웹 애플리케이션입니다. 멘토링 플랫폼의 운영과 관리를 위한 관리자 도구를 제공합니다.

## [배포 링크](https://d2amukg4n6rvst.cloudfront.net/)

## 주요 기능

### 멘토 관리

- 멘토 신청 승인/거절
- 멘토 프로필 관리
- 멘토 활동 현황 모니터링

### 수업 관리

- 수업 카테고리 관리
- 수업 신청 현황 확인
- 수업 일정 관리

### 문의 관리

- 사용자 문의사항 처리
- FAQ 관리
- 공지사항 관리

## 개발 스택

### 핵심 기술

- **UI 프레임워크**: React ^19
- **언어**: TypeScript
- **빌드 도구**: Vite
- **상태 관리**: TanStack Query
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: Shadcn UI
- **라우팅**: React Router
- **타입 검증**: Zod

### 인프라

- **호스팅**: AWS S3
- **CDN**: AWS CloudFront

## 프로젝트 구조

[Feature-Sliced Design](https://feature-sliced.design) 아키텍처를 따릅니다.

```
src/
├── app/          # 앱 초기화 및 라우팅
├── pages/        # 페이지 컴포넌트
├── features/     # 기능별 모듈
├── entities/     # 도메인 엔티티
├── shared/       # 공통 컴포넌트 및 유틸리티
└── widgets/      # 복합 컴포넌트
```

## 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 테스트 실행
pnpm test

# shadcn 컴포넌트 추가
pnpm components
```

## 환경 변수

`.env` 파일을 생성하고 다음 변수들을 설정해주세요:

```env
VITE_API_URL=your_api_url
```

## 배포

### 수동 배포

GitHub Actions의 "deployment" 워크플로우를 수동으로 실행하여 배포할 수 있습니다:

1. GitHub 저장소의 "Actions" 탭으로 이동
2. "deployment" 워크플로우 선택
3. "Run workflow" 버튼 클릭
4. 배포할 대상으로 "admin" 선택
5. "Run workflow" 클릭하여 배포 시작

### 배포 프로세스

1. 코드 빌드
2. AWS S3에 정적 파일 업로드
3. CloudFront 캐시 무효화
4. 배포 완료 확인
