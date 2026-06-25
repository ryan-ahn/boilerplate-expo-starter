import {
  Platform,
  Switch as RNSwitch,
  StyleSheet,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@hooks/useTheme";

type Props = {
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
  value: boolean;
  onValueChange: (value: boolean) => void;
};

/**
 * 스위치 컴포넌트
 * @param value 스위치 값
 * @param onValueChange 스위치 값 변경 이벤트
 */
const Switch = ({ customStyles, value, onValueChange }: Props) => {
  // hooks
  const { colors } = useTheme();
  const { deviceTheme } = useTheme();
  // styles
  const getSwitchColors = () => {
    const colorMap = {
      dark: {
        trackOff: colors("gray", 800, "static"),
        trackOn: colors("primary", "default", "static"),
        thumb: colors("background", "default", "static"),
      },
      light: {
        trackOff: colors("gray", 300, "theme"),
        trackOn: colors("primary", "default", "theme"),
        thumb: colors("background", "default", "theme"),
      },
    };
    return colorMap[deviceTheme === "dark" ? "dark" : "light"];
  };

  const styles = StyleSheet.create({
    container: {
      transform: [{ scaleX: 0.9 }, { scaleY: 1 }],
    },
  });
  // render
  return (
    <RNSwitch
      style={[
        styles.container as ViewStyle,
        customStyles?.containerStyle && customStyles.containerStyle,
      ]}
      value={value}
      onValueChange={onValueChange}
      thumbColor={getSwitchColors().thumb}
      trackColor={{
        false: getSwitchColors().trackOff,
        true: getSwitchColors().trackOn,
      }}
      {...(Platform.OS === "ios" && {
        ios_backgroundColor: getSwitchColors().trackOff,
      })}
    />
  );
};

export default Switch;
