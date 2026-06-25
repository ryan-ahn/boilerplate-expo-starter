import {
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import Icon from "@components/icon";
import { useTheme } from "@hooks/useTheme";

type Size = "small" | "medium" | "large";

interface Props {
  customStyles?: {
    checkboxContainerStyle?: ViewStyle;
    checkboxIconStyle?: ImageStyle;
  };
  size: Size;
  isSelected: boolean;
  onPress: () => void;
}

/**
 * 체크박스 컴포넌트
 * @param customStyles 커스텀 스타일
 * @param size 체크박스 크기
 * @param isSelected 체크박스 선택 여부
 * @param onPress 체크박스 클릭 이벤트
 */
const Checkbox = ({ customStyles, size, isSelected, onPress }: Props) => {
  const { spacing, radius, colors, borderWidth } = useTheme();
  // styles
  const getCheckboxSize = (): ViewStyle => {
    const sizeMap = {
      small: {
        width: spacing(16),
        height: spacing(16),
        borderRadius: radius(4),
      },
      medium: {
        width: spacing(24),
        height: spacing(24),
        borderRadius: radius(4),
      },
      large: {
        width: spacing(32),
        height: spacing(32),
        borderRadius: radius(4),
      },
    };
    return sizeMap[size];
  };

  const getCheckboxState = (isSelected: boolean): ViewStyle => {
    const stateStyles = {
      selected: {
        backgroundColor: colors("primary", "default"),
        borderColor: colors("primary", "default"),
      },
      unselected: {
        backgroundColor: colors("background"),
        borderColor: colors("gray", 200),
      },
    };
    return isSelected ? stateStyles.selected : stateStyles.unselected;
  };

  const getIconSize = (): number => {
    const sizeMap = {
      small: 12,
      medium: 16,
      large: 20,
    };
    return sizeMap[size];
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      borderWidth: borderWidth(1),
      borderRadius: radius(6),
      ...getCheckboxSize(),
      ...getCheckboxState(isSelected),
      ...(customStyles?.checkboxContainerStyle &&
        customStyles.checkboxContainerStyle),
    },
    icon: {
      width: "100%",
      height: "100%",
      ...(customStyles?.checkboxIconStyle && customStyles.checkboxIconStyle),
    },
  });
  // render
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon
        name="check"
        size={getIconSize()}
        color={colors("primary", "default")}
      />
    </TouchableOpacity>
  );
};

export default Checkbox;
