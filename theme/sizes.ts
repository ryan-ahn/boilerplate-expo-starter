import { decimalTokens, getUnitToken, unitTokens } from "@theme/tokens";

// define unit tokens
export const defineUnit = unitTokens;

// define decimal tokens
export const defineDecimal = {
  ...decimalTokens,
};

// define space tokens
export const defineSpace = {
  1: getUnitToken(1),
  2: getUnitToken(2),
  3: getUnitToken(3),
  4: getUnitToken(4),
  5: getUnitToken(5),
  6: getUnitToken(6),
  7: getUnitToken(7),
  8: getUnitToken(8),
  10: getUnitToken(10),
  12: getUnitToken(12),
  14: getUnitToken(14),
  16: getUnitToken(16),
  18: getUnitToken(18),
  20: getUnitToken(20),
  24: getUnitToken(24),
  28: getUnitToken(28),
  32: getUnitToken(32),
  36: getUnitToken(36),
  40: getUnitToken(40),
  44: getUnitToken(44),
  48: getUnitToken(48),
  52: getUnitToken(52),
  56: getUnitToken(56),
  60: getUnitToken(60),
  64: getUnitToken(64),
  68: getUnitToken(68),
  72: getUnitToken(72),
  76: getUnitToken(76),
  80: getUnitToken(80),
  84: getUnitToken(84),
  88: getUnitToken(88),
  92: getUnitToken(92),
  96: getUnitToken(96),
  100: getUnitToken(100),
  102: getUnitToken(102),
  120: getUnitToken(120),
  128: getUnitToken(128),
  150: getUnitToken(150),
  180: getUnitToken(180),
  200: getUnitToken(200),
  240: getUnitToken(240),
  9999: getUnitToken(9999),
} as const;

// space system
export const sizeSystem = () => {
  const spacing = (key: keyof typeof defineSpace): number => {
    return defineSpace[key];
  };

  const unit = (key: keyof typeof defineUnit): number => {
    return defineUnit[key];
  };

  const decimal = (key: keyof typeof defineDecimal): number => {
    return defineDecimal[key];
  };

  return { spacing, unit, decimal };
};
