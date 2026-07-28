import { useMutation } from "@tanstack/react-query";

import {
  updateUserBirthDate,
  updateUserDisplayName,
  updateUserEmail,
  updateUserFullName,
  updateUserPhoneNumber,
  updateUserPinnedStorePublic,
  updateUserProfilePublic,
  uploadUserAvatar,
} from "@services/auth";

// mutations - 사용자 닉네임 수정
export const useUpdateUserDisplayNameMutation = () => {
  return useMutation({
    mutationFn: async ({ displayName }: { displayName: string | null }) => {
      return updateUserDisplayName({ displayName });
    },
  });
};

// mutations - 사용자 이름 수정
export const useUpdateUserFullNameMutation = () => {
  return useMutation({
    mutationFn: async ({ fullName }: { fullName: string }) => {
      return updateUserFullName({ fullName });
    },
  });
};

// mutations - 사용자 이메일 수정
export const useUpdateUserEmailMutation = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return updateUserEmail({ email });
    },
  });
};

// mutations - 사용자 전화번호 수정
export const useUpdateUserPhoneNumberMutation = () => {
  return useMutation({
    mutationFn: async ({ phoneNumber }: { phoneNumber: string }) => {
      return updateUserPhoneNumber({ phoneNumber });
    },
  });
};

// mutations - 사용자 생년월일 수정
export const useUpdateUserBirthDateMutation = () => {
  return useMutation({
    mutationFn: async ({ birthDate }: { birthDate: string }) => {
      return updateUserBirthDate({ birthDate });
    },
  });
};

// mutations - 사용자 프로필 공개 업데이트
export const useUpdateUserProfilePublicMutation = () => {
  return useMutation({
    mutationFn: async ({ profilePublic }: { profilePublic: boolean }) => {
      return updateUserProfilePublic({ profilePublic });
    },
  });
};

// mutations - 사용자 핀 저장소 공개 업데이트
export const useUpdateUserPinnedStorePublicMutation = () => {
  return useMutation({
    mutationFn: async ({
      pinnedStorePublic,
    }: {
      pinnedStorePublic: boolean;
    }) => {
      return updateUserPinnedStorePublic({ pinnedStorePublic });
    },
  });
};

// mutations - 사용자 아바타 업로드
export const useUploadUserAvatarMutation = () => {
  return useMutation({
    mutationFn: async ({ localFileUri }: { localFileUri: string }) => {
      return uploadUserAvatar({ localFileUri });
    },
  });
};
