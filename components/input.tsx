import React from "react";
import {
  KeyboardType,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
} from "react-native";

import { useTheme } from "@hooks/useTheme";

type Size = "small" | "medium" | "large";

type Props = {
  size?: Size;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyTypeOptions;
  isAutoFocus?: boolean;
  isDisabled?: boolean;
  isSecureText?: boolean;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
};

/**
 * 인풋 컴포넌트
 * @param variant 인풋 형태
 * @param size 인풋 크기
 * @param value 인풋 값 (controlled component)
 * @param placeholder 플레이스홀더 텍스트
 * @param keyboardType 키보드 타입
 * @param returnKeyType 리턴 키 타입
 * @param isAutoFocus 자동 포커스 여부
 * @param isDisabled 비활성화 여부
 * @param isSecureText 비밀번호 입력 필드 여부
 * @param onChange 인풋 값 변경 이벤트
 * @param onSubmit 인풋 제출 이벤트
 */
const Input = React.memo(
  ({
    size = "medium",
    value,
    placeholder = "내용을 입력해주세요.",
    keyboardType = "default",
    returnKeyType = "default",
    isAutoFocus = false,
    isDisabled = false,
    isSecureText = false,
    onChange,
    onSubmit,
  }: Props) => {
    // hooks
    const { spacing, colors, unit, decimal } = useTheme();
    // handlers
    const handleChange = (text: string) => {
      onChange(text);
    };
    // styles
    const getTextColor = () => {
      if (isDisabled) {
        return colors("gray", 400);
      }
      return colors("foreground");
    };

    const containerHeight = {
      small: unit(24),
      medium: unit(26),
      large: unit(28),
    }[size];

    const textSize = {
      small: unit(14),
      medium: unit(15),
      large: unit(16),
    }[size];

    const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        height: containerHeight,
        paddingHorizontal: spacing(4),
        paddingVertical: spacing(4),
        color: getTextColor(),
        fontSize: textSize,
        textAlignVertical: "center",
        letterSpacing: -decimal(0.12),
      },
      placeholderText: {
        color: colors("gray", 500),
      },
    });
    // render
    return (
      <TextInput
        style={[styles.container]}
        value={value}
        autoFocus={isAutoFocus}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholderText.color}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        editable={!isDisabled}
        secureTextEntry={isSecureText}
        onChangeText={handleChange}
        onSubmitEditing={() => onSubmit(value)}
      />
    );
  },
);

export default Input;
