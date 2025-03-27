# app

App 레이어는 앱 전반에 걸친 요소들을 다루는 공간입니다.
이 레이어는 기술적 관점(예: 컨텍스트 프로바이더)과 비즈니스적 관점(예: 분석 도구) 모두를 포함할 수 있습니다.

## 특징

• 일반적으로 슬라이스(slices)를 포함하지 않으며, 대신 세그먼트(segments)로 구성됩니다.
• Shared 레이어와 마찬가지로 특정 기능에 국한되지 않고, 앱 전체에서 사용되는 요소들을 관리합니다.

## 이 레이어에서 일반적으로 찾을 수 있는 세그먼트

📁 routes — 라우터(router) 설정
• 애플리케이션의 페이지 네비게이션 및 라우팅을 관리합니다.
• 예: React Router, Next.js의 pages 디렉터리, Vue Router 설정 등.

📁 store — 글로벌 스토어 설정
• 앱 전역 상태를 관리하는 스토어 설정을 포함합니다.
• 예: Redux, Zustand, Recoil 등의 상태 관리 라이브러리 설정.

📁 styles — 글로벌 스타일
• 애플리케이션 전반에 적용되는 전역 스타일 및 테마 설정.
• 예: CSS 파일, Tailwind 설정, Styled Components의 ThemeProvider, MUI 테마 설정 등.

📁 entrypoint — 애플리케이션 코드의 진입점
• 앱이 실행되는 가장 최상위 파일로, 프레임워크에 따라 다르게 구성됩니다.
• 예:
• React: index.tsx 또는 main.tsx
• Next.js: \_app.tsx
• Vue: main.js
• Angular: main.ts
