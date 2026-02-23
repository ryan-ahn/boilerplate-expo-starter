import Modal from "@components/modal";
import { useModalStore } from "@stores/modal";

const ModalContainer = () => {
  const {
    isVisible,
    variant,
    direction,
    title,
    description,
    children,
    primaryButton,
    secondaryButton,
    closeModal,
    resetModal,
  } = useModalStore();

  const handlePrimaryButtonPress = () => {
    closeModal();
    if (primaryButton.onClickFunction) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          primaryButton.onClickFunction();
        });
      });
    }
  };

  const handleSecondaryButtonPress = () => {
    closeModal();
    if (secondaryButton?.onClickFunction) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          secondaryButton.onClickFunction();
        });
      });
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      variant={variant}
      direction={direction}
      title={title}
      description={description}
      onBackdropPress={closeModal}
      onModalHide={resetModal}
      primaryButton={{
        text: primaryButton.text,
        onClickFunction: handlePrimaryButtonPress,
      }}
      secondaryButton={
        secondaryButton
          ? {
              text: secondaryButton.text,
              onClickFunction: handleSecondaryButtonPress,
            }
          : undefined
      }>
      {children}
    </Modal>
  );
};

export default ModalContainer;
