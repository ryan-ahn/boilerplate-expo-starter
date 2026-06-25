import { create } from "zustand";

export type BottomSheetType =
  | "pinnedPlace"
  | "searchResult"
  | "searchResults"
  | "selectPin"
  | "sharedLink"
  | "default";

export type BottomSheetState = {
  isVisible: boolean;
  type: BottomSheetType;
  currentIndex: number;
  snapPoints?: (string | number)[];
  enablePanDownToClose?: boolean;
  children?: React.ReactNode;
};

export const initialBottomSheetState: BottomSheetState = {
  isVisible: false,
  type: "default",
  currentIndex: 0,
  snapPoints: [135, 319],
  enablePanDownToClose: true,
  children: undefined,
};

export type BottomSheetStore = BottomSheetState & {
  setBottomSheetState: (state: Partial<BottomSheetState>) => void;
  resetBottomSheetState: () => void;
};

export const useBottomSheetStore = create<BottomSheetStore>(set => ({
  ...initialBottomSheetState,
  setBottomSheetState: (state: Partial<BottomSheetState>) => set(state),
  resetBottomSheetState: () => set(initialBottomSheetState),
}));
