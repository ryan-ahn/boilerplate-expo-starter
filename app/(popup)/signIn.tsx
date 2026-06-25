import React, { useMemo, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";

import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { Route, Stack, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "@components/icon";
import Pressable from "@components/pressable";
import ScalePress from "@components/scalePress";
import Text from "@components/text";
import { useRouter } from "@hooks/useRouter";
import { useTheme } from "@hooks/useTheme";
import { useToastActions } from "@hooks/useToast";
import {
  setSession,
  signInWithApple,
  signInWithGoogle,
  signInWithKakao,
} from "@services/auth";
import { flex, gap, liquid, screen } from "@theme/styles";
import { getDisplayMessage } from "@utils/errorHandler";

const TERMS_OF_SERVICE_URL =
  "https://vibin.notion.site/38a2eaedbc8e807f916bfac9cd417397";
const PRIVACY_POLICY_URL =
  "https://vibin.notion.site/38a2eaedbc8e80d58be4fce76d157930";

type Props = {
  redirect?: Route;
};

/**
 * ===============================
 * 로그인 스크린
 * @param redirect 로그인 후 리다이렉트 할 경로
 * ===============================
 */
const SignInScreen = () => {
  // hooks
  const { redirect } = useLocalSearchParams<Props>();
  const { top, bottom } = useSafeAreaInsets();
  const { spacing, colors } = useTheme();
  // styles
  const styles = StyleSheet.create({
    wrapper: {
      paddingTop: top,
      paddingBottom: bottom,
      backgroundColor: colors("background"),
    },
    contentContainer: {
      paddingTop: spacing(20),
      paddingBottom: spacing(80),
      paddingHorizontal: spacing(16),
    },
  });
  // render
  return (
    <View style={[screen.container, styles.wrapper]}>
      <View
        style={[screen.content, flex.center, styles.contentContainer, gap.g48]}>
        <TitleSection />
        <ButtonSection redirect={redirect} />
      </View>
      <DescriptionSection />
    </View>
  );
};

/** section */
const TitleSection = () => {
  // hooks
  const { colors, spacing } = useTheme();
  // styles
  const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: spacing(16),
    },
    logoImage: {
      width: spacing(56),
      height: spacing(56),
    },
  });
  return (
    <View style={[flex.center, styles.wrapper]}>
      <View style={[gap.g8]}>
        <View style={[gap.g4]}>
          <View style={[flex.row, flex.startCenter, gap.g2]}>
            <Image
              source={require("@assets/images/logo.png")}
              style={styles.logoImage}
            />
            <Text
              variant="heading-1"
              color={colors("foreground")}>{`Vibin`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ButtonSection = ({ redirect }: { redirect?: Route }) => {
  // hooks
  const { goBack, replaceTo } = useRouter();
  const { showToast } = useToastActions();
  const { spacing } = useTheme();
  // state
  const [authLoading, setAuthLoading] = useState(false);
  // handler
  const handleKakaoSignIn = async () => {
    setAuthLoading(true);
    try {
      const redirectUrl = Linking.createURL("signIn");
      const data = await signInWithKakao({ redirectTo: redirectUrl });
      const authUrl = data?.url;
      if (!authUrl) {
        setAuthLoading(false);
        showToast({
          text: "로그인을 시작하는 중 문제가 발생했어요.",
          variant: "error",
        });
        return;
      }
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUrl,
      );
      if (result.type === "cancel") {
        setAuthLoading(false);
        showToast({
          text: "로그인을 취소했어요.",
          variant: "info",
        });
        return;
      }
      if (result.type === "success" && result.url) {
        const params = getHashParams(result.url);
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const error = params.get("error");
        const errorCode = params.get("error_code");
        if (error && errorCode === "unexpected_failure") {
          setAuthLoading(false);
          showToast({
            text: "잦은 요청으로 인해 로그인에 실패했어요. 잠시 후 다시 시도해주세요.",
            variant: "error",
          });
          return;
        }
        if (error) {
          setAuthLoading(false);
          showToast({
            text: "로그인에 실패했어요. 잠시 후 다시 시도해주세요.",
            variant: "error",
          });
          return;
        }
        if (accessToken && refreshToken) {
          const session = await setSession({
            accessToken,
            refreshToken,
          });
          if (session) {
            setAuthLoading(false);
            if (redirect) {
              replaceTo(redirect);
            } else {
              goBack();
            }
          }
        }
      }
    } catch (e) {
      showToast({
        text: getDisplayMessage(e),
        variant: "error",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    try {
      await signInWithGoogle();
      goBack();
    } catch (error) {
      showToast({
        text: getDisplayMessage(error),
        variant: "error",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setAuthLoading(true);
    try {
      await signInWithApple();
      goBack();
    } catch (error) {
      showToast({
        text: getDisplayMessage(error),
        variant: "error",
      });
    } finally {
      setAuthLoading(false);
    }
  };
  // styles
  const styles = StyleSheet.create({
    wrapper: {
      gap: spacing(8),
      width: "80%",
    },
  });
  // options
  const stackScreenOptions = useMemo(
    () => ({
      headerRight: () => <HeaderRight />,
    }),
    [],
  );
  // render
  return (
    <>
      <Stack.Screen options={stackScreenOptions} />
      <View style={[flex.column, styles.wrapper, gap.g32]}>
        <View style={[gap.g10]}>
          <KakaoSignInButton
            isLoading={authLoading}
            handleKakaoSignIn={handleKakaoSignIn}
          />
          <GoogleSignInButton
            isLoading={authLoading}
            handleGoogleSignIn={handleGoogleSignIn}
          />
          {Platform.OS === "ios" && (
            <AppleSignInButton
              isLoading={authLoading}
              handleAppleSignIn={handleAppleSignIn}
            />
          )}
        </View>
        <TextButton />
      </View>
    </>
  );
};

const DescriptionSection = () => {
  // hooks
  const { colors, spacing } = useTheme();
  // styles
  const styles = StyleSheet.create({
    wrapper: {
      paddingVertical: spacing(12),
      paddingHorizontal: spacing(16),
    },
  });
  return (
    <View style={[flex.center, styles.wrapper]}>
      <Text variant="body-3" color={colors("gray", 400)}>
        로그인에 문제가 있으신가요?
      </Text>
      <Text variant="body-3" color={colors("gray", 400)}>
        noonu.help@gmail.com으로 문의해주세요.
      </Text>
    </View>
  );
};

/* inner component */
const KakaoSignInButton = ({
  isLoading,
  handleKakaoSignIn,
}: {
  isLoading: boolean;
  handleKakaoSignIn: () => Promise<void>;
}) => {
  // hooks
  const { spacing, colors, borderWidth, radius } = useTheme();
  // styles
  const styles = StyleSheet.create({
    wrapper: {
      paddingVertical: spacing(12),
      paddingHorizontal: spacing(16),
      borderRadius: radius(9999),
      borderWidth: borderWidth(1),
      borderColor: colors("kakao"),
      backgroundColor: colors("kakao"),
    },
    contentContainer: {
      height: spacing(24),
    },
  });
  // render
  return (
    <ScalePress
      customStyles={{ containerStyle: styles.wrapper }}
      onPress={handleKakaoSignIn}
      isDisabled={isLoading}>
      {isLoading && (
        <View style={[flex.center, styles.contentContainer]}>
          <ActivityIndicator
            size="small"
            color={colors("foreground", "default", "static")}
          />
        </View>
      )}
      {!isLoading && (
        <View style={[flex.row, flex.center, gap.g8, styles.contentContainer]}>
          <Icon
            name="kakao-logo"
            size="xsmall"
            color={colors("foreground", "default", "static")}
          />
          <Text
            variant="body-1"
            weight={500}
            color={colors("foreground", "default", "static")}>
            Kakao로 시작하기
          </Text>
        </View>
      )}
    </ScalePress>
  );
};

const GoogleSignInButton = ({
  isLoading,
  handleGoogleSignIn,
}: {
  isLoading: boolean;
  handleGoogleSignIn: () => Promise<void>;
}) => {
  // hooks
  const { spacing, colors, borderWidth, radius } = useTheme();
  // sty
  const styles = StyleSheet.create({
    wrapper: {
      paddingVertical: spacing(12),
      paddingHorizontal: spacing(16),
      borderRadius: radius(9999),
      borderWidth: borderWidth(1),
      borderColor: colors("gray", 300),
      backgroundColor: colors("background", "default", "static"),
    },
    contentContainer: {
      height: spacing(24),
    },
  });
  // render
  return (
    <ScalePress
      customStyles={{ containerStyle: styles.wrapper }}
      onPress={handleGoogleSignIn}
      isDisabled={isLoading}>
      {isLoading && (
        <View style={[flex.center, styles.contentContainer]}>
          <ActivityIndicator
            size="small"
            color={colors("foreground", "default", "static")}
          />
        </View>
      )}
      {!isLoading && (
        <View style={[flex.row, flex.center, gap.g8, styles.contentContainer]}>
          <Icon
            name="google-logo"
            size="xsmall"
            color={colors("background", "default", "static")}
          />
          <Text
            variant="body-1"
            weight={500}
            color={colors("foreground", "default", "static")}>
            Google로 시작하기
          </Text>
        </View>
      )}
    </ScalePress>
  );
};

const AppleSignInButton = ({
  isLoading,
  handleAppleSignIn,
}: {
  isLoading: boolean;
  handleAppleSignIn: () => Promise<void>;
}) => {
  // hooks
  const { spacing, colors, borderWidth, radius } = useTheme();
  // styles
  const styles = StyleSheet.create({
    wrapper: {
      paddingVertical: spacing(12),
      paddingHorizontal: spacing(16),
      borderRadius: radius(9999),
      borderWidth: borderWidth(0.5),
      borderColor: colors("gray", 300),
      backgroundColor: colors("foreground", "default", "static"),
    },
    contentContainer: {
      height: spacing(24),
    },
  });
  // render
  return (
    <ScalePress
      customStyles={{ containerStyle: styles.wrapper }}
      onPress={handleAppleSignIn}
      isDisabled={isLoading}>
      {isLoading && (
        <View style={[flex.center, styles.contentContainer]}>
          <ActivityIndicator
            size="small"
            color={colors("background", "default", "static")}
          />
        </View>
      )}
      {!isLoading && (
        <View style={[flex.row, flex.center, gap.g8, styles.contentContainer]}>
          <Icon
            name="apple-logo"
            size="xsmall"
            color={colors("background", "default", "static")}
          />
          <Text
            variant="body-1"
            weight={500}
            color={colors("background", "default", "static")}>
            Apple로 시작하기
          </Text>
        </View>
      )}
    </ScalePress>
  );
};

const TextButton = () => {
  // hooks
  const { colors } = useTheme();
  // render
  return (
    <View style={[flex.row, flex.center, gap.g12]}>
      <Pressable
        customStyles={{ containerStyle: [flex.center] }}
        onPress={() => WebBrowser.openBrowserAsync(TERMS_OF_SERVICE_URL)}>
        <Text
          customStyles={{ textStyle: { textDecorationLine: "underline" } }}
          variant="body-3"
          color={colors("gray", 500)}>
          서비스 이용약관
        </Text>
      </Pressable>
      <Pressable
        customStyles={{ containerStyle: [flex.center] }}
        onPress={() => WebBrowser.openBrowserAsync(PRIVACY_POLICY_URL)}>
        <Text
          customStyles={{ textStyle: { textDecorationLine: "underline" } }}
          variant="body-3"
          color={colors("gray", 500)}>
          개인정보 처리방침
        </Text>
      </Pressable>
    </View>
  );
};

/* utils */
const getHashParams = (url: string) => {
  const fragment = url.split("#")[1] ?? "";
  return new URLSearchParams(fragment);
};

/* options */
const HeaderRight = () => {
  // hooks
  const { goBack } = useRouter();
  // render
  return (
    <ScalePress
      customStyles={{
        containerStyle: [flex.center, liquid.hitArea],
      }}
      onPress={goBack}>
      <Icon name="close" size="small" />
    </ScalePress>
  );
};

export default SignInScreen;
