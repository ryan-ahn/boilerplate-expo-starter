import { StyleSheet, View } from "react-native";

import RNModal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "@components/button";
import Text from "@components/text";
import { useTheme } from "@hooks/useTheme";
import { flex, gap } from "@theme/styles";

export type Direction = "vertical" | "horizontal";

export type ButtonConfig = {
  text: string;
  onClickFunction: () => void;
};

type Props = {
  direction?: Direction;
  title?: string;
  description?: string;
  isVisible: boolean;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
  onBackdropPress: () => void;
  onModalHide?: () => void;
  onModalShow?: () => void;
  children?: React.ReactNode;
};

/**
 * 모달 컴포넌트
 * @param direction 모달 버튼 방향
 * @param title 모달 제목
 * @param description 모달 설명
 * @param isVisible 모달 표시 여부
 * @param primaryButton 주요 버튼 설정
 * @param secondaryButton 보조 버튼 설정
 * @param onBackdropPress 모달 표시 여부 설정 함수
 * @param onModalHide 모달 숨김 후 실행 함수
 * @param children 모달 자식 요소
 */
const Modal = ({
  direction = "vertical",
  title,
  description,
  isVisible,
  primaryButton,
  secondaryButton,
  onBackdropPress,
  onModalHide,
  onModalShow,
  children,
}: Props) => {
  // hooks
  const insets = useSafeAreaInsets();
  const { spacing, colors, radius } = useTheme();
  // styles
  const styles = StyleSheet.create({
    container: {
      margin: 0,
    },
    indicatorBox: {
      paddingTop: spacing(8),
      height: spacing(16),
    },
    indicator: {
      width: spacing(44),
      height: spacing(4),
      borderRadius: radius(4),
      backgroundColor: colors("gray", 300),
    },
    contentContainer: {
      paddingBottom: insets.bottom,
      borderTopLeftRadius: radius(24),
      borderTopRightRadius: radius(24),
      backgroundColor: colors("gray", 50),
      overflow: "hidden",
    },
    titleContainer: {
      paddingTop: spacing(16),
      paddingHorizontal: spacing(16),
      gap: spacing(8),
    },
    bodyContainer: {
      backgroundColor: colors("gray", 50),
    },
    verticalButtonContainer: {
      paddingHorizontal: spacing(16),
    },
    horizontalButtonContainer: {
      paddingHorizontal: spacing(16),
    },
  });
  // render
  return (
    <RNModal
      style={[flex.justifyEnd, styles.container]}
      isVisible={isVisible}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      swipeDirection={["down"]}
      propagateSwipe={true}
      backdropOpacity={0.02}
      onBackdropPress={onBackdropPress}
      onModalHide={onModalHide}
      onModalShow={onModalShow}
      useNativeDriver={true}
      hideModalContentWhileAnimating={false}
      useNativeDriverForBackdrop>
      <View style={[styles.contentContainer]}>
        {title && (
          <View style={[flex.center, styles.indicatorBox]}>
            <View style={styles.indicator} />
          </View>
        )}
        <View style={styles.titleContainer}>
          {title && (
            <Text variant="ui-1" weight={600} color={colors("gray", 900)}>
              {title}
            </Text>
          )}
          {description && (
            <Text
              variant="body-2"
              weight={400}
              color={colors("gray", "default")}>
              {description}
            </Text>
          )}
        </View>
        <View style={[flex.startCenter, styles.bodyContainer]}>{children}</View>
        {direction === "horizontal" && primaryButton?.text && (
          <View
            style={[
              flex.row,
              flex.startCenter,
              gap.g8,
              styles.horizontalButtonContainer,
            ]}>
            {secondaryButton?.text && (
              <View style={[flex.row, flex.full]}>
                <Button
                  variant="tint"
                  size="medium"
                  text={secondaryButton.text}
                  isFullWidth
                  isRound
                  onPress={secondaryButton.onClickFunction}
                />
              </View>
            )}
            <View style={[flex.row, { flex: secondaryButton?.text ? 2.2 : 1 }]}>
              <Button
                variant="primary"
                size="medium"
                text={primaryButton.text}
                isFullWidth
                isRound
                onPress={primaryButton.onClickFunction}
              />
            </View>
          </View>
        )}
        {direction === "vertical" && primaryButton?.text && (
          <View style={[gap.g8, styles.verticalButtonContainer]}>
            <View style={[flex.row]}>
              <Button
                variant="primary"
                size="medium"
                text={primaryButton.text}
                isFullWidth
                isRound
                onPress={primaryButton.onClickFunction}
              />
            </View>
            {secondaryButton?.text && (
              <View style={[flex.row]}>
                <Button
                  variant="tint"
                  size="medium"
                  text={secondaryButton.text}
                  isFullWidth
                  isRound
                  onPress={secondaryButton.onClickFunction}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </RNModal>
  );
};

export default Modal;
