import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Position, hideMessage, showMessage } from "react-native-flash-message";

import Icon from "@components/icon";
import Text from "@components/text";
import { flex } from "@theme/styles";

export type Variant = "default" | "success" | "error" | "info" | "warning";

export type Color = "black" | "white";

export type Props = {
  variant?: Variant;
  color?: Color;
  text: string;
  isButton?: boolean;
  buttonText?: string;
  position?: Position;
  duration?: number;
  onPress?: () => void;
  onButtonPress?: () => void;
};

/**
 * 토스트 컴포넌트
 * @param variant 토스트 형태
 * @param color 토스트 색상
 * @param text 토스트 텍스트
 * @param isButton 토스트 버튼 여부
 * @param buttonText 토스트 버튼 텍스트
 * @param position 토스트 위치
 * @param duration 토스트 지속 시간
 * @param onPress 토스트 클릭 이벤트
 * @param onButtonPress 토스트 버튼 클릭 이벤트
 */
const ToastV2 = ({
  variant = "default",
  color = "black",
  text,
  isButton = false,
  buttonText = "확인",
  position = "bottom",
  duration = 3000,
  onPress = () => {},
  onButtonPress = () => {},
}: Props) => {
  // styles
  const iconColor = {
    success: "#45D483",
    error: "#FF4646",
    info: "#338EF7",
  }[variant];

  const backgroundColor = {
    black: "rgba(0, 0, 0, 0.8)",
    white: "#FFFFFF",
  }[color];

  const textColor = {
    black: "#FFFFFF",
    white: "#000000",
  }[color];

  const iconName = {
    success: "circle-check",
    error: "circle-alert",
    info: "circle-info",
  }[variant];

  const styles = StyleSheet.create({
    wrapper: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      gap: 6,
    },
    buttonContainer: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
    },
  });
  // functions
  showMessage({
    style: [flex.row, flex.alignCenter, styles.wrapper],
    color: textColor,
    backgroundColor,
    message: text,
    position: position,
    duration: duration,
    onPress: () => {
      onPress();
      hideMessage();
    },
    icon:
      variant !== "default" &&
      (() => <Icon name={iconName} size={24} color={iconColor} />),
    renderCustomContent: isButton
      ? () => (
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                onButtonPress();
                hideMessage();
              }}>
              <Text variant="ui-3" weight={600} color={textColor}>
                {buttonText}
              </Text>
            </Pressable>
          </View>
        )
      : undefined,
  });
};

export default ToastV2;
