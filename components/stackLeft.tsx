import Icon from "@components/icon";
import ScalePress from "@components/scalePress";
import { useRouter } from "@hooks/useRouter";
import { useTheme } from "@hooks/useTheme";
import { flex, liquid } from "@theme/styles";

type Props = {
  color?: string;
  onBeforeBack?: () => void | Promise<void>;
};

/**
 * 스택 왼쪽 뒤로가기 컴포넌트
 * @param color 색상
 * @param onBeforeBack 뒤로가기 전 실행 함수
 */
const StackLeft = ({ color, onBeforeBack }: Props) => {
  // hooks
  const { goBack } = useRouter();
  const { colors } = useTheme();
  // handlers
  const handleClosePress = async () => {
    await onBeforeBack?.();
    goBack();
  };
  // render
  return (
    <ScalePress
      customStyles={{
        containerStyle: [flex.center, liquid.hitArea],
      }}
      onPress={handleClosePress}>
      <Icon
        name="chevron-left"
        size={20}
        color={color || colors("gray", 900)}
      />
    </ScalePress>
  );
};

export default StackLeft;
