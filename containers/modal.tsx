import React, { useCallback, useMemo } from "react";

import Modal from "@components/modal";
import { useModal } from "@hooks/useModal";
import { useModalStore } from "@stores/modal";

const ModalContainer = React.memo(function ModalContainer() {
  const {
    isVisible,
    direction,
    title,
    description,
    children,
    primaryButton,
    secondaryButton,
    preventBackdropClose,
    closeModal,
  } = useModal();

  const handlePrimaryButtonPress = useCallback(() => {
    const fn = useModalStore.getState().primaryButton?.onClickFunction;
    closeModal();
    fn?.();
  }, [closeModal]);

  const handleSecondaryButtonPress = useCallback(() => {
    const fn = useModalStore.getState().secondaryButton?.onClickFunction;
    closeModal();
    fn?.();
  }, [closeModal]);

  const handleBackdropPress = useCallback(() => {
    if (preventBackdropClose) return;
    closeModal();
  }, [closeModal, preventBackdropClose]);

  const primaryForModal = useMemo(
    () =>
      primaryButton
        ? {
            text: primaryButton.text,
            onClickFunction: handlePrimaryButtonPress,
          }
        : undefined,
    [primaryButton?.text, handlePrimaryButtonPress],
  );

  const secondaryForModal = useMemo(
    () =>
      secondaryButton
        ? {
            text: secondaryButton.text,
            onClickFunction: handleSecondaryButtonPress,
          }
        : undefined,
    [secondaryButton?.text, handleSecondaryButtonPress],
  );

  return (
    <Modal
      isVisible={isVisible}
      direction={direction}
      title={title}
      description={description}
      onBackdropPress={handleBackdropPress}
      primaryButton={primaryForModal}
      secondaryButton={secondaryForModal}>
      {children}
    </Modal>
  );
});

export default ModalContainer;
