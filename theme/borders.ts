import { getUnitToken } from "@theme/tokens";

// interfaces
export interface BorderRadius {
  0: number;
  4: number;
  6: number;
  8: number;
  16: number;
  24: number;
  9999: number;
}

export interface BorderWidth {
  0.5: number;
  1: number;
  1.5: number;
  2: number;
  3: number;
  4: number;
  6: number;
  8: number;
}

// define border token
export const defineBorderRadius: BorderRadius = {
  0: getUnitToken(0),
  4: getUnitToken(4),
  6: getUnitToken(6),
  8: getUnitToken(8),
  16: getUnitToken(16),
  24: getUnitToken(24),
  9999: getUnitToken(9999),
};

export const defineBorderWidth: BorderWidth = {
  0.5: getUnitToken(0.5),
  1: getUnitToken(1),
  1.5: getUnitToken(1.5),
  2: getUnitToken(2),
  3: getUnitToken(3),
  4: getUnitToken(4),
  6: getUnitToken(6),
  8: getUnitToken(8),
};

// border system
export const borderSystem = () => {
  const radius = (key: keyof BorderRadius): number => {
    return defineBorderRadius[key];
  };

  const borderWidth = (key: keyof BorderWidth): number => {
    return defineBorderWidth[key];
  };

  return { radius, borderWidth };
};
