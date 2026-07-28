# vibin-app

Expo(React Native) 기반 모바일 앱 프로젝트입니다.

---

## 시작하기

1. 의존성 설치

```bash
npm install
```

2. 환경 변수 설정

루트에 **.env** 파일을 생성하고, 필요한 키 값은 관리자(**@ryan-ahn**)에게 요청합니다.

3. 개발 서버 및 앱 실행

개발 서버를 실행한 뒤, 시뮬레이터/기기에서 앱을 구동합니다.

```bash
npm start
```

- **iOS 시뮬레이터:** `npm start` 이후 터미널에서 `i`
- **Android 에뮬레이터:** `npm start` 이후 터미널에서 `a`
- **휴대폰:** `npm start`로 JS 서버를 띄운 뒤, Dev Client/EAS 빌드된 앱에서 프로젝트를 실행

---

## 빌드

앱을 개발하거나 플랫폼(앱스토어)에 보내기 위한 Dev Client·프로덕션 앱 패키지를 만드는 단계입니다.
Dev Client의 경우, 빌드 후 **`설치 문구`**가 떠서 **`Y`**를 누르면 앱이 해당 기기에 설치됩니다.

- **시뮬레이터에서 개발용 빌드:** `npm run build:ios:simulator`
- **휴대폰에서 개발용 빌드:** `npm run build:ios:device`
- **프로덕션 제출용 빌드:** `npm run build:ios:production`

---

## 서밋

빌드된 앱 패키지를 플랫폼(앱스토어)에 보낼 때 사용합니다. 빌드를 완료한 뒤 실행합니다.

- **프로덕션 제출:** `npm run submit:ios:production`

---

## Q&A

1. **Q. Dev Client는 언제 다시 빌드해야 하나요?**
   A. 네이티브 패키지(iOS/Android 모듈)를 **추가·변경했을 때만** Dev Client를 다시 빌드합니다. JS/TS 코드만 수정하는 경우에는 기존 Dev Client를 그대로 사용해도 되고, 코드 변경 사항은 `npm start`로 띄운 Metro 번들이 자동으로 반영됩니다.
