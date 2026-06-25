import { create } from "zustand";

export type ThemeMode = "light" | "dark" | "system";

type ThemeModeState = {
  themeMode: ThemeMode | null;
};

const initialThemeModeState: ThemeModeState = {
  themeMode: null,
};

type ThemeModeStore = ThemeModeState & {
  setModeState: (state: Partial<ThemeModeState>) => void;
  resetModeState: () => void;
};

export const useThemeModeStore = create<ThemeModeStore>(set => ({
  ...initialThemeModeState,
  setModeState: state => set(state),
  resetModeState: () => set(initialThemeModeState),
}));
