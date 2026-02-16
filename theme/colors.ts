import { ColorSchemeName } from "react-native";

import {
  OpacityTokens,
  ShadeTokens,
  getColorToken,
  getOpacityToken,
} from "@theme/tokens";

// interfaces
export type ExtendedShadeTokens = ShadeTokens & { default: string };

export interface Color {
  primary: {
    light: ExtendedShadeTokens;
    dark: ExtendedShadeTokens;
  };
  secondary: {
    light: ExtendedShadeTokens;
    dark: ExtendedShadeTokens;
  };
  purple: {
    light: ExtendedShadeTokens;
    dark: ExtendedShadeTokens;
  };
  green: {
    light: ExtendedShadeTokens;
    dark: ExtendedShadeTokens;
  };
  orange: {
    light: ExtendedShadeTokens;
    dark: ExtendedShadeTokens;
  };
  red: {
    light: ExtendedShadeTokens;
    dark: ExtendedShadeTokens;
  };
  rose: {
    light: ExtendedShadeTokens;
    dark: ExtendedShadeTokens;
  };
  gray: {
    light: ExtendedShadeTokens;
    dark: ExtendedShadeTokens;
  };
  background: {
    light: string;
    dark: string;
  };
  foreground: {
    light: string;
    dark: string;
  };
  transparent: {
    light: string;
    dark: string;
  };
}

// define color token
export const defineColor: Color = {
  primary: {
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
  secondary: {
    light: {
      default: getColorToken("yellow6"),
      50: getColorToken("yellow1"),
      100: getColorToken("yellow2"),
      200: getColorToken("yellow3"),
      300: getColorToken("yellow4"),
      400: getColorToken("yellow5"),
      500: getColorToken("yellow6"),
      600: getColorToken("yellow7"),
      700: getColorToken("yellow8"),
      800: getColorToken("yellow9"),
      900: getColorToken("yellow10"),
    },
    dark: {
      default: getColorToken("yellow6"),
      50: getColorToken("yellow10"),
      100: getColorToken("yellow9"),
      200: getColorToken("yellow8"),
      300: getColorToken("yellow7"),
      400: getColorToken("yellow6"),
      500: getColorToken("yellow5"),
      600: getColorToken("yellow4"),
      700: getColorToken("yellow3"),
      800: getColorToken("yellow2"),
      900: getColorToken("yellow1"),
    },
  },
  purple: {
    light: {
      default: getColorToken("purple6"),
      50: getColorToken("purple1"),
      100: getColorToken("purple2"),
      200: getColorToken("purple3"),
      300: getColorToken("purple4"),
      400: getColorToken("purple5"),
      500: getColorToken("purple6"),
      600: getColorToken("purple7"),
      700: getColorToken("purple8"),
      800: getColorToken("purple9"),
      900: getColorToken("purple10"),
    },
    dark: {
      default: getColorToken("purple6"),
      50: getColorToken("purple10"),
      100: getColorToken("purple9"),
      200: getColorToken("purple8"),
      300: getColorToken("purple7"),
      400: getColorToken("purple6"),
      500: getColorToken("purple5"),
      600: getColorToken("purple4"),
      700: getColorToken("purple3"),
      800: getColorToken("purple2"),
      900: getColorToken("purple1"),
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
  orange: {
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
  rose: {
    light: {
      default: getColorToken("rose6"),
      50: getColorToken("rose1"),
      100: getColorToken("rose2"),
      200: getColorToken("rose3"),
      300: getColorToken("rose4"),
      400: getColorToken("rose5"),
      500: getColorToken("rose6"),
      600: getColorToken("rose7"),
      700: getColorToken("rose8"),
      800: getColorToken("rose9"),
      900: getColorToken("rose10"),
    },
    dark: {
      default: getColorToken("rose6"),
      50: getColorToken("rose10"),
      100: getColorToken("rose9"),
      200: getColorToken("rose8"),
      300: getColorToken("rose7"),
      400: getColorToken("rose6"),
      500: getColorToken("rose5"),
      600: getColorToken("rose4"),
      700: getColorToken("rose3"),
      800: getColorToken("rose2"),
      900: getColorToken("rose1"),
    },
  },
  gray: {
    light: {
      default: getColorToken("gray6"),
      50: getColorToken("gray1"),
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
  background: {
    light: getColorToken("white"),
    dark: getColorToken("black"),
  },
  foreground: {
    light: getColorToken("black"),
    dark: getColorToken("white"),
  },
  transparent: {
    light: "transparent",
    dark: "transparent",
  },
};

// color system
export const colorSystem = (deviceTheme: ColorSchemeName) => {
  const colors = (
    palette: keyof Color,
    shade?: keyof ExtendedShadeTokens,
    opacity?: keyof OpacityTokens,
  ): string => {
    if (
      palette === "background" ||
      palette === "foreground" ||
      palette === "transparent"
    ) {
      // light로 강제로 설정
      return defineColor[palette]["light"];
    }
    return (
      // light로 강제로 설정
      defineColor[palette]["light"][shade || "default"] +
      getOpacityToken(opacity || 1)
    );
  };

  return colors;
};
