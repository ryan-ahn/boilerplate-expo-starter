import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useBottomSheet } from "@hooks/useBottomSheet";
import { useTheme } from "@hooks/useTheme";
import { BottomSheetType } from "@stores/bottomSheet";

type Props = {
  isVisible: boolean;
  type: BottomSheetType;
  index: number;
  snapPoints?: (string | number)[];
  enablePanDownToClose?: boolean;
  children?: React.ReactNode;
  onChange?: (index: number) => void;
  onDismiss?: () => void;
};

/**
 * 바텀 시트 컴포넌트
 * @param isVisible
 * @param index
 * @param snapPoints
 * @param enablePanDownToClose
 * @param children
 * @param onChange
 * @param onDismiss
 */
const BottomSheet = ({
  isVisible,
  type,
  index,
  snapPoints,
  enablePanDownToClose,
  children,
  onChange,
  onDismiss,
}: Props) => {
  // hooks
  const { colors, radius, spacing, unit, decimal } = useTheme();
  const { currentIndex } = useBottomSheet();
  // refs
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const isFullWidth = currentIndex === 2;
  // effects
  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isVisible]);
  // styles
  const getIndicatorStyle = () => {
    const widthMap = {
      true: { width: 0 },
      false: { width: spacing(40) },
    };
    return widthMap[isFullWidth ? "true" : "false"];
  };

  const styles = StyleSheet.create({
    container: {
      borderTopLeftRadius: radius(20),
      borderTopRightRadius: radius(20),
      backgroundColor: colors("gray", 50),
      shadowColor: colors("gray", 800, "static"),
      shadowOffset: { width: unit(0), height: unit(2) },
      shadowOpacity: decimal(0.12),
      shadowRadius: radius(12),
    },
    basicIndicator: {
      width: spacing(40),
      backgroundColor: colors("gray", 400),
    },
    hideIndicator: {
      ...getIndicatorStyle(),
      backgroundColor: colors("gray", 400),
    },
  });
  // render
  if (!isVisible && !children) {
    return null;
  }

  if (type === "searchResults" || type === "selectPin") {
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backgroundStyle={styles.container}
        handleIndicatorStyle={styles.basicIndicator}
        snapPoints={snapPoints}
        index={index}
        enablePanDownToClose={enablePanDownToClose}
        enableContentPanningGesture={false}
        activeOffsetY={[-20, 20]}
        enableDynamicSizing={false}
        onChange={onChange}
        onDismiss={onDismiss}>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backgroundStyle={styles.container}
      handleIndicatorStyle={styles.hideIndicator}
      snapPoints={snapPoints}
      index={index}
      enablePanDownToClose={enablePanDownToClose}
      activeOffsetY={[-20, 20]}
      enableDynamicSizing={false}
      onChange={onChange}
      onDismiss={onDismiss}>
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheet;
