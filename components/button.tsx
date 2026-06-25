import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

import Text, { Variant as FontVariant } from "@components/text";
import { useTheme } from "@hooks/useTheme";
import { flex } from "@theme/styles";

export type Variant = "default" | "primary" | "secondary" | "tint" | "danger";

export type Size = "xsmall" | "small" | "medium" | "large";

type Props = {
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
  };
  variant: Variant;
  size: Size;
  text?: string;
  isRound?: boolean;
  isFullWidth?: boolean;
  isShareSpace?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
  onPress?: () => void;
};

/**
 * 버튼 컴포넌트
 * @param customStyles 커스텀 스타일
 * @param variant 버튼 형태
 * @param size 버튼 크기
 * @param text 버튼 텍스트
 * @param isRound 버튼 모서리 라운딩 여부
 * @param isFullWidth 버튼 너비 100% 여부
 * @param isDisabled 버튼 비활성화 여부
 * @param isLoading 버튼 로딩 여부
 * @param leftChildren 버튼 왼쪽에 위치할 자식 요소
 * @param rightChildren 버튼 오른쪽에 위치할 자식 요소
 * @param onPress 버튼 클릭 이벤트
 */
const Button = ({
  customStyles,
  variant,
  size,
  text,
  isRound = false,
  isFullWidth = false,
  isDisabled = false,
  isLoading = false,
  leftChildren,
  rightChildren,
  onPress,
}: Props) => {
  // hooks
  const { spacing, radius, borderWidth, colors } = useTheme();
  // styles
  const getContainerVariant = (isPressed: boolean): ViewStyle => {
    const defaultVariantMap = {
      default: {
        borderColor: colors("foreground"),
        backgroundColor: colors("foreground"),
      },
      primary: {
        borderColor: colors("primary", "default"),
        backgroundColor: colors("primary", "default"),
      },
      secondary: {
        borderColor: colors("secondary", "default"),
        backgroundColor: colors("secondary", "default"),
      },
      tint: {
        borderColor: colors("gray", 400),
        backgroundColor: colors("gray", 50),
      },
      danger: {
        borderColor: colors("red", 500),
        backgroundColor: colors("red", 300),
      },
    };
    const pressedVariantMap = {
      default: {
        borderColor: colors("gray", 700),
        backgroundColor: colors("gray", 700),
      },
      primary: {
        borderColor: colors("primary", 700),
        backgroundColor: colors("primary", 700),
      },
      secondary: {
        borderColor: colors("secondary", 300),
        backgroundColor: colors("secondary", 100),
      },
      tint: {
        borderColor: colors("gray", 300),
        backgroundColor: colors("gray", 100),
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

  const getChildrenColor = (): string => {
    const colorMap = {
      default: colors("background"),
      primary: colors("background"),
      secondary: colors("background"),
      tint: colors("gray", 700),
      danger: colors("background"),
    };
    if (isDisabled) {
      return colors("gray", 400);
    }
    return colorMap[variant];
  };

  const containerSize: ViewStyle = {
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
  }[size];

  const fontSize: FontVariant = {
    large: "heading-5",
    medium: "ui-1",
    small: "ui-2",
    xsmall: "ui-3",
  }[size] as FontVariant;

  const fontWeight: number = {
    large: 600,
    medium: 600,
    small: 500,
    xsmall: 500,
  }[size];

  const styles = StyleSheet.create({
    container: {
      minWidth: 0,
      gap: spacing(4),
      alignSelf: "stretch",
      backgroundColor: "red",
      ...containerSize,
      ...(isFullWidth && { flexGrow: 1 }),
      ...(isRound && { borderRadius: radius(9999) }),
    },
  });
  // render
  return (
    <Pressable
      style={({ pressed }) => [
        flex.row,
        flex.center,
        styles.container,
        getContainerVariant(pressed),
        customStyles?.containerStyle && customStyles.containerStyle,
      ]}
      disabled={isDisabled || isLoading}
      onPress={onPress}>
      {leftChildren}
      {isLoading && (
        <ActivityIndicator size="small" color={colors("primary", "default")} />
      )}
      {!isLoading && (
        <Text
          customStyles={{
            textStyle: customStyles?.textStyle && customStyles.textStyle,
          }}
          variant={fontSize}
          weight={fontWeight}
          color={getChildrenColor()}>
          {text || "확인"}
        </Text>
      )}
      {rightChildren}
    </Pressable>
  );
};

export default Button;
