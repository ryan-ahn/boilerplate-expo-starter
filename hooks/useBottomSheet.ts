import { useCallback } from "react";

import { useShallow } from "zustand/react/shallow";

import {
  type BottomSheetState,
  useBottomSheetStore,
} from "@stores/bottomSheet";

export const useBottomSheetState = () =>
  useBottomSheetStore(
    useShallow(state => ({
      isVisible: state.isVisible,
      type: state.type,
      currentIndex: state.currentIndex,
      snapPoints: state.snapPoints,
      enablePanDownToClose: state.enablePanDownToClose,
      children: state.children,
    })),
  );

export const useBottomSheetChromeState = () =>
  useBottomSheetStore(
    useShallow(state => ({
      isVisible: state.isVisible,
      type: state.type,
      currentIndex: state.currentIndex,
      snapPoints: state.snapPoints,
      enablePanDownToClose: state.enablePanDownToClose,
    })),
  );

export const useBottomSheetActions = () => {
  const baseActions = useBottomSheetStore(
    useShallow(store => ({
      setBottomSheetState: store.setBottomSheetState,
      resetBottomSheetState: store.resetBottomSheetState,
    })),
  );

  const openBottomSheet = useCallback(
    (config: Partial<Omit<BottomSheetState, "isVisible">>) => {
      const state = useBottomSheetStore.getState();
      const nextType = config.type ?? state.type;
      const typeChanged =
        config.type !== undefined && config.type !== state.type;
      baseActions.setBottomSheetState({
        isVisible: true,
        type: nextType,
        currentIndex:
          config.currentIndex ?? (typeChanged ? 1 : state.currentIndex),
        snapPoints: config.snapPoints ?? state.snapPoints,
        enablePanDownToClose:
          config.enablePanDownToClose ?? state.enablePanDownToClose,
        children: config.children ?? state.children,
      });
    },
    [baseActions],
  );

  const setBottomSheetState = useCallback(
    (config: Partial<Omit<BottomSheetState, "isVisible">>) => {
      baseActions.setBottomSheetState(config);
    },
    [baseActions],
  );

  const closeBottomSheet = useCallback(() => {
    baseActions.setBottomSheetState({ isVisible: false });
  }, [baseActions]);

  const resetBottomSheet = useCallback(() => {
    baseActions.resetBottomSheetState();
  }, [baseActions]);

  return {
    setBottomSheetState,
    openBottomSheet,
    closeBottomSheet,
    resetBottomSheet,
  };
};

export const useBottomSheet = () => {
  const state = useBottomSheetState();
  const actions = useBottomSheetActions();
  return {
    ...state,
    ...actions,
  };
};
