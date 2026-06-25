import type { Session } from "@supabase/supabase-js";

import {
  getSession as getSessionRepository,
  setSession as setSessionRepository,
  signInWithApple as signInWithAppleRepository,
  signInWithGoogle as signInWithGoogleRepository,
  signInWithIdToken as signInWithIdTokenRepository,
  signInWithKakao as signInWithKakaoRepository,
  signOut as signOutRepository,
  subscribeSessionChange as subscribeSessionChangeRepository,
  updateUser as updateUserRepository,
} from "@repositories/auth";
import { uploadNewAvatar } from "@services/avatar";
import { handleServiceError } from "@utils/errorHandler";

// 세션 조회
export const getSession = async (): Promise<Session | null> => {
  try {
    const { session } = await getSessionRepository();
    return session;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/GET_SESSION",
    });
  }
};

// 세션 설정
export const setSession = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    const { session } = await setSessionRepository({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    return session;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/SET_SESSION",
      context: { accessToken, refreshToken },
    });
  }
};

// 세션 변경 구독
export const subscribeSessionChange = (
  callback: (event: string, session: Session | null) => void,
) => subscribeSessionChangeRepository(callback);

// 카카오 로그인/회원가입
export const signInWithKakao = async ({
  redirectTo,
}: {
  redirectTo: string;
}) => {
  try {
    const data = await signInWithKakaoRepository({ redirectTo });
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/SIGN_IN_WITH_KAKAO",
    });
  }
};

// 구글 로그인/회원가입
export const signInWithGoogle = async () => {
  try {
    const data = await signInWithGoogleRepository();
    await signInWithIdTokenRepository({
      provider: "google",
      token: data.data.idToken,
    });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/SIGN_IN_WITH_GOOGLE",
    });
  }
};

// 애플 로그인/회원가입
export const signInWithApple = async () => {
  try {
    const data = await signInWithAppleRepository();
    if (!data || !data?.identityToken) {
      handleServiceError(new Error("No identityToken."), {
        code: "SERVICE/AUTH/SIGN_IN_WITH_APPLE",
      });
    }
    await signInWithIdTokenRepository({
      provider: "apple",
      token: data.identityToken,
    });
    if (data.fullName) {
      const nameParts = [];
      if (data.fullName.familyName) nameParts.push(data.fullName.familyName);
      if (data.fullName.givenName) nameParts.push(data.fullName.givenName);
      if (nameParts.length > 0) {
        const fullName = nameParts.join("");
        await updateUser({
          metadata: {
            full_name: fullName,
          },
        });
      }
    }
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/SIGN_IN_WITH_APPLE",
    });
  }
};

// 유저 업데이트 - 전달된 필드만 metadata에 저장
export const updateUser = async ({
  metadata,
}: {
  metadata: Record<string, unknown>;
}) => {
  try {
    await updateUserRepository({ metadata });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/UPDATE_USER",
      context: { metadata },
    });
  }
};

// 유저 디스플레이 이름 업데이트
export const updateUserDisplayName = async ({
  displayName,
}: {
  displayName: string | null;
}) => {
  try {
    await updateUserRepository({
      metadata: {
        display_name:
          displayName === "" || displayName === undefined ? null : displayName,
      },
    });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/UPDATE_USER_DISPLAY_NAME",
    });
  }
};

// 유저 이름 업데이트
export const updateUserFullName = async ({
  fullName,
}: {
  fullName: string;
}) => {
  try {
    await updateUserRepository({
      metadata: {
        full_name: fullName === "" || fullName === undefined ? null : fullName,
      },
    });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/UPDATE_USER_FULL_NAME",
    });
  }
};

// 유저 이메일 업데이트
export const updateUserEmail = async ({ email }: { email: string }) => {
  try {
    await updateUserRepository({
      metadata: {
        email: email === "" || email === undefined ? null : email,
      },
    });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/UPDATE_USER_EMAIL",
    });
  }
};

// 유저 전화번호 업데이트
export const updateUserPhoneNumber = async ({
  phoneNumber,
}: {
  phoneNumber: string;
}) => {
  try {
    await updateUserRepository({
      metadata: {
        phone_number:
          phoneNumber === "" || phoneNumber === undefined ? null : phoneNumber,
      },
    });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/UPDATE_USER_PHONE_NUMBER",
    });
  }
};

// 유저 생년월일 업데이트
export const updateUserBirthDate = async ({
  birthDate,
}: {
  birthDate: string;
}) => {
  try {
    await updateUserRepository({
      metadata: {
        birth_date:
          birthDate === "" || birthDate === undefined ? null : birthDate,
      },
    });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/UPDATE_USER_BIRTH_DATE",
    });
  }
};

// 유저 프로필 공개 업데이트
export const updateUserProfilePublic = async ({
  profilePublic,
}: {
  profilePublic: boolean;
}) => {
  try {
    await updateUserRepository({
      metadata: {
        profile_public: profilePublic,
      },
    });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/UPDATE_USER_PROFILE_PUBLIC",
    });
  }
};

// 유저 핀 저장소 공개 업데이트
export const updateUserPinnedStorePublic = async ({
  pinnedStorePublic,
}: {
  pinnedStorePublic: boolean;
}) => {
  try {
    await updateUserRepository({
      metadata: {
        pinned_store_public: pinnedStorePublic,
      },
    });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/UPDATE_USER_PINNED_STORE_PUBLIC",
    });
  }
};

// 유저 아바타 업데이트
export const uploadUserAvatar = async ({
  localFileUri,
}: {
  localFileUri: string;
}) => {
  try {
    const { session } = await getSessionRepository();
    if (!session?.user?.id) {
      handleServiceError(new Error("No session"), {
        code: "SERVICE/AUTH/UPLOAD_USER_AVATAR",
      });
    }
    const newAvatarUrl = await uploadNewAvatar({
      userId: session.user.id,
      fileUri: localFileUri,
    });
    await updateUserRepository({
      metadata: {
        new_avatar_url: newAvatarUrl,
      },
    });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/UPLOAD_USER_AVATAR",
    });
  }
};

// 로그아웃
export const signOut = async () => {
  try {
    const result = await signOutRepository();
    return result;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AUTH/SIGN_OUT",
    });
  }
};
