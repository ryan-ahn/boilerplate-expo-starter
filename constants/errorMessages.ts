const REPO_ERROR_DISPLAY_MESSAGES: Record<string, string> = {
  "REPO/APP/GET_APP_CONFIGS": "앱 설정 데이터 조회 중 문제가 발생했어요.",
  "REPO/APP/GET_APP_CONFIG_BY_KEY": "앱 설정 데이터 조회 중 문제가 발생했어요.",
  "REPO/AUTH/GET_SESSION": "세션 데이터 조회 중 문제가 발생했어요.",
  "REPO/AUTH/SET_SESSION": "세션 데이터 저장 중 문제가 발생했어요.",
  "REPO/AUTH/SIGN_IN_WITH_ID_TOKEN": "인증 토큰 연동 중 문제가 발생했어요.",
  "REPO/AUTH/SIGN_IN_WITH_KAKAO": "카카오 인증 연동 중 문제가 발생했어요.",
  "REPO/AUTH/SIGN_IN_WITH_GOOGLE": "Google 인증 연동 중 문제가 발생했어요.",
  "REPO/AUTH/SIGN_IN_WITH_GOOGLE/FAILED":
    "Google 인증 연동 중 문제가 발생했어요.",
  "REPO/AUTH/SIGN_IN_WITH_APPLE": "Apple 인증 연동 중 문제가 발생했어요.",
  "REPO/AUTH/SIGN_IN_WITH_APPLE/CANCELED": "Apple 인증 연동이 취소되었어요.",
  "REPO/AUTH/UPDATE_USER": "사용자 데이터 저장 중 문제가 발생했어요.",
  "REPO/AUTH/SIGN_OUT": "인증 세션 종료 중 문제가 발생했어요.",
  "REPO/STORAGE/CREATE_SIGNED_URL": "업로드 URL 생성 중 문제가 발생했어요.",
};

const SERVICE_ERROR_DISPLAY_MESSAGES: Record<string, string> = {
  "SERVICE/APP/GET_APP_CONFIGS": "앱 설정을 불러오는 중 문제가 발생했어요.",
  "SERVICE/APP/GET_APP_CONFIG_BY_KEY":
    "앱 설정을 불러오는 중 문제가 발생했어요.",
  "SERVICE/APP/GET_APP_REQUIRED_VERSION": "앱 버전 확인 중 문제가 발생했어요.",
  "SERVICE/AUTH/GET_SESSION": "로그인 상태 확인 중 문제가 발생했어요.",
  "SERVICE/AUTH/SET_SESSION": "로그인 처리 중 문제가 발생했어요.",
  "SERVICE/AUTH/SIGN_IN_WITH_KAKAO": "카카오 로그인 처리 중 문제가 발생했어요.",
  "SERVICE/AUTH/SIGN_IN_WITH_GOOGLE":
    "Google 로그인 처리 중 문제가 발생했어요.",
  "SERVICE/AUTH/SIGN_IN_WITH_APPLE": "Apple 로그인 처리 중 문제가 발생했어요.",
  "SERVICE/AUTH/UPDATE_USER": "프로필 업데이트 중 문제가 발생했어요.",
  "SERVICE/AUTH/UPDATE_USER_DISPLAY_NAME": "닉네임 변경 중 문제가 발생했어요.",
  "SERVICE/AUTH/UPDATE_USER_FULL_NAME": "이름 변경 중 문제가 발생했어요.",
  "SERVICE/AUTH/UPDATE_USER_EMAIL": "이메일 변경 중 문제가 발생했어요.",
  "SERVICE/AUTH/UPDATE_USER_PHONE_NUMBER":
    "전화번호 변경 중 문제가 발생했어요.",
  "SERVICE/AUTH/UPDATE_USER_BIRTH_DATE": "생년월일 변경 중 문제가 발생했어요.",
  "SERVICE/AUTH/UPDATE_USER_PROFILE_PUBLIC":
    "프로필 공개 설정 변경 중 문제가 발생했어요.",
  "SERVICE/AUTH/UPDATE_USER_PINNED_STORE_PUBLIC":
    "핀 공개 설정 변경 중 문제가 발생했어요.",
  "SERVICE/AUTH/UPLOAD_USER_AVATAR": "프로필 사진 업로드 중 문제가 발생했어요.",
  "SERVICE/AUTH/SIGN_OUT": "로그아웃 처리 중 문제가 발생했어요.",
  "SERVICE/AVATAR/UPLOAD_NEW_AVATAR":
    "프로필 사진 업로드 중 문제가 발생했어요.",
};

export const ERROR_DISPLAY_MESSAGES: Record<string, string> = {
  "APP/ERROR_DEFAULT":
    "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  ...REPO_ERROR_DISPLAY_MESSAGES,
  ...SERVICE_ERROR_DISPLAY_MESSAGES,
};
