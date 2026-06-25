import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

import {
  type InitialProps,
  View,
  close,
  openHostApp,
} from "expo-share-extension";

import { flex, gap } from "@theme/styles";

/**
 * iOS 공유 시트 컴포넌트
 * @param url 공유할 링크
 * @param text 공유할 텍스트
 */
export default function ShareExtension({ url, text }: InitialProps) {
  // effects - 공유 링크 열기
  useEffect(() => {
    const link = url?.trim() || text?.trim();
    if (!link) {
      close();
      return;
    }
    try {
      openHostApp(`/?url=${encodeURIComponent(link)}`);
    } catch {
      close();
    }
  }, [url, text]);
  // styles
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#000000",
    },
  });
  // render
  return (
    <View style={[flex.full, flex.center, gap.g8, styles.container]}>
      <Text>{url}</Text>
      <ActivityIndicator size="large" color={"#FFFFFF"} />
    </View>
  );
}
