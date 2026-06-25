import { create } from "zustand";

import { type ButtonConfig, type Direction } from "@components/modal";

export type ModalState = {
  isVisible: boolean;
  direction?: Direction;
  title?: string;
  description?: string;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
  children?: React.ReactNode;
  preventBackdropClose?: boolean;
};

export const initialModalState: ModalState = {
  isVisible: false,
  direction: "vertical",
  title: "타이틀",
  description: "설명",
  children: undefined,
  preventBackdropClose: false,
};

export type ModalStore = ModalState & {
  setState: (state: Partial<ModalState>) => void;
  resetModalState: () => void;
};

export const useModalStore = create<ModalStore>(set => ({
  ...initialModalState,
  setState: state => set(state),
  resetModalState: () => set(initialModalState),
}));
