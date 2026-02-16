import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import RNModal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "@components/button";
import Text from "@components/text";
import { useTheme } from "@hooks/useTheme";

export type Variant = "system" | "bottom";

export type Direction = "vertical" | "horizontal";

export type ButtonConfig = {
  text: string;
  onClickFunction: () => void;
};

interface Props {
  customStyles?: StyleProp<ViewStyle>;
  variant?: Variant;
  direction?: Direction;
  title?: string;
  description?: string;
  isVisible: boolean;
  primaryButton: ButtonConfig;
  secondaryButton?: ButtonConfig;
  onBackdropPress: () => void;
  onModalHide?: () => void;
  children?: React.ReactNode;
}

/** ===============================
 * 모달 컴포넌트
 * @param customStyles 커스텀 스타일
 * @param variant 모달 형태
 * @param title 모달 제목
 * @param description 모달 설명
 * @param isVisible 모달 표시 여부
 * @param primaryButton 주요 버튼 설정
 * @param secondaryButton 보조 버튼 설정
 * @param onBackdropPress 모달 표시 여부 설정 함수
 * @param onModalHide 모달 숨김 후 실행 함수
 * @param children 모달 자식 요소
 * =============================== */
const Modal = ({
  customStyles,
  variant,
  direction = "vertical",
  title,
  description,
  isVisible,
  primaryButton,
  secondaryButton,
  onBackdropPress,
  onModalHide,
  children,
}: Props) => {
  // hooks
  const insets = useSafeAreaInsets();
  const { unit, spacing, colors, radius } = useTheme();
  // styles
  const styles = StyleSheet.create({
    systemWrapper: {
      margin: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    bottomWrapper: {
      margin: 0,
      justifyContent: "flex-end",
    },
    indicatorBox: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: spacing(8),
      height: spacing(16),
    },
    indicator: {
      width: spacing(44),
      height: spacing(4),
      borderRadius: radius(4),
      backgroundColor: colors("gray", 300),
    },
    systemContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: unit(288),
      borderRadius: radius(16),
      backgroundColor: colors("background"),
    },
    bottomContainer: {
      paddingBottom: insets.bottom,
      borderTopLeftRadius: radius(16),
      borderTopRightRadius: radius(16),
      backgroundColor: colors("background"),
    },
    titleContainer: {
      paddingTop: spacing(16),
      paddingHorizontal: variant === "system" ? spacing(24) : spacing(16),
      gap: spacing(8),
    },
    bodyContainer: {
      backgroundColor: colors("background"),
    },
    verticalButtonContainer: {
      width: "100%",
      padding: spacing(16),
      gap: spacing(6),
    },
    horizontalButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: spacing(16),
      gap: spacing(6),
    },
  });
  // render
  return (
    <RNModal
      style={variant === "system" ? styles.systemWrapper : styles.bottomWrapper}
      isVisible={isVisible}
      animationIn={variant === "system" ? "fadeIn" : "slideInUp"}
      animationOut={variant === "system" ? "fadeOut" : "slideOutDown"}
      swipeDirection={["down"]}
      onBackdropPress={onBackdropPress}
      onModalHide={onModalHide}
      useNativeDriverForBackdrop>
      <View
        style={[
          variant === "system"
            ? styles.systemContainer
            : styles.bottomContainer,
          customStyles,
        ]}>
        {title && (
          <View style={styles.indicatorBox}>
            {variant === "bottom" && <View style={styles.indicator} />}
          </View>
        )}
        <View style={styles.titleContainer}>
          {title && (
            <Text
              customStyles={
                variant === "system"
                  ? { textStyle: { textAlign: "center" } }
                  : undefined
              }
              variant="ui-1"
              weight={600}
              color={colors("gray", 900)}>
              {title}
            </Text>
          )}
          {description && (
            <Text
              customStyles={
                variant === "system"
                  ? { textStyle: { textAlign: "center" } }
                  : undefined
              }
              variant="body-2"
              weight={400}
              color={colors("gray", "default")}>
              {description}
            </Text>
          )}
        </View>
        <View style={styles.bodyContainer}>{children}</View>
        {direction === "horizontal" && (
          <View style={styles.horizontalButtonContainer}>
            {secondaryButton?.text && (
              <View style={{ flex: 1 }}>
                <Button
                  variant="border"
                  size="medium"
                  text={secondaryButton.text}
                  isFullWidth
                  onPress={secondaryButton.onClickFunction}
                />
              </View>
            )}
            <View style={{ flex: secondaryButton?.text ? 2.2 : 1 }}>
              <Button
                variant="primary"
                size="medium"
                text={primaryButton.text}
                isFullWidth
                onPress={primaryButton.onClickFunction}
              />
            </View>
          </View>
        )}
        {direction === "vertical" && (
          <View style={styles.verticalButtonContainer}>
            <Button
              variant="primary"
              size="medium"
              text={primaryButton.text}
              isFullWidth
              onPress={primaryButton.onClickFunction}
            />
            {secondaryButton?.text && (
              <Button
                variant="border"
                size="medium"
                text={secondaryButton.text}
                isFullWidth
                onPress={secondaryButton.onClickFunction}
              />
            )}
          </View>
        )}
      </View>
    </RNModal>
  );
};

export default Modal;
