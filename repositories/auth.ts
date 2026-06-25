import { GoogleSignin } from "@react-native-google-signin/google-signin";
import type { Session } from "@supabase/supabase-js";
import * as AppleAuthentication from "expo-apple-authentication";

import { createRepoError } from "@utils/errorHandler";
import { supabase } from "@utils/supabaseClient";

// 세션 조회
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw createRepoError({
      code: "REPO/AUTH/GET_SESSION",
      cause: error,
    });
  }
  return data;
};

// 세션 설정
export const setSession = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  if (error) {
    throw createRepoError({
      code: "REPO/AUTH/SET_SESSION",
      cause: error,
    });
  }
  return data;
};

// 세션 변경 구독
export const subscribeSessionChange = (
  callback: (event: string, session: Session | null) => void,
) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return subscription;
};

// 토큰 로그인
export const signInWithIdToken = async ({
  provider,
  token,
}: {
  provider: string;
  token: string;
}) => {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider,
    token,
  });
  if (error) {
    throw createRepoError({
      code: "REPO/AUTH/SIGN_IN_WITH_ID_TOKEN",
      cause: error,
    });
  }
  return data;
};

// 카카오 로그인/회원가입
export const signInWithKakao = async ({
  redirectTo,
}: {
  redirectTo: string;
}) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo,
    },
  });
  if (error) {
    throw createRepoError({
      code: "REPO/AUTH/SIGN_IN_WITH_KAKAO",
      cause: error,
    });
  }
  return data;
};

// 구글 로그인/회원가입
export const signInWithGoogle = async () => {
  try {
    const hasPlayServices = await GoogleSignin.hasPlayServices();
    if (!hasPlayServices) {
      throw createRepoError({
        code: "REPO/AUTH/SIGN_IN_WITH_GOOGLE",
        cause: new Error("Play google services not available"),
      });
    }
    const data = await GoogleSignin.signIn();
    if (!data || !data?.data || !data?.data?.idToken) {
      throw createRepoError({
        code: "REPO/AUTH/SIGN_IN_WITH_GOOGLE",
        cause: new Error("Google sign in failed"),
      });
    }
    return data;
  } catch (error) {
    if (error.message.includes("failed")) {
      throw createRepoError({
        code: "REPO/AUTH/SIGN_IN_WITH_GOOGLE/FAILED",
        cause: error,
      });
    }
    throw createRepoError({
      code: "REPO/AUTH/SIGN_IN_WITH_GOOGLE",
      cause: error,
    });
  }
};

// 애플 로그인/회원가입
export const signInWithApple = async () => {
  try {
    const data = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    return data;
  } catch (error) {
    if (error.message.includes("canceled")) {
      throw createRepoError({
        code: "REPO/AUTH/SIGN_IN_WITH_APPLE/CANCELED",
        cause: error,
      });
    }
    throw createRepoError({
      code: "REPO/AUTH/SIGN_IN_WITH_APPLE",
      cause: error,
    });
  }
};

// 유저 업데이트
export const updateUser = async ({
  metadata,
}: {
  metadata: Record<string, unknown>;
}) => {
  const data = Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== undefined),
  );
  const { error } = await supabase.auth.updateUser({
    data,
  });
  if (error) {
    throw createRepoError({
      code: "REPO/AUTH/UPDATE_USER",
      cause: error,
    });
  }
};

// 로그아웃
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw createRepoError({
      code: "REPO/AUTH/SIGN_OUT",
      cause: error,
    });
  }
};
