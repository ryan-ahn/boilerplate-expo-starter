import { useCallback, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useToastActions } from "@hooks/useToast";
import { type ThemeMode, useModeStore } from "@stores/mode";
import { parseStoredTheme } from "@utils/parser";

export const THEME_STORAGE_KEY = "settings.theme";

export const useThemeModeState = () => {
  const { themeMode } = useModeStore();
  return {
    themeMode: themeMode ?? "system",
  };
};

export const useThemeModeActions = () => {
  const { setModeState: setThemeModeState } = useModeStore();
  const { showToast } = useToastActions();
  // effects
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (!cancelled) setThemeModeState({ themeMode: parseStoredTheme(raw) });
      } catch {
        if (!cancelled) setThemeModeState({ themeMode: "system" as ThemeMode });
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);
  // handlers
  const setThemeMode = useCallback(async (value: ThemeMode) => {
    setThemeModeState({ themeMode: value });
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
      const raw = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      setThemeModeState({ themeMode: parseStoredTheme(raw) });
    }
  }, []);

  const resetThemeMode = useCallback(async () => {
    setThemeModeState({ themeMode: "system" as ThemeMode });
    try {
      await AsyncStorage.removeItem(THEME_STORAGE_KEY);
    } catch {
      showToast({
        text: "테마 모드 초기화에 실패했습니다.",
        variant: "error",
      });
    }
  }, []);
  // return
  return {
    setThemeMode,
    resetThemeMode,
  };
};

export const useThemeMode = () => {
  const state = useThemeModeState();
  const actions = useThemeModeActions();
  return {
    ...state,
    ...actions,
  };
};
