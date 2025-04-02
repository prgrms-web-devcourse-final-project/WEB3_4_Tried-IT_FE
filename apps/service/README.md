# DeMentor - Service

디멘터의 사용자용 웹 애플리케이션입니다. 멘티와 멘토가 서로 연결되고 상호작용할 수 있는 플랫폼을 제공합니다.

## [배포 링크](https://d2k2noacw72rgr.cloudfront.net/)

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

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 테스트 실행
pnpm test
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
4. 배포할 대상으로 "service" 선택
5. "Run workflow" 클릭하여 배포 시작

### 배포 프로세스

1. 코드 빌드
2. AWS S3에 정적 파일 업로드
3. CloudFront 캐시 무효화
4. 배포 완료 확인
