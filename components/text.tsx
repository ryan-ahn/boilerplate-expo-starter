import React from "react";
import {
  LayoutChangeEvent,
  Text as RNText,
  StyleSheet,
  TextProps,
  TextStyle,
} from "react-native";

import { useTheme } from "@hooks/useTheme";

export type Variant =
  | "display-1"
  | "display-2"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-5"
  | "heading-6"
  | "heading-7"
  | "body-1"
  | "body-2"
  | "body-3"
  | "description-1"
  | "description-2"
  | "description-3"
  | "ui-1"
  | "ui-2"
  | "ui-3"
  | "ui-4"
  | "ui-5"
  | "ui-6"
  | "ui-7";

interface Props {
  customStyles?: {
    textStyle?: TextStyle;
  };
  variant: Variant;
  color?: string;
  weight?: number;
  children: string | number;
  numberOfLines?: number;
  ellipsizeMode?: TextProps["ellipsizeMode"];
  onLayout?: (event: LayoutChangeEvent) => void;
}

/** ===============================
 * 텍스트 컴포넌트
 * @param customStyles 커스텀 스타일
 * @param variant 텍스트 형태
 * @param color 텍스트 색상
 * @param weight 텍스트 무게
 * @param numberOfLines 보여지는 줄 수
 * @param ellipsizeMode 텍스트 자르기 모드
 * @param children 텍스트 내용
 * @param onLayout 텍스트 레이아웃 변경 시 호출되는 콜백 함수
 * =============================== */
const Text = ({
  customStyles,
  variant,
  color,
  weight,
  numberOfLines,
  ellipsizeMode,
  children,
}: Props) => {
  // hooks
  const { fonts, colors, decimal } = useTheme();
  // styles
  const getTextStyle = (): TextStyle => {
    const splitVariant = variant.split("-");
    const fontStyle = fonts(splitVariant[0]);
    const fontSize = splitVariant[1];
    const targetFontStyle = fontStyle[fontSize];
    return {
      fontSize: targetFontStyle.fontSize,
      fontWeight: weight ? String(weight) : targetFontStyle.fontWeight,
      lineHeight: targetFontStyle.lineHeight,
      letterSpacing: -decimal(0.12),
      color: color || colors("gray", 900),
    };
  };

  const styles = StyleSheet.create({
    text: {
      ...getTextStyle(),
      ...(customStyles?.textStyle && customStyles.textStyle),
    },
  });
  // render
  return (
    <RNText
      style={styles.text}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}>
      {children}
    </RNText>
  );
};

export default Text;
