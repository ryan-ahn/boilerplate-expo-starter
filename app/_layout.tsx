import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BottomSheetContainer from "@containers/bottomSheet";
import ModalContainer from "@containers/modal";
import QueryClientContainer from "@containers/queryClient";
import ToastContainer from "@containers/toast";
import { useTheme } from "@hooks/useTheme";
import { AppProvider } from "@providers/app";
import { AuthProvider } from "@providers/auth";

export const unstable_settings = {
  anchor: "(tabs)",
};

/**
 * 루트 레이아웃
 */
const RootLayout = () => {
  // hooks
  const { colors, unit } = useTheme();
  // options
  const defaultHeaderStyle = {
    headerStyle: {
      backgroundColor: colors("background"),
    },
    headerTitleStyle: {
      fontSize: unit(18),
      color: colors("foreground"),
    },
    headerTintColor: colors("foreground"),
  };
  // render
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DefaultTheme}>
        <QueryClientContainer>
          <AppProvider>
            <AuthProvider>
              <BottomSheetModalProvider>
                <StatusBar style="auto" />
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(popup)/signIn"
                    options={{
                      ...defaultHeaderStyle,
                      ...defaultPopupOptions,
                    }}
                  />
                  <Stack.Screen
                    name="(stack)/editProfile"
                    options={{
                      ...defaultHeaderStyle,
                      ...defaultStackOptions,
                    }}
                  />
                  <Stack.Screen
                    name="(stack)/settings"
                    options={{
                      ...defaultHeaderStyle,
                      ...defaultStackOptions,
                    }}
                  />
                </Stack>
                <BottomSheetContainer />
                <ModalContainer />
                <ToastContainer />
                <FlashMessage position="top" style={{ zIndex: 9999 }} />
              </BottomSheetModalProvider>
            </AuthProvider>
          </AppProvider>
        </QueryClientContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

/** options */
const defaultOptions = {
  headerTitle: "",
  headerShadowVisible: false,
};

const defaultPopupOptions = {
  ...defaultOptions,
  presentation: "modal" as const,
  animation: "slide_from_bottom" as const,
};

const defaultStackOptions = {
  ...defaultOptions,
  presentation: "card" as const,
  animation: "default" as const,
};

export default RootLayout;
