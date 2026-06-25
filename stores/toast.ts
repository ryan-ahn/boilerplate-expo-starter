import { Position } from "react-native-flash-message";
import { create } from "zustand";

import { type Color, type Variant } from "@components/toast";

export interface ToastState {
  isVisible: boolean;
  variant?: Variant;
  color?: Color;
  text: string;
  isButton?: boolean;
  buttonText?: string;
  position?: Position;
  duration?: number;
  onPress?: () => void;
  onButtonPress?: () => void;
}

export const initialToastState: ToastState = {
  isVisible: false,
  variant: "default",
  color: "black",
  text: "설명",
  isButton: false,
  buttonText: "확인",
  position: "bottom",
  duration: 3000,
  onPress: () => {},
  onButtonPress: () => {},
};

interface ToastStore extends ToastState {
  setState: (state: Partial<ToastState>) => void;
}

export const useToastStore = create<ToastStore>(set => ({
  ...initialToastState,
  setState: state => set(state),
}));
