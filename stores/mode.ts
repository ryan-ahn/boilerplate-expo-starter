import { create } from "zustand";

export type ThemeMode = "light" | "dark" | "system";

type ModeState = {
  themeMode: ThemeMode | null;
  mapThemeMode: ThemeMode | null;
};

const initialModeState: ModeState = {
  themeMode: null,
  mapThemeMode: null,
};

type ModeStore = ModeState & {
  setModeState: (state: Partial<ModeState>) => void;
  resetModeState: () => void;
};

export const useModeStore = create<ModeStore>(set => ({
  ...initialModeState,
  setModeState: state => set(state),
  resetModeState: () => set(initialModeState),
}));
