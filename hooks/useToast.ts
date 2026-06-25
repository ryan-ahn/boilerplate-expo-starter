import { useCallback } from "react";

import { useShallow } from "zustand/react/shallow";

import {
  type ToastState,
  initialToastState,
  useToastStore,
} from "@stores/toast";

export const useToastState = () =>
  useToastStore(
    useShallow(state => ({
      isVisible: state.isVisible,
      variant: state.variant,
      color: state.color,
      text: state.text,
      isButton: state.isButton,
      buttonText: state.buttonText,
      position: state.position,
      duration: state.duration,
      onPress: state.onPress,
      onButtonPress: state.onButtonPress,
    })),
  );

export const useToastActions = () => {
  const { setState } = useToastStore();

  const showToast = useCallback(
    (config: Omit<ToastState, "isVisible">) => {
      setState({
        isVisible: true,
        variant: config.variant,
        color: config.color,
        text: config.text,
        isButton: config.isButton,
        buttonText: config.buttonText,
        position: config.position,
        duration: config.duration,
        onPress: config.onPress,
        onButtonPress: config.onButtonPress,
      });
    },
    [setState],
  );

  const clearToast = useCallback(() => {
    setState({ isVisible: false });
  }, [setState]);

  const resetToast = useCallback(() => {
    setState(initialToastState);
  }, [setState]);

  return {
    showToast,
    clearToast,
    resetToast,
  };
};

export const useToast = () => {
  const state = useToastState();
  const actions = useToastActions();
  return {
    ...state,
    ...actions,
  };
};
