# DeMentor[디멘터]

<img src="./docs/readme-banner.png" alt="dementor-logo" width="100%" />

## 서비스 소개

디멘터는 B2C 기반의 개발자 멘토링 플랫폼입니다. 취업 준비생, 신입 개발자, 그리고 개발을 희망하는 사람들이 현업 개발자와 직접 소통하며 성장할 수 있도록 돕는 것을 목표로 합니다.

### 주요 기능

- **멘토링 매칭**: 멘티와 멘토 간의 효율적인 매칭 시스템
- **수업 관리**: 멘토링 수업 신청 및 관리
- **멘토 신청**: 멘토 지원 및 승인 프로세스
- **대시보드**: 멘토를 위한 활동 관리 시스템
- **마이페이지**: 사용자 개인 정보 및 활동 관리

## 프로젝트 구조

이 프로젝트는 모노레포 구조를 사용하며, pnpm을 패키지 매니저로 사용합니다.

### Apps

- [Service](./apps/service/README.md) - 사용자용 웹 애플리케이션
- [Admin](./apps/admin/README.md) - 관리자용 웹 애플리케이션

### Packages

- `ui/` - 공통 UI 컴포넌트
- `design-system/` - 디자인 시스템
- `utils/` - 유틸리티 함수
- `typescript-config/` - TypeScript 설정
- `eslint-config/` - ESLint 설정

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

## 기술 스택

- **프론트엔드**: React 19, TypeScript
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS
- **상태 관리**: TanStack Query
- **폼 관리**: React Hook Form
- **라우팅**: React Router
- **타입 검증**: Zod
- **테스트**: Vitest, Testing Library
