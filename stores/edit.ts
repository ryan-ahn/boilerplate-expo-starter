import { create } from "zustand";

type EditProfileState = {
  displayName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  errorMessage: string;
  isProfileShared: boolean;
  isPlaceShared: boolean;
};

const initialEditProfileState: EditProfileState = {
  displayName: "",
  userName: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  errorMessage: "",
  isProfileShared: false,
  isPlaceShared: false,
};

type EditProfileStore = EditProfileState & {
  setEditProfileState: (state: Partial<EditProfileState>) => void;
  resetEditProfileState: () => void;
  resetErrorMessage: () => void;
};

export const useEditStore = create<EditProfileStore>(set => ({
  ...initialEditProfileState,
  setEditProfileState: state => set(state),
  resetEditProfileState: () => set(initialEditProfileState),
  resetErrorMessage: () => set({ errorMessage: "" }),
}));
