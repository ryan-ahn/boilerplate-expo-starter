import {
  getAppConfigByKey as getAppConfigByKeyRepository,
  getAppConfigs as getAppConfigsRepository,
} from "@repositories/app";
import { handleServiceError } from "@utils/errorHandler";

// 앱 설정 전체 조회
export const getAppConfigs = async () => {
  try {
    const rows = await getAppConfigsRepository();
    return rows;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/APP/GET_APP_CONFIGS",
    });
  }
};

// 강제 업데이트용 최소 필수 버전 조회
export const getAppRequiredVersion = async () => {
  try {
    const row = await getAppConfigByKeyRepository({ key: "required_version" });
    if (!row?.value) {
      throw handleServiceError(new Error("required_version not found."), {
        code: "SERVICE/APP/GET_APP_REQUIRED_VERSION",
      });
    }
    if (row?.value_type === "string") {
      const stringTypedValue = String(row.value);
      return stringTypedValue;
    }
    throw handleServiceError(new Error("required_version is not a string."), {
      code: "SERVICE/APP/GET_APP_REQUIRED_VERSION",
    });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/APP/GET_APP_REQUIRED_VERSION",
    });
  }
};
