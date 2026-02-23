import { getUnitToken } from "@theme/tokens";

export type BorderRadius = typeof defineBorderRadius;

export type BorderWidth = typeof defineBorderWidth;

export const defineBorderRadius = {
  0: getUnitToken(0),
  4: getUnitToken(4),
  6: getUnitToken(6),
  8: getUnitToken(8),
  16: getUnitToken(16),
  24: getUnitToken(24),
  9999: getUnitToken(9999),
} as const;

export const defineBorderWidth = {
  0.5: getUnitToken(0.5),
  1: getUnitToken(1),
  1.5: getUnitToken(1.5),
  2: getUnitToken(2),
  3: getUnitToken(3),
  4: getUnitToken(4),
  6: getUnitToken(6),
  8: getUnitToken(8),
} as const;

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
