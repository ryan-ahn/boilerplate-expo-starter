import { useCallback } from "react";

import { useShallow } from "zustand/react/shallow";

import { type ModalState, useModalStore } from "@stores/modal";

export const useModalState = () =>
  useModalStore(
    useShallow(state => ({
      isVisible: state.isVisible,
      direction: state.direction,
      title: state.title,
      description: state.description,
      children: state.children,
      primaryButton: state.primaryButton,
      secondaryButton: state.secondaryButton,
      preventBackdropClose: state.preventBackdropClose,
    })),
  );

export const useModalActions = () => {
  const actions = useModalStore(
    useShallow(state => ({
      setState: state.setState,
      resetModalState: state.resetModalState,
    })),
  );
  const openModal = useCallback(
    (config: Omit<ModalState, "isVisible">) => {
      actions.setState({
        isVisible: true,
        direction: config.direction,
        title: config.title,
        description: config.description,
        primaryButton: config.primaryButton,
        secondaryButton: config.secondaryButton,
        children: config.children,
        preventBackdropClose: config.preventBackdropClose,
      });
    },
    [actions],
  );

  const closeModal = useCallback(() => {
    actions.setState({ isVisible: false });
  }, [actions]);

  const resetModal = useCallback(() => {
    actions.resetModalState();
  }, [actions]);
  return {
    ...actions,
    openModal,
    closeModal,
    resetModal,
  };
};

export const useModal = () => {
  const state = useModalState();
  const { openModal, closeModal, resetModal } = useModalActions();
  return {
    ...state,
    openModal,
    closeModal,
    resetModal,
  };
};
