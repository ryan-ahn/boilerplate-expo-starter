import { StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  customStyle?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
  height?: number;
  color?: string;
};

/**
 * 디바이더 컴포넌트
 * @param color 디바이더 색상
 * @param width 디바이더 너비
 */
const Divider = ({ customStyle, color = "#000000", height = 1 }: Props) => {
  // styles
  const styles = StyleSheet.create({
    container: {
      height: height,
      backgroundColor: color,
    },
  });
  // render
  return (
    <View
      style={[
        styles.container,
        customStyle?.containerStyle && customStyle.containerStyle,
      ]}
    />
  );
};

export default Divider;
