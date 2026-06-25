import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";

import TextV2, { Variant as FontVariant } from "@components/text";
import { useTheme } from "@hooks/useTheme";

type Variant = "contain" | "tint" | "line";

type Size = "xsmall" | "small" | "medium" | "large" | "xlarge";

type Color = "primary" | "secondary" | "green" | "gray" | "background";

interface Props {
  customStyles?: {
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
  };
  variant: Variant;
  size: Size;
  color: Color;
  text: string;
  isRound?: boolean;
  isPressable?: boolean;
  leftChildren?: React.ReactNode;
  onPress?: () => void;
}

/** ===============================
 * 칩 컴포넌트
 * @param customStyles 커스텀 스타일
 * @param variant 칩 형태
 * @param size 칩 크기
 * @param color 칩 색상
 * @param text 칩 텍스트
 * @param isRound 칩 모서리 라운딩 여부
 * @param isPressable 칩 클릭 가능 여부
 * @param leftChildren 칩 왼쪽 자식 요소
 * @param onPress 칩 클릭 이벤트
 * =============================== */
const Chip = ({
  customStyles,
  variant,
  size,
  color,
  text,
  isRound = false,
  isPressable = false,
  leftChildren,
  onPress,
}: Props) => {
  // hooks
  const { spacing, radius, borderWidth, colors } = useTheme();
  // styles
  const getContainerColor = (): Record<
    "solidColor" | "tintBackgroundColor" | "tintBorderColor" | "lineColor",
    string
  > => {
    const colorMap = {
      background: {
        solidColor: colors("gray", 50),
        tintBackgroundColor: colors("gray", 100),
        tintBorderColor: colors("gray", 200),
        lineColor: colors("gray", 500),
      },
      primary: {
        solidColor: colors("primary", "default", "static"),
        tintBackgroundColor: colors("primary", 50, "static"),
        tintBorderColor: colors("primary", 100, "static"),
        lineColor: colors("primary", 300, "static"),
      },
      secondary: {
        solidColor: colors("secondary", "default", "static"),
        tintBackgroundColor: colors("secondary", 50, "static"),
        tintBorderColor: colors("secondary", 100, "static"),
        lineColor: colors("secondary", 300, "static"),
      },
      green: {
        solidColor: colors("green", "default", "static"),
        tintBackgroundColor: colors("green", 50, "static"),
        tintBorderColor: colors("green", 100, "static"),
        lineColor: colors("green", 300, "static"),
      },
      gray: {
        solidColor: colors("gray", "default", "static"),
        tintBackgroundColor: colors("gray", 50, "static"),
        tintBorderColor: colors("gray", 100, "static"),
        lineColor: colors("gray", 300, "static"),
      },
    };
    return colorMap[color];
  };

  const getContainerStyle = (): ViewStyle => {
    const styleMap = {
      contain: {
        borderColor: getContainerColor().solidColor,
        backgroundColor: getContainerColor().solidColor,
      },
      tint: {
        borderColor: getContainerColor().tintBorderColor,
        backgroundColor: getContainerColor().tintBackgroundColor,
      },
      line: {
        borderColor: getContainerColor().lineColor,
        backgroundColor: colors("background"),
      },
    };
    return styleMap[variant];
  };

  const getContainerSize = (): ViewStyle => {
    const sizeMap = {
      xsmall: {
        paddingVertical: spacing(3),
        paddingHorizontal: spacing(5),
      },
      small: {
        paddingVertical: spacing(4),
        paddingHorizontal: spacing(7),
      },
      medium: {
        paddingVertical: spacing(5),
        paddingHorizontal: spacing(8),
      },
      large: {
        paddingVertical: spacing(6),
        paddingHorizontal: spacing(10),
      },
      xlarge: {
        paddingVertical: spacing(8),
        paddingHorizontal: spacing(12),
      },
    };
    return sizeMap[size];
  };

  const getFontSize = (): FontVariant => {
    const sizeMap = {
      xsmall: "ui-7" as FontVariant,
      small: "ui-6" as FontVariant,
      medium: "ui-5" as FontVariant,
      large: "ui-4" as FontVariant,
      xlarge: "ui-2" as FontVariant,
    };
    return sizeMap[size];
  };

  const getFontColor = (): Record<
    "solidColor" | "tintColor" | "lineColor",
    string
  > => {
    const colorMap = {
      background: {
        solidColor: colors("foreground"),
        tintColor: colors("foreground"),
        lineColor: colors("foreground"),
      },
      primary: {
        solidColor: colors("foreground"),
        tintColor: colors("primary", "default"),
        lineColor: colors("primary", "default"),
      },
      secondary: {
        solidColor: colors("foreground"),
        tintColor: colors("secondary", "default"),
        lineColor: colors("secondary", "default"),
      },
      green: {
        solidColor: colors("foreground"),
        tintColor: colors("green", "default"),
        lineColor: colors("green", "default"),
      },
      gray: {
        solidColor: colors("background"),
        tintColor: colors("gray", "default"),
        lineColor: colors("gray", "default"),
      },
    };
    return colorMap[color];
  };

  const getFontStyle = (): TextStyle => {
    const styleMap = {
      contain: {
        color: getFontColor().solidColor,
      },
      tint: {
        color: getFontColor().tintColor,
      },
      line: {
        color: getFontColor().lineColor,
      },
    };
    return styleMap[variant];
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      paddingHorizontal: isRound ? spacing(7) : spacing(6),
      gap: spacing(3),
      borderRadius: isRound ? radius(9999) : radius(4),
      borderWidth: borderWidth(1),
      ...getContainerSize(),
      ...getContainerStyle(),
      ...(customStyles?.containerStyle && customStyles.containerStyle),
    },
    text: {
      ...getFontStyle(),
      ...(customStyles?.textStyle && customStyles.textStyle),
    },
  });
  // render
  return (
    <Pressable
      style={[styles.container]}
      disabled={!isPressable}
      onPress={onPress}>
      {leftChildren}
      <TextV2
        customStyles={{ textStyle: styles.text }}
        variant={getFontSize()}
        weight={600}>
        {text}
      </TextV2>
    </Pressable>
  );
};

export default Chip;
