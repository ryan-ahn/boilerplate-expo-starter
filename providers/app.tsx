import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, AppState, type AppStateStatus, Linking } from "react-native";

import * as Application from "expo-application";

import { useToast } from "@hooks/useToast";
import { getAppRequiredVersion } from "@services/app";
import { isVersionLower } from "@utils/validation";

type Props = {
  children: ReactNode;
};

export type AppContextValue = {
  requiredVersion: string | null;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: Props) => {
  // hooks
  const { showToast } = useToast();
  // states
  const [requiredVersion, setRequiredVersion] = useState<string | null>(null);
  // handlers
  const handleOpenForceUpdateModal = useCallback(() => {
    Alert.alert("업데이트가 필요해요", "최신 버전으로 업데이트해주세요.", [
      {
        text: "스토어에서 업데이트",
        onPress: () => {
          Linking.openURL(process.env.EXPO_PUBLIC_APP_STORE_URL);
        },
      },
    ]);
  }, []);

  const checkForceUpdate = useCallback(
    (version: string | null) => {
      if (version == null) return;
      const current = Application.nativeApplicationVersion;
      if (!current) return;
      if (isVersionLower(current, version)) {
        handleOpenForceUpdateModal();
      }
    },
    [handleOpenForceUpdateModal],
  );
  // effects
  useEffect(() => {
    const fetchRequiredVersion = async () => {
      try {
        const version = await getAppRequiredVersion();
        if (version != null) setRequiredVersion(version);
      } catch {
        showToast({
          text: "필수 버전 정보를 가져오는데 실패했습니다.",
          variant: "error",
        });
      }
    };
    fetchRequiredVersion();
  }, []);

  useEffect(() => {
    checkForceUpdate(requiredVersion);
  }, [requiredVersion]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (nextState === "active") {
          const runCheck = async () => {
            try {
              const version = await getAppRequiredVersion();
              if (version != null) checkForceUpdate(version);
            } catch {
              showToast({
                text: "필수 버전 정보를 가져오는데 실패했습니다.",
                variant: "error",
              });
            }
          };
          runCheck();
        }
      },
    );
    return () => subscription.remove();
  }, []);
  // value
  const value = useMemo(() => ({ requiredVersion }), [requiredVersion]);
  // render
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
