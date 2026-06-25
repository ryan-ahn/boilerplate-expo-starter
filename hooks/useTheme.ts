import { useEffect, useMemo, useState } from "react";
import { Appearance } from "react-native";

import { useThemeMode } from "@hooks/useThemeMode";
import { borderSystem } from "@theme/borders";
import { colorSystem } from "@theme/colors";
import { fontSystem } from "@theme/fonts";
import { sizeSystem } from "@theme/sizes";

export const useTheme = () => {
  // hooks
  const { themeMode } = useThemeMode();
  // state
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    (Appearance.getColorScheme() as "light" | "dark") || "light",
  );
  // variables
  const deviceTheme = useMemo((): "light" | "dark" => {
    if (themeMode === "system") return systemTheme;
    return themeMode as "light" | "dark";
  }, [themeMode, systemTheme]);
  // effects
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setSystemTheme(colorScheme as "light" | "dark");
      }
    });
    return () => subscription.remove();
  }, []);
  // return
  return {
    deviceTheme,
    themeMode,
    fonts: fontSystem(),
    colors: colorSystem(deviceTheme).colors,
    spacing: sizeSystem().spacing,
    unit: sizeSystem().unit,
    decimal: sizeSystem().decimal,
    radius: borderSystem().radius,
    borderWidth: borderSystem().borderWidth,
  };
};
