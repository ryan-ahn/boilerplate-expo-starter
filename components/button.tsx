import React from "react";
import {
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import Text, { Variant as FontVariant } from "@components/text";
import { useTheme } from "@hooks/useTheme";

export type Variant =
  | "primary"
  | "tint"
  | "border"
  | "gray"
  | "black"
  | "danger";

export type Size = "xsmall" | "small" | "medium" | "large";

interface Props {
  customStyles?: {
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
  };
  variant: Variant;
  size: Size;
  text?: string;
  isRound?: boolean;
  isFullWidth?: boolean;
  isShareSpace?: boolean;
  isDisabled?: boolean;
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
  onPress?: () => void;
}

/** ===============================
 * 버튼 컴포넌트
 * @param customStyles 커스텀 스타일
 * @param variant 버튼 형태
 * @param size 버튼 크기
 * @param text 버튼 텍스트
 * @param isRound 버튼 모서리 라운딩 여부
 * @param isFullWidth 버튼 너비 100% 여부
 * @param isShareSpace 버튼 너비 부모 너비에 맞게 조정 여부
 * @param isDisabled 버튼 비활성화 여부
 * @param leftChildren 버튼 왼쪽 자식 요소
 * @param rightChildren 버튼 오른쪽 자식 요소
 * @param onPress 버튼 클릭 이벤트
 * =============================== */
const Button = ({
  customStyles,
  variant,
  size,
  text,
  isRound = false,
  isFullWidth = false,
  isShareSpace = false,
  isDisabled = false,
  leftChildren,
  rightChildren,
  onPress,
}: Props) => {
  // hooks
  const { spacing, radius, borderWidth, colors } = useTheme();
  // styles
  const getContainerVariant = (isPressed: boolean): ViewStyle => {
    const defaultVariantMap = {
      primary: {
        borderColor: colors("primary", "default"),
        backgroundColor: colors("primary", "default"),
      },
      tint: {
        borderColor: colors("primary", 100),
        backgroundColor: colors("primary", 50),
      },
      border: {
        borderColor: colors("primary", 300),
        backgroundColor: colors("background"),
      },
      gray: {
        borderColor: colors("gray", 400),
        backgroundColor: colors("background"),
      },
      black: {
        borderColor: colors("gray", 400),
        backgroundColor: colors("background"),
      },
      danger: {
        borderColor: colors("red", 500),
        backgroundColor: colors("red", 300),
      },
    };
    const pressedVariantMap = {
      primary: {
        borderColor: colors("primary", 700),
        backgroundColor: colors("primary", 700),
      },
      tint: {
        borderColor: colors("primary", 300),
        backgroundColor: colors("primary", 100),
      },
      border: {
        borderColor: colors("primary", 300),
        backgroundColor: colors("primary", 100),
      },
      gray: {
        borderColor: colors("gray", 300),
        backgroundColor: colors("gray", 200),
      },
      black: {
        borderColor: colors("gray", 400),
        backgroundColor: colors("gray", 300),
      },
      danger: {
        borderColor: colors("red", 600),
        backgroundColor: colors("red", 500),
      },
    };
    if (isDisabled) {
      return {
        borderColor: colors("gray", 200),
        backgroundColor: colors("gray", 200),
      };
    }
    if (isPressed) {
      return pressedVariantMap[variant];
    }
    return defaultVariantMap[variant];
  };

  const getContainerSize = (): ViewStyle => {
    const sizeMap = {
      large: {
        paddingVertical: spacing(20),
        paddingHorizontal: spacing(24),
        borderRadius: radius(8),
        borderWidth: borderWidth(1),
      },
      medium: {
        paddingVertical: spacing(16),
        paddingHorizontal: spacing(20),
        borderRadius: radius(8),
        borderWidth: borderWidth(1),
      },
      small: {
        paddingVertical: spacing(12),
        paddingHorizontal: spacing(16),
        borderRadius: radius(6),
        borderWidth: borderWidth(1),
      },
      xsmall: {
        paddingVertical: spacing(8),
        paddingHorizontal: spacing(12),
        borderRadius: radius(6),
        borderWidth: borderWidth(0.5),
      },
    };
    return sizeMap[size];
  };

  const getFontSize = (): FontVariant => {
    const sizeMap = {
      large: "ui-1" as FontVariant,
      medium: "ui-2" as FontVariant,
      small: "ui-3" as FontVariant,
      xsmall: "ui-4" as FontVariant,
    };
    return sizeMap[size];
  };

  const getFontWeight = (): number => {
    const weightMap = {
      large: 600,
      medium: 600,
      small: 500,
      xsmall: 500,
    };
    return weightMap[size];
  };

  const getChildrenColor = (): string => {
    const colorMap = {
      primary: colors("background"),
      tint: colors("primary", "default"),
      border: colors("primary", "default"),
      gray: colors("gray", "default"),
      black: colors("gray", 900),
      danger: colors("background"),
    };
    if (isDisabled) {
      return colors("gray", 400);
    }
    return colorMap[variant];
  };

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: "row",
      ...(isShareSpace && { flex: 1 }),
    },
    container: {
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      gap: spacing(4),
      ...(isFullWidth && { flex: 1 }),
      ...getContainerSize(),
      ...(isRound && { borderRadius: radius(9999) }),
      ...(customStyles?.containerStyle && customStyles.containerStyle),
    },
  });
  // render
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          getContainerVariant(pressed),
        ]}
        disabled={isDisabled}
        onPress={onPress}>
        {leftChildren}
        <Text
          customStyles={{
            textStyle: customStyles?.textStyle,
          }}
          variant={getFontSize()}
          weight={getFontWeight()}
          color={getChildrenColor()}>
          {text || "확인"}
        </Text>
        {rightChildren}
      </Pressable>
    </View>
  );
};

export default Button;
