import {
  DecimalTokens,
  UnitTokens,
  decimalTokens,
  getUnitToken,
  unitTokens,
} from "@theme/tokens";

// interfaces
export interface Space {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  12: number;
  16: number;
  20: number;
  24: number;
  28: number;
  32: number;
  36: number;
  40: number;
  44: number;
  48: number;
  52: number;
  56: number;
  60: number;
  64: number;
  68: number;
  72: number;
  76: number;
  80: number;
  84: number;
  88: number;
  92: number;
  96: number;
  100: number;
  102: number;
  120: number;
  128: number;
  150: number;
  9999: number;
}

// define unit tokens
export const defineUnit: UnitTokens = unitTokens;

// define decimal tokens
export const defineDecimal: DecimalTokens = {
  ...decimalTokens,
};

// define space tokens
export const defineSpace: Space = {
  1: getUnitToken(1),
  2: getUnitToken(2),
  3: getUnitToken(3),
  4: getUnitToken(4),
  5: getUnitToken(5),
  6: getUnitToken(6),
  7: getUnitToken(7),
  8: getUnitToken(8),
  12: getUnitToken(12),
  16: getUnitToken(16),
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
  9999: getUnitToken(9999),
};

// space system
export const sizeSystem = () => {
  const spacing = (key: keyof Space): number => {
    return defineSpace[key];
  };

  const unit = (key: keyof UnitTokens): number => {
    return defineUnit[key];
  };

  const decimal = (key: keyof DecimalTokens): number => {
    return defineDecimal[key];
  };

  return { spacing, unit, decimal };
};
