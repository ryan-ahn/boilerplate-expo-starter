import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import ModalContainer from "@containers/modal";
import SupabaseContainer from "@containers/supabase";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <SupabaseContainer>
      <ThemeProvider value={DefaultTheme}>
        <ModalContainer />
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SupabaseContainer>
  );
}
