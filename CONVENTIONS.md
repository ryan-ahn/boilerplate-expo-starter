# 코드 작성 규칙

프로젝트 전반에서 아래 규칙을 따릅니다.

---

## 원칙

### **의존성 최소화**

- 모듈·파일 간 의존을 줄여서 코드를 빠르게 찾고 수정할 수 있도록 합니다.
- 타입·유틸·훅·컨텍스트·상수 등은 사용하는 위치에 두고, 두 곳 이상에서 쓰일 때만 `types/`, `utils/`, `stores/` 등으로 분리합니다.
- 컴포넌트는 디자인 시스템으로 지정된 재사용 컴포넌트만 추가하며, 불필요하게 컴포넌트화 시키지 않도록 합니다.

### **단일 책임**

- 한 파일·한 함수는 한 가지 역할만 담당하도록 하고, 다중 책임을 피합니다.
- 역할이 늘어나면 파일·함수를 나누고, 이름만 봐도 무엇을 하는지 드러나게 짓습니다.

### **가독성 우선**

- 성능에 지대한 영향을 주지 않는 경우 **가독성을 먼저** 합니다. 이해하기 쉬운 코드를 유지하는 것을 우선합니다.(AI 활용을 위함)
- 다만, **과도한 재렌더링** 등으로 렌더/사이클 파악을 어렵게 만들거나, 레거시가 쌓이는 코드라면 **그때는 성능을 먼저** 고려합니다.

---

## 프로젝트 구조

### 앱 라우팅

- **`(tabs)/`** — 하단 탭 화면: `_layout.tsx`, `index`, `map`, `pin`, `myPage` 등
- **`(stack)/`** — 스택(카드) 화면: `editProfile.tsx`, `settings.tsx`, `sample.tsx` 등
- **`(popup)/`** — 모달 형태 화면: `signIn.tsx` 등
- **`_layout.tsx`** — 루트 레이아웃. Stack으로 (tabs)/(stack)/(popup) 스크린 등록, Provider·Toast·Modal 래핑

### 경로 별칭

| 별칭              | 디렉터리      | 역할                                                      |
| ----------------- | ------------- | --------------------------------------------------------- |
| `@stack/*`        | app/(stack)/  | 스택(카드) 스크린                                         |
| `@tabs/*`         | app/(tabs)/   | 탭 스크린                                                 |
| `@popup/*`        | app/(popup)/  | 모달 스크린                                               |
| `@assets/*`       | assets/       | 이미지, 폰트 등 정적 자산                                 |
| `@components/*`   | components/   | 재사용 UI 컴포넌트                                        |
| `@constants/*`    | constants/    | 에러 메시지 등 상수                                       |
| `@containers/*`   | containers/   | 모달·토스트 등 전역 UI 컨테이너                           |
| `@hooks/*`        | hooks/        | 커스텀 훅                                                 |
| `@libs/*`         | libs/         | 외부 라이브러리 래퍼·설정                                 |
| `@providers/*`    | providers/    | React Context Provider(인증·테마 등)                      |
| `@repositories/*` | repositories/ | 데이터 접근 계층(DB·스토리지 직접 호출)                   |
| `@services/*`     | services/     | 비즈니스 로직·유스케이스(repository 사용)                 |
| `@stores/*`       | stores/       | Zustand 전역 스토어                                       |
| `@styles/*`       | styles/       | 공통 스타일 상수·유틸                                     |
| `@theme/*`        | theme/        | 테마(색·간격·반경 등), 스타일 헬퍼                        |
| `@utils/*`        | utils/        | 포맷터·변환 등의 UI·상태·API 없이 입출력만 하는 순수 함수 |
| `types/*`         | types/        | 공용 타입·인터페이스 정의                                 |

- **`types/*`만 `@`를 쓰지 않는 이유:** 타입 전용 디렉터리라는 점을 구분하고, npm의 `@types/*`(DefinitelyTyped)와의 혼동을 피하기 위함
- **가져올 때:** `types/*`에서 가져온 값은 타입·인터페이스이므로 `import type { ... }` 형태로 쓴다. (타입만 import 하여 런타임 코드에서 제거되도록 함)

---

## 컴포넌트 구조

컴포넌트는 **아래 순서의 블록**으로 구성합니다. 주석으로 구역을 나눕니다.

### 1. imports

- React / React Native
- 서드파티 (expo-router, community 라이브러리 등):
- `@components/*`
- `@hooks/*`
- `@providers/*`, `@services/*`
- `@theme/*`, `@utils/*`

### 2. constants

- 스크린에서만 쓰는 상수들

### 3. types, interfaces

- 스크린에서만 쓰는 별칭 타입
- 스크린용 `Props`

### 4. root component

- JSDoc으로 스크린 역할·주요 파라미터 기술
- **하나의** 스크린 컴포넌트
- 내부: hooks → states → styles → options(useMemo 등) → **render** (Stack.Screen + 본문 View/ScrollView)
- 본문은 `variant` 등에 따라 **섹션 컴포넌트**로 쪼갬 (예: `NameSection`, `EmailSection`)

### 5. section components

- 스크린 본문을 구성하는 큰 단위
- 각 섹션도 동일한 **컴포넌트 내부 섹션 순서** 적용: hooks → refs → states → initialize → styles → handlers → render
- 공통 스타일(menuBox, menuItem, labelBox 등)은 섹션별로 StyleSheet.create

### 6. inner components

- 해당 스크린 안에서만 쓰는 UI
- 필요 시 `// states`(useState 등), `// initialize`(useEffect) 포함할 수 있음

### 7. utils

- 이 파일에서만 공용으로 쓰는 함수 (예: `formatter`, `parser`, `handler` 등)
- 컴포넌트 바깥에 선언

### 7. options

- `HeaderLeft`, `HeaderRight` 등 Stack 헤더에 넣는 컴포넌트
- 헤더 버튼 동작(닫기, 제출 등)은 여기서 **handlers**로 처리
- 루트 `_layout.tsx`에서는 `screenOptions`을 가져와 해당 Stack.Screen의 `options`에 spread 합니다.

---

## 컴포넌트 내부 구조

### 1. 컴포넌트 설명

루트 컴포넌트 상단에 역할과 주요 props를 JSDoc(**주석**)으로 간단히 기술합니다.

```ts
/**
 * 샘플 스크린
 * @param variant 형태
 * @param color 컬러
 */
const SampleScreen = () => { ... }
export default SampleScreen;
```

### 2. 코드 블록 순서

함수형 컴포넌트 안에서는 아래 순서로 블록을 구분합니다. 주석으로 구역을 나눕니다.

1. `hooks` - 커스텀/라이브러리 훅 호출
2. `refs` - useRef로 관리하는 ref들
3. `states` - useState와 전역 스토어/컨텍스트에서 가져온 상태들
4. `variables` - 상태로부터 파생된 계산 값(메모이제이션 필요 없을 정도의 가벼운 것)
5. `functions` - 특정 이벤트에 묶이지 않는, 재사용 가능한 순수 함수
6. `handlers` — 이벤트 핸들러들
7. `initialize` - 초기 1회 실행용 useEffect
8. `effects` - 의존성에 따라 동작하는 나머지 useEffect
9. `styles` - 스타일 정의
10. `render` - JSX 부분

---

## 성능 관리

불필요한 리렌더링을 줄이되, 가독성을 크게 해치지 않는 선에서만 최적화를 적용합니다.

- 자식에게 넘기는 핸들러·객체·배열은 필요할 때만 `useCallback`·`useMemo`로 고정합니다.
- props가 바뀌지 않으면 다시 그릴 필요가 없는 자식은 `React.memo`로 감쌉니다.
- Context는 값을 쓰는 컴포넌트만 구독하도록 나누거나, 제공하는 값은 `useMemo`로 안정적으로 둡니다.

---

## 상태 관리

상태 변경 시 영향 받는 범위를 줄입니다.

- 상태는 **필요한 최하위(또는 그 근처)**에 둡니다. 상단에 두고 내려주면 하위 전체가 리렌더될 수 있으므로, 쓸 곳에 가깝게 둡니다.
- Provider는 Context 방식이므로, 트리 구조나 Context가 꼭 필요한 경우(테마, 인증 등)가 아니라면 전역 상태는 **Zustand**를 사용합니다.
- Stale closure 가능성이 있는 콜백들만 의존성 처리를 하며, State setter 같은 안정 참조는 하지 않는다.

---

## 네이밍

### 1. 파일·폴더

**패턴:** camelCase
**설명:** 화면·컴포넌트 파일과 폴더 이름은 camelCase로 짓습니다. 라우트 그룹 폴더는 `(tabs)`, `(stack)`처럼 괄호를 사용합니다.
**예시**

- `editProfile.tsx`, `myPage.tsx`
- `app/(tabs)/`, `app/(stack)/`

### 2. 컴포넌트

**패턴:** PascalCase
**설명:** React 컴포넌트는 PascalCase로 짓고, 역할이 드러나도록 접미사를 붙입니다.
**예시**

- 스크린: `EditProfileScreen`, `MapScreen`
- 섹션: `ProfileImageSection`, `SettingListSection`
- 헤더: `HeaderLeft`, `HeaderRight`

### 3. 리소스 (Asset)

**패턴:** kebab-case
**설명:** 아이콘·이미지·폰트 등 정적 리소스는 kebab-case로, **용도-상태-변형** 순서로 짓습니다.
**예시**

- `btn-primary-active.png`
- `map-pin-selected.svg`
- `logo-main-dark.png`

### 4. 핸들러

**패턴:** `handle` + `[대상]` + `[동작]`
**설명:** 핸들러 이름은 **대상(Target) + 동작(Action)** 순서로 짓습니다. 대상을 구분해야 할 때는 이름에 역할을 함께 넣어 명확하게 표현합니다.
**예시**

- `handleToggleChange` — 토글(대상) + 변경(동작)
- `handleFormSubmit` — 폼(대상) + 제출(동작)
- `handleClosePress` — 닫기(대상) + 누름(동작)
- `handleHomeRoute` — 홈(대상) + 라우팅(동작)

---

## 조건식

조건식에서 **`else`는 쓰지 않고** early return(또는 early continue)으로 분기합니다.
**이유**는 `else`를 쓰면 조건이 늘어날수록 중첩이 깊어지고 읽기 어렵습니다. early return은 위에서 guard 조건으로 걸러 내고, 아래에는 “조건을 통과한 경우”만 남기므로 **정상 경로가 한 줄로 이어져** 수정·추가가 쉽고 의도가 분명해집니다.

- **피해야 할 방식 예시**

```ts
function return(props: string) {
  if (props === "A") {
    return "A";
  } else {
    return "default";
  }
}

function process(data: Data | null) {
  if (data) {
    if (!data.error && data.items.length > 0) {
      doSomething(data);
    }
  }
}
```

- **권장 방식 예시**

```ts
function return(props: string) {
  if (props === "A") {
    return "return";
  }
  return "default";
}

function process(data: Data | null) {
  if (!data) return;
  if (data.error) return;
  if (data.items.length === 0) return;
  doSomething(data);
}
```

---

## 함수

### 1. 컴포넌트, 레포지토리, 서비스

항상 파라미터에 타입 이름을 명시해서 선언합니다.
**이유**는 어떤 인자가 들어오는지 이름만 봐도 명확해지며, 옵셔널 파라미터를 명확히 구분할 수 있고, 순서를 맞추기 위해 의미 없는 `undefined`를 넘길 필요가 없으며 리팩터링에 강하기 때문입니다.

- **좋은 예시**

```ts
// 컴포넌트에 props 객체에 타입을 붙여서 선언
const Button = ({
  customStyles,
  variant,
  size,
  text,
  isRound = false,
  isFullWidth = false,
  isDisabled = false,
  leftChildren,
  rightChildren,
  onPress,
}: Props) => {
  // ...
};

// 서비스/레포 함수
async function fetchUserProfile({
  userId,
  includePrivateFields = false,
}: {
  userId: string;
  includePrivateFields?: boolean;
}) {
  // ...
}
```

### 2. 유틸, 훅

함수 시그니처에 타입만 붙이고, 파라미터 분해는 함수 내부에서 처리합니다.
**이유**는 재사용성이 높고, 파라미터 수가 많아지기 쉬워 시그니처가 지나치게 길어지는 것을 막기 위함이며, 코드량을 줄이고, 읽기 쉽게 유지합니다.

- **좋은 예시**

```ts
// 커스텀 훅
type UseSearchHistoryParams = {
  // 필요 시 여기에 정의
};
export const useSearchHistory = (params?: UseSearchHistoryParams) => {
  // 내부에서 params를 구조 분해
};

// 유틸 함수
type FormatAddressParams = {
  roadAddress: string;
  jibunAddress?: string;
};
export function formatAddress(params: FormatAddressParams): string {
  const { roadAddress, jibunAddress } = params;
  // ...
}
```
