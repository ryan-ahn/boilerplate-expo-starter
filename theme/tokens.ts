export interface UnitTokens {
  [key: number]: number;
}

export interface WeightTokens {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ShadeTokens {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface DecimalTokens {
  0: number;
  0.04: number;
  0.08: number;
  0.12: number;
  0.16: number;
  0.2: number;
  0.24: number;
  0.28: number;
  0.32: number;
  0.36: number;
  0.4: number;
  0.44: number;
  0.48: number;
  0.52: number;
  0.56: number;
  0.6: number;
  0.64: number;
  0.68: number;
  0.72: number;
  0.76: number;
  0.8: number;
  0.84: number;
  0.88: number;
  0.92: number;
  0.96: number;
  1: number;
}

export interface OpacityTokens {
  0: string;
  0.04: string;
  0.08: string;
  0.12: string;
  0.16: string;
  0.2: string;
  0.24: string;
  0.28: string;
  0.32: string;
  0.36: string;
  0.4: string;
  0.44: string;
  0.48: string;
  0.52: string;
  0.56: string;
  0.6: string;
  0.64: string;
  0.68: string;
  0.72: string;
  0.76: string;
  0.8: string;
  0.84: string;
  0.88: string;
  0.92: string;
  0.96: string;
  1: string;
}

export interface ColorTokens {
  gray1: string;
  gray2: string;
  gray3: string;
  gray4: string;
  gray5: string;
  gray6: string;
  gray7: string;
  gray8: string;
  gray9: string;
  gray10: string;
  blue1: string;
  blue2: string;
  blue3: string;
  blue4: string;
  blue5: string;
  blue6: string;
  blue7: string;
  blue8: string;
  blue9: string;
  blue10: string;
  red1: string;
  red2: string;
  red3: string;
  red4: string;
  red5: string;
  red6: string;
  red7: string;
  red8: string;
  red9: string;
  red10: string;
  orange1: string;
  orange2: string;
  orange3: string;
  orange4: string;
  orange5: string;
  orange6: string;
  orange7: string;
  orange8: string;
  orange9: string;
  orange10: string;
  green1: string;
  green2: string;
  green3: string;
  green4: string;
  green5: string;
  green6: string;
  green7: string;
  green8: string;
  green9: string;
  green10: string;
  transparent: string;
  black: string;
  white: string;
  kakao: string;
}

export const unitTokens: UnitTokens = new Proxy({} as Record<number, number>, {
  get(_target, prop) {
    if (typeof prop === "string" || typeof prop === "number") {
      const key = Number(prop);
      if (!isNaN(key) && isFinite(key)) {
        return key;
      }
    }
    return undefined;
  },
  has(_target, prop) {
    if (typeof prop === "string" || typeof prop === "number") {
      const key = Number(prop);
      return !isNaN(key) && isFinite(key);
    }
    return false;
  },
}) as UnitTokens;

export const weightTokens: WeightTokens = {
  100: "100",
  200: "200",
  300: "300",
  400: "400",
  500: "500",
  600: "600",
  700: "700",
  800: "800",
  900: "900",
};

export const decimalTokens: DecimalTokens = {
  0: 0,
  0.04: 0.04,
  0.08: 0.08,
  0.12: 0.12,
  0.16: 0.16,
  0.2: 0.2,
  0.24: 0.24,
  0.28: 0.28,
  0.32: 0.32,
  0.36: 0.36,
  0.4: 0.4,
  0.44: 0.44,
  0.48: 0.48,
  0.52: 0.52,
  0.56: 0.56,
  0.6: 0.6,
  0.64: 0.64,
  0.68: 0.68,
  0.72: 0.72,
  0.76: 0.76,
  0.8: 0.8,
  0.84: 0.84,
  0.88: 0.88,
  0.92: 0.92,
  0.96: 0.96,
  1: 1,
};

export const opacityTokens: OpacityTokens = {
  0: "00",
  0.04: "0A",
  0.08: "14",
  0.12: "1E",
  0.16: "29",
  0.2: "33",
  0.24: "3D",
  0.28: "47",
  0.32: "52",
  0.36: "5C",
  0.4: "66",
  0.44: "70",
  0.48: "7A",
  0.52: "85",
  0.56: "8F",
  0.6: "99",
  0.64: "A3",
  0.68: "AE",
  0.72: "B8",
  0.76: "C2",
  0.8: "CC",
  0.84: "D6",
  0.88: "E0",
  0.92: "EB",
  0.96: "F5",
  1: "FF",
};

export const colorTokens: ColorTokens = {
  gray1: "#f6f6f6",
  gray2: "#e3e3e3",
  gray3: "#cccccc",
  gray4: "#aaaaaa",
  gray5: "#999999",
  gray6: "#6b6b6b",
  gray7: "#4d4d4d",
  gray8: "#3a3a3a",
  gray9: "#242424",
  gray10: "#161616",
  red1: "#FFEBEB",
  red2: "#FFB8B8",
  red3: "#FF8F8F",
  red4: "#FF6A6A",
  red5: "#FF4646",
  red6: "#FF4747",
  red7: "#FF2B00",
  red8: "#CC0000",
  red9: "#9A0000",
  red10: "#7A0000",
  orange1: "#f6dfdb",
  orange2: "#f6c4ba",
  orange3: "#f9ae9f",
  orange4: "#fa8f79",
  orange5: "#ff7b61",
  orange6: "#ff5634",
  orange7: "#ff4d2a",
  orange8: "#ff411c",
  orange9: "#e82802",
  orange10: "#da2602",
  green1: "#cfeddd",
  green2: "#baddc9",
  green3: "#9ad7b4",
  green4: "#6aca94",
  green5: "#41bc76",
  green6: "#2a9c5c",
  green7: "#158b48",
  green8: "#097738",
  green9: "#095028",
  green10: "#095028",
  blue1: "#E6F1FE",
  blue2: "#CCE3FD",
  blue3: "#99C7FB",
  blue4: "#66AAF9",
  blue5: "#338EF7",
  blue6: "#006FEE",
  blue7: "#005BC4",
  blue8: "#004493",
  blue9: "#002E62",
  blue10: "#001731",
  black: "#000000",
  white: "#FFFFFF",
  kakao: "#FEE500",
  transparent: "transparent",
};

export const getUnitToken = <K extends keyof UnitTokens>(
  key: K,
): UnitTokens[K] => {
  return unitTokens[key];
};

export const getWeightToken = <K extends keyof WeightTokens>(
  key: K,
): WeightTokens[K] => {
  return weightTokens[key];
};

export const getDecimalToken = <K extends keyof DecimalTokens>(
  key: K,
): DecimalTokens[K] => {
  return decimalTokens[key];
};

export const getOpacityToken = <K extends keyof OpacityTokens>(
  key: K,
): OpacityTokens[K] => {
  return opacityTokens[key];
};

export const getColorToken = <K extends keyof ColorTokens>(
  key: K,
): ColorTokens[K] => {
  return colorTokens[key];
};
