import { useEffect } from "react";

import Toast from "@components/toast";
import { useToast } from "@hooks/useToast";

const ToastContainer = () => {
  const {
    isVisible,
    variant,
    color,
    text,
    isButton,
    buttonText,
    position,
    duration,
    onPress,
    onButtonPress,
    clearToast,
  } = useToast();

  useEffect(() => {
    if (!isVisible || !text) return;
    Toast({
      variant,
      color,
      text,
      isButton,
      buttonText,
      position,
      duration,
      onPress,
      onButtonPress,
    });
    clearToast();
  }, [
    isVisible,
    text,
    variant,
    color,
    isButton,
    buttonText,
    position,
    duration,
  ]);
  return null;
};

export default ToastContainer;
