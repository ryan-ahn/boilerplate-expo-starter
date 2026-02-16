import { create } from "zustand";

import { ButtonConfig, Direction, Variant } from "@components/modal";

interface ModalState {
  isVisible: boolean;
  variant?: Variant;
  direction?: Direction;
  title?: string;
  description?: string;
  primaryButton: ButtonConfig;
  secondaryButton?: ButtonConfig;
  children?: React.ReactNode;
}

interface ModalStore extends ModalState {
  openModal: (config: Omit<ModalState, "isVisible">) => void;
  closeModal: () => void;
  resetModal: () => void;
}

const initialModalState: ModalState = {
  isVisible: false,
  direction: "vertical",
  title: "",
  description: "",
  primaryButton: {
    text: "확인",
    onClickFunction: () => {},
  },
  children: undefined,
};

export const useModalStore = create<ModalStore>(set => ({
  ...initialModalState,
  openModal: config =>
    set({
      isVisible: true,
      variant: config.variant,
      direction: config.direction,
      title: config.title,
      description: config.description,
      primaryButton: config.primaryButton,
      secondaryButton: config.secondaryButton,
      children: config.children,
    }),
  closeModal: () =>
    set({
      isVisible: false,
    }),
  resetModal: () => set(initialModalState),
}));
