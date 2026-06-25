import {
  GestureResponderEvent,
  Pressable as RNPressable,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { useTheme } from "@hooks/useTheme";

type Props = {
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
  children: React.ReactNode;
  onPress: () => void;
};

/**
 * 프레스 가능한 컴포넌트
 * @param customStyles 커스텀 스타일
 * @param children 자식 요소
 * @param onPress 클릭 이벤트
 */
const Pressable = ({ customStyles, children, onPress }: Props) => {
  // hooks
  const { colors } = useTheme();
  // styles
  const styles = StyleSheet.create({
    pressed: {
      color: colors("gray", 500),
      backgroundColor: colors("gray", 100, "theme", 0.4),
    },
  });
  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onPress();
  };
  // render
  return (
    <RNPressable
      onPress={handlePress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        customStyles?.containerStyle && customStyles.containerStyle,
      ]}>
      {children}
    </RNPressable>
  );
};

export default Pressable;
