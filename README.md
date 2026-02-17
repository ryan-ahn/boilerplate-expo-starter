## Ryan's Expo Awesome Starter

![Author](https://img.shields.io/badge/Author-ryan-orange.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Last Commit](https://img.shields.io/github/last-commit/ryan-ahn/boilerplate-expo-starter)

`create-expo-app` 기반으로 구성한 **Expo 스타터 템플릿**입니다. 바로 실무/사이드 프로젝트에 쓸 수 있도록 기본 구조와 개발 경험을 정리해 둔 레포입니다.

---

## Features

- **Expo + React Native**: iOS / Android / Web 을 동시에 노리는 크로스 플랫폼 환경
- **Typed Programming (TypeScript)**: 전역에 타입을 적용해 안정적인 리팩터링과 자동완성 제공
- **Routing / Navigation**: `expo-router` 기반 파일 라우팅 (필요시 `app` 디렉토리만 수정해서 사용)
- **Theming & Styling**: 다크 모드 대응 가능한 색상 토큰/테마 구조 (`theme/` 활용)
- **Lint & Format**: ESLint + Prettier로 일관된 코드 스타일 유지
- **Absolute Import**: `@/` prefix 로 깔끔한 절대 경로 import
- **Production Ready Scripts**: 개발/빌드/테스트/포맷/린트 스크립트 정리

> 이 레포는 기본 Expo 템플릿에서 불필요한 부분을 정리하고, 실제 프로젝트에서 자주 쓰는 구조/패턴 위주로 다듬는 것을 목표로 합니다.

---

## Tech Stack

- **Framework**: [Expo](https://expo.dev) + React Native
- **Language**: TypeScript
- **Routing**: `expo-router` (파일 기반 라우팅)
- **Package Manager**: pnpm (또는 npm/yarn 으로 변경 가능)
- **Lint / Format**: ESLint, Prettier
- **Styling / Theme**: Expo 스타일 시스템 + 커스텀 테마 (`theme/`)

---

## Getting Started

### 1) 의존성 설치

```bash
pnpm install
```

> pnpm 을 쓰지 않는다면 `npm install` 또는 `yarn` 으로 대체해도 됩니다.

### 2) 개발 서버 실행

```bash
pnpm start
# 또는
pnpm expo start
```

터미널에 표시되는 옵션을 통해 아래 환경에서 바로 실행할 수 있습니다.

- **iOS 시뮬레이터**
- **Android 에뮬레이터**
- **실기기 (Expo Go 앱)**
- **웹 브라우저 (지원하는 경우)**

### 3) 프로덕션 빌드

```bash
pnpm build
```

Expo EAS 등을 사용한다면 빌드/배포 스크립트를 여기에 추가해서 사용하세요.

### 4) 테스트 실행 (선택)

```bash
pnpm test
```

### 5) 린트 실행

```bash
pnpm lint
```

---

## 프로젝트 구조 (예시)

```bash
.
├── app/              # 화면/라우트 (expo-router)
├── components/       # 공통 UI 컴포넌트
├── theme/            # 색상, 타이포, 라이트/다크 테마 등
├── hooks/            # 커스텀 훅
├── utils/            # 유틸 함수
└── ...
```

- **`app/`**: 페이지 및 네비게이션 구조. 라우팅 변경은 이 디렉토리 위주로 수정합니다.
- **`components/`**: 재사용 가능한 공통 UI (버튼, 카드, 레이아웃 등)를 모아두는 곳입니다.
- **`theme/`**: `theme/colors.ts` 등 테마 관련 설정 파일이 위치합니다.

---

## 새 프로젝트로 가져가기

1. 이 레포를 템플릿으로 새로운 Git 저장소를 생성합니다.
2. 필요 없는 화면/컴포넌트는 `app/`, `components/` 에서 제거합니다.
3. `theme/colors.ts` 및 전역 스타일을 프로젝트 컨셉에 맞게 수정합니다.
4. 패키지 이름, 앱 이름 등의 Expo 설정(`app.json` 또는 `app.config.*`)을 변경합니다.

---

## 참고 자료

- [Expo 공식 문서](https://docs.expo.dev/)
- [React Native 공식 문서](https://reactnative.dev/)

필요하다면 Turborepo / Vite 스타터 리드미처럼, 테스트/스토리북/모노레포 구조가 추가되면 이 문서에 섹션을 계속 확장해 나가면 됩니다.
