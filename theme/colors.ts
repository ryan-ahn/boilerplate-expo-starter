import { ColorSchemeName } from "react-native";

import {
  OpacityTokens,
  ShadeTokens,
  getColorToken,
  getOpacityToken,
} from "@theme/tokens";

export type Color = typeof defineColor;

export type ColorMode = "theme" | "static";

export type ExtendedShadeTokens = ShadeTokens & { default: string };

export const defineColor = {
  primary: {
    light: {
      default: getColorToken("orange6"),
      50: getColorToken("orange1"),
      100: getColorToken("orange2"),
      200: getColorToken("orange3"),
      300: getColorToken("orange4"),
      400: getColorToken("orange5"),
      500: getColorToken("orange6"),
      600: getColorToken("orange7"),
      700: getColorToken("orange8"),
      800: getColorToken("orange9"),
      900: getColorToken("orange10"),
    },
    dark: {
      default: getColorToken("orange6"),
      50: getColorToken("orange10"),
      100: getColorToken("orange9"),
      200: getColorToken("orange8"),
      300: getColorToken("orange7"),
      400: getColorToken("orange6"),
      500: getColorToken("orange5"),
      600: getColorToken("orange4"),
      700: getColorToken("orange3"),
      800: getColorToken("orange2"),
      900: getColorToken("orange1"),
    },
  },
  secondary: {
    light: {
      default: getColorToken("blue6"),
      50: getColorToken("blue1"),
      100: getColorToken("blue2"),
      200: getColorToken("blue3"),
      300: getColorToken("blue4"),
      400: getColorToken("blue5"),
      500: getColorToken("blue6"),
      600: getColorToken("blue7"),
      700: getColorToken("blue8"),
      800: getColorToken("blue9"),
      900: getColorToken("blue10"),
    },
    dark: {
      default: getColorToken("blue6"),
      50: getColorToken("blue10"),
      100: getColorToken("blue9"),
      200: getColorToken("blue8"),
      300: getColorToken("blue7"),
      400: getColorToken("blue6"),
      500: getColorToken("blue5"),
      600: getColorToken("blue4"),
      700: getColorToken("blue3"),
      800: getColorToken("blue2"),
      900: getColorToken("blue1"),
    },
  },
  gray: {
    light: {
      default: getColorToken("gray6"),
      50: getColorToken("white"),
      100: getColorToken("gray2"),
      200: getColorToken("gray3"),
      300: getColorToken("gray4"),
      400: getColorToken("gray5"),
      500: getColorToken("gray6"),
      600: getColorToken("gray7"),
      700: getColorToken("gray8"),
      800: getColorToken("gray9"),
      900: getColorToken("gray10"),
    },
    dark: {
      default: getColorToken("gray6"),
      50: getColorToken("gray10"),
      100: getColorToken("gray9"),
      200: getColorToken("gray8"),
      300: getColorToken("gray7"),
      400: getColorToken("gray6"),
      500: getColorToken("gray5"),
      600: getColorToken("gray4"),
      700: getColorToken("gray2"),
      800: getColorToken("gray1"),
      900: getColorToken("gray5"),
    },
  },
  green: {
    light: {
      default: getColorToken("green6"),
      50: getColorToken("green1"),
      100: getColorToken("green2"),
      200: getColorToken("green3"),
      300: getColorToken("green4"),
      400: getColorToken("green5"),
      500: getColorToken("green6"),
      600: getColorToken("green7"),
      700: getColorToken("green8"),
      800: getColorToken("green9"),
      900: getColorToken("green10"),
    },
    dark: {
      default: getColorToken("green6"),
      50: getColorToken("green10"),
      100: getColorToken("green9"),
      200: getColorToken("green8"),
      300: getColorToken("green7"),
      400: getColorToken("green6"),
      500: getColorToken("green5"),
      600: getColorToken("green4"),
      700: getColorToken("green3"),
      800: getColorToken("green2"),
      900: getColorToken("green1"),
    },
  },
  red: {
    light: {
      default: getColorToken("red6"),
      50: getColorToken("red1"),
      100: getColorToken("red2"),
      200: getColorToken("red3"),
      300: getColorToken("red4"),
      400: getColorToken("red5"),
      500: getColorToken("red6"),
      600: getColorToken("red7"),
      700: getColorToken("red8"),
      800: getColorToken("red9"),
      900: getColorToken("red10"),
    },
    dark: {
      default: getColorToken("red6"),
      50: getColorToken("red10"),
      100: getColorToken("red9"),
      200: getColorToken("red8"),
      300: getColorToken("red7"),
      400: getColorToken("red6"),
      500: getColorToken("red5"),
      600: getColorToken("red4"),
      700: getColorToken("red2"),
      800: getColorToken("red1"),
      900: getColorToken("red5"),
    },
  },
  transparent: {
    light: getColorToken("transparent"),
    dark: getColorToken("transparent"),
  },
  background: {
    light: getColorToken("gray1"),
    dark: getColorToken("black"),
  },
  foreground: {
    light: getColorToken("black"),
    dark: getColorToken("white"),
  },
  kakao: {
    light: getColorToken("kakao"),
    dark: getColorToken("kakao"),
  },
} as const;

// color system
export const colorSystem = (deviceTheme: ColorSchemeName) => {
  const colors = (
    palette: keyof Color,
    shade?: keyof ExtendedShadeTokens,
    colorMode: ColorMode = "theme",
    opacity?: keyof OpacityTokens,
  ): string => {
    const theme = colorMode === "static" ? "light" : deviceTheme;
    if (
      palette === "transparent" ||
      palette === "background" ||
      palette === "foreground" ||
      palette === "kakao"
    ) {
      return (
        (defineColor[palette][theme] as string) + getOpacityToken(opacity || 1)
      );
    }
    return (
      (defineColor[palette][theme][
        (shade || "default") as keyof ExtendedShadeTokens
      ] as string) + getOpacityToken(opacity || 1)
    );
  };

  return { colors };
};
