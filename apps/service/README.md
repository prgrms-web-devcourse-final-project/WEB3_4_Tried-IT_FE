# DeMentor - Service

디멘터의 사용자용 웹 애플리케이션입니다. 멘티와 멘토가 서로 연결되고 상호작용할 수 있는 플랫폼을 제공합니다.

## [배포 링크](https://www.dementor.site)

## 주요 기능

### 멘티

- 멘토 검색 및 매칭
- 수업 신청 및 관리
- 멘토링 진행 상황 추적
- 개인 프로필 관리
- 멘토와 채팅

### 멘토

- 멘토 프로필 설정
- 수업 일정 관리
- 멘토링 진행 상황 관리
- 멘티와 채팅

## 개발 스택

### 핵심 기술

- **UI 프레임워크**: React ^19.0.0
- **언어**: TypeScript ~5.7.2
- **빌드 도구**: Vite ^6.2.0
- **상태 관리**: TanStack Query ^5.71.1
- **스타일링**: Tailwind CSS ^4.0.17
- **폼 관리**: React Hook Form ^7.54.2
- **UI 컴포넌트**: Radix UI, @repo/design-system
- **라우팅**: React Router ^7.4.0
- **타입 검증**: Zod ^3.24.2
- **날짜 관리**: dayjs ^1.11.13
- **아이콘**: lucide-react ^0.484.0
- **마크다운 에디터**: @uiw/react-md-editor ^4.0.5
- **웹소켓**: sockjs-client ^1.6.1, @stomp/stompjs ^7.1.1
- **UI 확장**: overlay-kit ^1.7.0
- **애니메이션**: tw-animate-css ^1.2.4

### 인프라

- **호스팅**: AWS S3
- **CDN**: AWS CloudFront

## 프로젝트 구조

[Feature-Sliced Design](https://feature-sliced.design) 아키텍처를 따릅니다.

```src/
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

# 개발 서버 실행 (React Router 7)
pnpm dev

# 빌드
pnpm build

# 서버 실행
pnpm start

# 타입 체크 및 생성
pnpm typecheck

# 린트 실행
pnpm lint

# 테스트 실행
pnpm test

# 미리보기
pnpm preview
```

## 환경 변수

`.env` 파일은 소스코드에 포함되어 있습니다. <strong>기밀 정보를 저장하는데 활용하지 마세요.</strong>

## 테스트

이 프로젝트는 Vitest와 Testing Library를 사용하여 테스트를 진행합니다:

```bash
# 모든 테스트 실행
pnpm test

```

## 배포

### 수동 배포

GitHub Actions의 "deployment" 워크플로우를 수동으로 실행하여 배포할 수 있습니다:

1. GitHub 저장소의 "Actions" 탭으로 이동
2. "deployment" 워크플로우 선택
3. "Run workflow" 버튼 클릭
4. 배포할 대상으로 "service" 선택
5. "Run workflow" 클릭하여 배포 시작

### 배포 프로세스

1. 코드 빌드
2. AWS S3에 정적 파일 업로드
3. CloudFront 캐시 무효화
4. 배포 완료 확인
