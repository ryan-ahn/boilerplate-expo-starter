## Ryan's Expo Awesome Starter

![Author](https://img.shields.io/badge/Author-ryan-orange.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Last Commit](https://img.shields.io/github/last-commit/ryan-ahn/boilerplate-expo-starter)

`create-expo-app` 기반으로 구성한 **Expo 스타터 템플릿**입니다.

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
- **Database**: [Supabase](https://supabase.com) 기반 Postgres DB
- **ORM**: [Drizzle](https://orm.drizzle.team) (타입 안전한 쿼리/스키마 관리)
- **Package Manager**: pnpm (또는 npm/yarn 으로 변경 가능)
- **Lint / Format**: ESLint, Prettier
- **Styling / Theme**: Expo 스타일 시스템 + 커스텀 테마 (`theme/`)

---

## Getting Started

### 1) 의존성 설치

```bash
npm install
```

### 2) 개발 서버 실행

```bash
npm start
```

터미널에 표시되는 옵션을 통해 아래 환경에서 바로 실행할 수 있습니다.

- **iOS 시뮬레이터**
- **Android 에뮬레이터**
- **실기기 (Expo Go 앱)**
- **웹 브라우저 (지원하는 경우)**

---

## 프로젝트 구조

```bash
.
├── app/          # 화면/라우트 (expo-router)
├── assets/       # 정적 자산
├── components/   # 공통 UI 컴포넌트
├── constants/    # 상수 정의
├── containers/   # 컨테이너 (Supabase/모달 등 프로바이더·레이아웃)
├── hooks/        # 커스텀 훅
├── libs/         # 외부 라이브러리 연동 (Drizzle 등)
├── scripts/      # 스크립트 (시드 등)
├── stores/       # 전역 상태 (Zustand)
├── theme/        # 색상, 타이포, 라이트/다크 테마
└── utils/        # 유틸 함수
```
