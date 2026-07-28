import { Route, useRouter as useExpoRouter } from "expo-router";

import {
  Mode as EditProfileMode,
  Variant as EditProfileVariant,
} from "@app/(stack)/editProfile";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { useModal } from "@hooks/useModal";

export const useRouter = () => {
  // hooks
  const router = useExpoRouter();
  const { closeModal, resetModal } = useModal();
  const { closeBottomSheet, resetBottomSheet } = useBottomSheet();
  // helpers
  const resetOverlays = () => {
    closeModal();
    resetModal();
    closeBottomSheet();
    resetBottomSheet();
  };

  const pushTo = (pathname: Route) => {
    resetOverlays();
    router.push({ pathname });
  };

  const replaceTo = (pathname: Route) => {
    resetOverlays();
    router.replace({ pathname });
  };

  const pushToHome = () => {
    resetOverlays();
    router.push({ pathname: "/" });
  };

  const replaceToHome = () => {
    resetOverlays();
    router.replace({ pathname: "/" });
  };

  const navigateToHome = () => {
    resetOverlays();
    router.navigate("/" as Route);
  };

  const pushToSignIn = (redirect?: Route) => {
    resetOverlays();
    router.push({
      pathname: "/signIn",
      params: redirect ? { redirect } : undefined,
    });
  };

  const pushToSettings = () => {
    resetOverlays();
    router.push({ pathname: "/settings" });
  };

  const pushToEditProfile = (
    mode: EditProfileMode,
    variant: EditProfileVariant,
  ) => {
    resetOverlays();
    router.push({
      pathname: "/editProfile",
      params: { mode, variant },
    });
  };

  const goBack = () => {
    resetOverlays();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: "/" });
    }
  };
  // return
  return {
    pushTo,
    replaceTo,
    pushToHome,
    replaceToHome,
    navigateToHome,
    pushToSignIn,
    pushToSettings,
    pushToEditProfile,
    goBack,
  };
};
