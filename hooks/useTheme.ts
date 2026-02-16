import { useEffect, useState } from "react";
import { Appearance } from "react-native";

import { borderSystem } from "@theme/borders";
import { colorSystem } from "@theme/colors";
import { fontSystem } from "@theme/fonts";
import { sizeSystem } from "@theme/sizes";

export const useTheme = () => {
  const [deviceTheme, setDeviceTheme] = useState<"light" | "dark">(
    (Appearance.getColorScheme() as "light" | "dark") || "light",
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setDeviceTheme(colorScheme as "light" | "dark");
      }
    });

    return () => subscription.remove();
  }, []);

  return {
    deviceTheme,
    fonts: fontSystem(),
    colors: colorSystem(deviceTheme),
    spacing: sizeSystem().spacing,
    unit: sizeSystem().unit,
    decimal: sizeSystem().decimal,
    radius: borderSystem().radius,
    borderWidth: borderSystem().borderWidth,
  };
};
