import { ViewStyle } from "react-native";

import TouchableScale from "react-native-touchable-scale";

type Props = {
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
  scale?: number;
  children?: React.ReactNode;
  isDisabled?: boolean;
  onPress: () => void;
};

/**
 * 스케일 프레스 컴포넌트
 * @param customStyles 커스텀 스타일
 * @param scale 스케일 값
 * @param children 자식 요소
 * @param isDisabled 비활성화 여부
 * @param onPress 클릭 이벤트
 */
const ScalePress = ({
  customStyles,
  scale = 0.94,
  children,
  isDisabled = false,
  onPress,
}: Props) => {
  const handlePress = (event: { stopPropagation?: () => void }) => {
    event.stopPropagation?.();
    onPress();
  };

  return (
    <TouchableScale
      style={customStyles?.containerStyle && customStyles.containerStyle}
      activeScale={scale}
      defaultScale={1}
      friction={10}
      tension={150}
      disabled={isDisabled}
      onPress={handlePress}>
      {children}
    </TouchableScale>
  );
};

export default ScalePress;
