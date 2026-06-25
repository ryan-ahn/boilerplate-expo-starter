const REPO_ERROR_DISPLAY_MESSAGES: Record<string, string> = {
  "REPO/APP/GET_APP_CONFIGS": "앱 설정을 불러오는 중 문제가 발생했어요.",
  "REPO/APP/GET_APP_CONFIG_BY_KEY": "앱 설정을 불러오는 중 문제가 발생했어요.",
};

const SERVICE_ERROR_DISPLAY_MESSAGES: Record<string, string> = {
  "SERVICE/APP/GET_APP_CONFIGS": "앱 설정을 불러오는 중 문제가 발생했어요.",
  "SERVICE/APP/GET_APP_CONFIG_BY_KEY":
    "앱 설정을 불러오는 중 문제가 발생했어요.",
};

export const ERROR_DISPLAY_MESSAGES: Record<string, string> = {
  "APP/ERROR_DEFAULT":
    "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  ...REPO_ERROR_DISPLAY_MESSAGES,
  ...SERVICE_ERROR_DISPLAY_MESSAGES,
};
