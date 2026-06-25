import type { ThemeMode } from "@stores/themeMode";

const MODE_VALUES: string[] = ["light", "dark", "system"];

export const parseStoredTheme = (raw: string | null): ThemeMode => {
  if (!raw || !MODE_VALUES.includes(raw)) return "system";
  return raw as ThemeMode;
};

export const parseStoredMapThemeMode = (raw: string | null): ThemeMode => {
  if (!raw || !MODE_VALUES.includes(raw)) return "system";
  return raw as ThemeMode;
};
