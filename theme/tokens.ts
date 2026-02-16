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
  sky1: string;
  sky2: string;
  sky3: string;
  sky4: string;
  sky5: string;
  sky6: string;
  sky7: string;
  sky8: string;
  sky9: string;
  sky10: string;
  yellow1: string;
  yellow2: string;
  yellow3: string;
  yellow4: string;
  yellow5: string;
  yellow6: string;
  yellow7: string;
  yellow8: string;
  yellow9: string;
  yellow10: string;
  purple1: string;
  purple2: string;
  purple3: string;
  purple4: string;
  purple5: string;
  purple6: string;
  purple7: string;
  purple8: string;
  purple9: string;
  purple10: string;
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
  rose1: string;
  rose2: string;
  rose3: string;
  rose4: string;
  rose5: string;
  rose6: string;
  rose7: string;
  rose8: string;
  rose9: string;
  rose10: string;
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
  black: string;
  white: string;
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
  gray1: "#FAFAFA",
  gray2: "#F5F5F5",
  gray3: "#E4E4E4",
  gray4: "#D4D4D4",
  gray5: "#A1A1A1",
  gray6: "#717171",
  gray7: "#525252",
  gray8: "#3F3F3F",
  gray9: "#272727",
  gray10: "#181818",
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
  sky1: "#EBF5FF",
  sky2: "#D7ECFF",
  sky3: "#A3D3FF",
  sky4: "#67B6FF",
  sky5: "#45A6FF",
  sky6: "#008CFF",
  sky7: "#0079E8",
  sky8: "#0066C5",
  sky9: "#0459A6",
  sky10: "#024A8C",
  yellow1: "#FFFBEB",
  yellow2: "#FFF6D7",
  yellow3: "#FFEBA3",
  yellow4: "#FFDE67",
  yellow5: "#FFD233",
  yellow6: "#FFC700",
  yellow7: "#CC9F00",
  yellow8: "#9A7800",
  yellow9: "#5C4800",
  yellow10: "#5C4800",
  purple1: "#F2EAFA",
  purple2: "#E4D4F4",
  purple3: "#C9A9E9",
  purple4: "#AE7EDE",
  purple5: "#9353D3",
  purple6: "#7828C8",
  purple7: "#6020A0",
  purple8: "#481878",
  purple9: "#301050",
  purple10: "#180828",
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
  rose1: "#FFEBEB",
  rose2: "#F4C7C8",
  rose3: "#EFA3A5",
  rose4: "#E87D80",
  rose5: "#DF5C5F",
  rose6: "#D4494D",
  rose7: "#B84144",
  rose8: "#97383A",
  rose9: "#772D2F",
  rose10: "#592225",
  orange1: "#FFEAD7",
  orange2: "#FFDEC3",
  orange3: "#FFCFA3",
  orange4: "#FFB067",
  orange5: "#FFA052",
  orange6: "#FD9332",
  orange7: "#E27F2D",
  orange8: "#C36B27",
  orange9: "#A15621",
  orange10: "#7F421A",
  green1: "#E8FAF0",
  green2: "#D1F4E0",
  green3: "#A2E9C1",
  green4: "#74DFA2",
  green5: "#45D483",
  green6: "#17C964",
  green7: "#12A150",
  green8: "#0E793C",
  green9: "#095028",
  green10: "#095028",
  black: "#000000",
  white: "#FFFFFF",
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
