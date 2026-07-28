import { useShallow } from "zustand/react/shallow";

import { useEditStore } from "@stores/edit";

export const useEditProfileState = () =>
  useEditStore(
    useShallow(state => ({
      displayName: state.displayName,
      userName: state.userName,
      email: state.email,
      phoneNumber: state.phoneNumber,
      birthDate: state.birthDate,
      errorMessage: state.errorMessage,
      isProfileShared: state.isProfileShared,
      isPlaceShared: state.isPlaceShared,
    })),
  );

export const useEditProfileActions = () =>
  useEditStore(
    useShallow(state => ({
      setEditProfileState: state.setEditProfileState,
      resetEditProfileState: state.resetEditProfileState,
      resetErrorMessage: state.resetErrorMessage,
    })),
  );

export function useEditProfile() {
  const state = useEditProfileState();
  const actions = useEditProfileActions();
  return {
    ...state,
    ...actions,
  };
}
