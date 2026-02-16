import { getUnitToken, getWeightToken } from "@theme/tokens";

// interfaces
export interface FontStyleSet {
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
}

export interface Font {
  display: Record<1 | 2, FontStyleSet>;
  heading: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, FontStyleSet>;
  body: Record<1 | 2 | 3, FontStyleSet>;
  description: Record<1 | 2 | 3, FontStyleSet>;
  ui: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, FontStyleSet>;
}

// define font token
export const defineFontToken: Font = {
  display: {
    1: {
      fontSize: getUnitToken(40),
      lineHeight: getUnitToken(44),
      fontWeight: getWeightToken(900),
    },
    2: {
      fontSize: getUnitToken(36),
      lineHeight: getUnitToken(40),
      fontWeight: getWeightToken(900),
    },
  },
  heading: {
    1: {
      fontSize: getUnitToken(32),
      lineHeight: getUnitToken(36),
      fontWeight: getWeightToken(700),
    },
    2: {
      fontSize: getUnitToken(28),
      lineHeight: getUnitToken(32),
      fontWeight: getWeightToken(700),
    },
    3: {
      fontSize: getUnitToken(24),
      lineHeight: getUnitToken(28),
      fontWeight: getWeightToken(700),
    },
    4: {
      fontSize: getUnitToken(20),
      lineHeight: getUnitToken(24),
      fontWeight: getWeightToken(700),
    },
    5: {
      fontSize: getUnitToken(18),
      lineHeight: getUnitToken(20),
      fontWeight: getWeightToken(600),
    },
    6: {
      fontSize: getUnitToken(16),
      lineHeight: getUnitToken(20),
      fontWeight: getWeightToken(600),
    },
    7: {
      fontSize: getUnitToken(15),
      lineHeight: getUnitToken(18),
      fontWeight: getWeightToken(600),
    },
  },
  body: {
    1: {
      fontSize: getUnitToken(16),
      lineHeight: getUnitToken(24),
      fontWeight: getWeightToken(400),
    },
    2: {
      fontSize: getUnitToken(15),
      lineHeight: getUnitToken(22),
      fontWeight: getWeightToken(400),
    },
    3: {
      fontSize: getUnitToken(14),
      lineHeight: getUnitToken(20),
      fontWeight: getWeightToken(400),
    },
  },
  description: {
    1: {
      fontSize: getUnitToken(13),
      lineHeight: getUnitToken(20),
      fontWeight: getWeightToken(400),
    },
    2: {
      fontSize: getUnitToken(12),
      lineHeight: getUnitToken(18),
      fontWeight: getWeightToken(400),
    },
    3: {
      fontSize: getUnitToken(11),
      lineHeight: getUnitToken(16),
      fontWeight: getWeightToken(400),
    },
  },
  ui: {
    1: {
      fontSize: getUnitToken(16),
      lineHeight: getUnitToken(20),
      fontWeight: getWeightToken(500),
    },
    2: {
      fontSize: getUnitToken(15),
      lineHeight: getUnitToken(20),
      fontWeight: getWeightToken(500),
    },
    3: {
      fontSize: getUnitToken(14),
      lineHeight: getUnitToken(16),
      fontWeight: getWeightToken(500),
    },
    4: {
      fontSize: getUnitToken(13),
      lineHeight: getUnitToken(16),
      fontWeight: getWeightToken(500),
    },
    5: {
      fontSize: getUnitToken(12),
      lineHeight: getUnitToken(14),
      fontWeight: getWeightToken(500),
    },
    6: {
      fontSize: getUnitToken(10),
      lineHeight: getUnitToken(12),
      fontWeight: getWeightToken(500),
    },
    7: {
      fontSize: getUnitToken(8),
      lineHeight: getUnitToken(10),
      fontWeight: getWeightToken(500),
    },
  },
};

export const fontSystem = () => {
  const fonts = (key: string) => {
    return defineFontToken[key];
  };

  return fonts;
};
