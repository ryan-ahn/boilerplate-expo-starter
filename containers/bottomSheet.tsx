import { useCallback } from "react";

import BottomSheet from "@components/bottomSheet";
import { useBottomSheet } from "@hooks/useBottomSheet";

const BottomSheetContainer = () => {
  const {
    isVisible,
    type,
    currentIndex,
    snapPoints,
    enablePanDownToClose,
    children,
    setBottomSheetState,
    closeBottomSheet,
    resetBottomSheet,
  } = useBottomSheet();

  const handleSheetChange = useCallback(
    (index: number) => {
      setBottomSheetState({
        currentIndex: index,
      });
    },
    [setBottomSheetState],
  );

  const handleDismiss = () => {
    closeBottomSheet();
    resetBottomSheet();
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      type={type}
      index={currentIndex}
      snapPoints={snapPoints}
      enablePanDownToClose={enablePanDownToClose}
      onChange={handleSheetChange}
      onDismiss={handleDismiss}>
      {children}
    </BottomSheet>
  );
};

export default BottomSheetContainer;
