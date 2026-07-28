import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Variant as EditProfileVariant } from "@app/(stack)/editProfile";
import Button from "@components/button";
import Divider from "@components/divider";
import Icon from "@components/icon";
import ScalePress from "@components/scalePress";
import Switch from "@components/switch";
import Text from "@components/text";
import {
  useUpdateUserProfilePublicMutation,
  useUploadUserAvatarMutation,
} from "@hooks/queries/auth";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "@hooks/useRouter";
import { useTheme } from "@hooks/useTheme";
import { useToastActions } from "@hooks/useToast";
import { UserInfo } from "@providers/auth";
import { flex, gap, screen } from "@theme/styles";
import { getDisplayMessage } from "@utils/errorHandler";
import { formatBirthDate, formatPhoneNumber } from "@utils/formatter";
import { openImagePicker } from "@utils/imagePicker";
import { getHttpsUrlFromUrl } from "@utils/transform";

/**
 * 마이페이지 스크린
 */
const MyPageScreen = () => {
  // hooks
  const { user } = useAuth();
  const { top, bottom } = useSafeAreaInsets();
  const { colors, spacing } = useTheme();
  // styles
  const styles = StyleSheet.create({
    container: {
      paddingTop: top,
      paddingBottom: bottom,
      backgroundColor: colors("background"),
    },
    contentContainer: {
      paddingTop: spacing(20),
      paddingHorizontal: spacing(16),
    },
  });
  // render
  if (!user?.isLoggedIn) {
    return (
      <View style={[flex.full, flex.center, styles.container]}>
        <AuthRequiredView />
      </View>
    );
  }

  return (
    <View style={[screen.container, styles.container]}>
      <HeaderBar />
      <ScrollView
        contentContainerStyle={[
          screen.content,
          styles.contentContainer,
          gap.g24,
        ]}>
        <ProfileSection user={user} />
        <MenuSection user={user} />
      </ScrollView>
    </View>
  );
};

/** header */
const HeaderBar = () => {
  // hooks
  const { colors, spacing } = useTheme();
  const { pushToSettings } = useRouter();
  // router
  const routeToSettings = () => {
    pushToSettings();
  };
  // styles
  const styles = StyleSheet.create({
    barContainer: {
      paddingVertical: spacing(12),
      paddingHorizontal: spacing(16),
    },
  });
  return (
    <View style={[flex.row, flex.spaceCenter, styles.barContainer]}>
      <Text variant="heading-3" color={colors("foreground", "default")}>
        마이페이지
      </Text>
      <ScalePress scale={0.8} onPress={routeToSettings}>
        <Icon name="setting" size="large" color={colors("foreground")} />
      </ScalePress>
    </View>
  );
};

/** section */
const ProfileSection = ({ user }: { user: UserInfo }) => {
  // hooks
  const { colors, spacing, radius, borderWidth } = useTheme();
  const { showToast } = useToastActions();
  const uploadUserAvatarMutation = useUploadUserAvatarMutation();
  // variables
  const isUploading = uploadUserAvatarMutation.isPending;
  // variables
  const profileImageUrl = getHttpsUrlFromUrl(user?.avatarUrl || "");
  // styles
  const styles = StyleSheet.create({
    sectionContainer: {
      paddingHorizontal: spacing(16),
    },
    avatarWrapper: {
      position: "relative",
    },
    avatarImage: {
      width: spacing(72),
      height: spacing(72),
      borderRadius: radius(9999),
      borderWidth: borderWidth(0.5),
      borderColor: colors("gray", 50),
      backgroundColor: colors("gray", 200),
    },
    pencilBox: {
      position: "absolute",
      bottom: 0,
      right: -4,
      padding: spacing(4),
      borderRadius: radius(9999),
      borderWidth: borderWidth(0.5),
      borderColor: colors("gray", 900),
      backgroundColor: colors("background"),
    },
  });
  // handlers - 프로필 이미지 변경 버튼 터치 시
  const handleAvatarEdit = async () => {
    try {
      const result = await openImagePicker({
        title: "프로필 이미지 변경",
        message: "변경할 방법을 선택해주세요",
      });
      if (result?.length && result[0].uri) {
        await uploadUserAvatarMutation.mutateAsync({
          localFileUri: result[0].uri,
        });
        showToast({
          text: "프로필 이미지가 변경되었습니다.",
          variant: "success",
        });
      }
    } catch (error) {
      const code =
        typeof error === "string" ? error : ((error as Error)?.message ?? "");
      if (code === "camera_unavailable") {
        showToast({
          text: "카메라를 사용할 수 없습니다. 갤러리를 이용해주세요.",
          variant: "info",
        });
        return;
      }
      showToast({
        text: !error
          ? "프로필 이미지 변경을 취소했습니다."
          : "프로필 이미지 변경에 실패했습니다.",
        variant: "info",
      });
    }
  };
  // render
  return (
    <View style={[flex.center, styles.sectionContainer]}>
      <View style={[flex.column, flex.center, gap.g16]}>
        <View style={[styles.avatarWrapper]}>
          {isUploading ? (
            <View style={[flex.center, styles.avatarImage]}>
              <ActivityIndicator size="small" color={colors("foreground")} />
            </View>
          ) : (
            <Image
              style={styles.avatarImage}
              source={
                profileImageUrl
                  ? { uri: profileImageUrl }
                  : require("@assets/images/default-avatar.png")
              }
              contentFit="cover"
            />
          )}
          <ScalePress
            customStyles={{ containerStyle: [flex.center, styles.pencilBox] }}
            scale={0.8}
            onPress={handleAvatarEdit}>
            <Icon size={12} name="pencil" color={colors("foreground")} />
          </ScalePress>
        </View>
        <View style={[flex.column, flex.center, gap.g4]}>
          <Text variant="heading-3" color={colors("foreground")}>
            {user?.displayName || user?.name || "닉네임 미설정"}
          </Text>
          <Text variant="ui-2" color={colors("gray", 500)}>
            {user?.email || "이메일 미설정"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const MenuSection = ({ user }: { user: UserInfo }) => {
  // hooks
  const { signOut } = useAuth();
  const { colors, spacing, radius, borderWidth } = useTheme();
  const { navigateToHome, pushToEditProfile } = useRouter();
  const { showToast } = useToastActions();
  const updateUserProfilePublicMutation = useUpdateUserProfilePublicMutation();
  // handlers - 프로필 공개 변경 스위치 터치 시
  const handleProfilePublicChange = async (value: boolean) => {
    try {
      await updateUserProfilePublicMutation.mutateAsync({
        profilePublic: value,
      });
    } catch (error) {
      showToast({
        text: getDisplayMessage(error),
        variant: "error",
      });
    }
  };
  // handlers - 로그아웃 버튼 터치 시
  const handleSignOutPress = async () => {
    try {
      await signOut();
    } catch (error) {
      showToast({
        text: getDisplayMessage(error),
        variant: "error",
      });
    }
    navigateToHome();
  };
  // router
  const handleEditProfileRoute = (variant: EditProfileVariant) => {
    pushToEditProfile("edit", variant);
  };
  // styles
  const styles = StyleSheet.create({
    menuBox: {
      paddingHorizontal: spacing(16),
      borderRadius: radius(24),
      borderWidth: borderWidth(0.5),
      borderColor: colors("gray", 100),
      backgroundColor: colors("gray", 50),
    },
    itemBox: {
      paddingLeft: spacing(4),
      paddingVertical: spacing(12),
    },
  });
  // render
  return (
    <View style={[flex.column, gap.g20]}>
      <View style={[styles.menuBox]}>
        <View style={[flex.row, flex.spaceCenter, gap.g8, styles.itemBox]}>
          <View style={flex.shrink}>
            <Text variant="body-1" color={colors("foreground")}>
              이름
            </Text>
          </View>
          <ScalePress
            customStyles={{
              containerStyle: [flex.full, flex.row, flex.endCenter, gap.g2],
            }}
            onPress={() => handleEditProfileRoute("name")}>
            <View style={flex.shrink}>
              <Text
                variant="body-1"
                color={colors("gray", 500)}
                numberOfLines={1}>
                {user?.name || "미설정"}
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size="small"
              color={colors("gray", 500)}
            />
          </ScalePress>
        </View>
        <Divider height={1} color={colors("gray", 100)} />
        <View style={[flex.row, flex.spaceCenter, gap.g8, styles.itemBox]}>
          <View style={flex.shrink}>
            <Text variant="body-1" color={colors("foreground")}>
              이메일
            </Text>
          </View>
          <ScalePress
            customStyles={{
              containerStyle: [flex.full, flex.row, flex.endCenter, gap.g2],
            }}
            onPress={() => handleEditProfileRoute("email")}>
            <View style={[flex.shrink]}>
              <Text
                variant="body-1"
                color={colors("gray", 500)}
                numberOfLines={1}>
                {user?.email || "미설정"}
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size="small"
              color={colors("gray", 500)}
            />
          </ScalePress>
        </View>
        <Divider height={1} color={colors("gray", 100)} />
        <View style={[flex.row, flex.spaceCenter, gap.g8, styles.itemBox]}>
          <View style={flex.shrink}>
            <Text variant="body-1" color={colors("foreground")}>
              휴대전화
            </Text>
          </View>
          <ScalePress
            customStyles={{
              containerStyle: [flex.full, flex.row, flex.endCenter, gap.g2],
            }}
            onPress={() => handleEditProfileRoute("phoneNumber")}>
            <View style={flex.shrink}>
              <Text
                variant="body-1"
                color={colors("gray", 500)}
                numberOfLines={1}>
                {user?.phoneNumber
                  ? formatPhoneNumber(user.phoneNumber)
                  : "미설정"}
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size="small"
              color={colors("gray", 500)}
            />
          </ScalePress>
        </View>
        <Divider height={1} color={colors("gray", 100)} />
        <View style={[flex.row, flex.spaceCenter, gap.g8, styles.itemBox]}>
          <View style={flex.shrink}>
            <Text variant="body-1" color={colors("foreground")}>
              생년월일
            </Text>
          </View>
          <ScalePress
            customStyles={{
              containerStyle: [flex.full, flex.row, flex.endCenter, gap.g2],
            }}
            onPress={() => handleEditProfileRoute("birthDate")}>
            <View style={[flex.shrink]}>
              <Text
                variant="body-1"
                color={colors("gray", 500)}
                numberOfLines={1}>
                {user?.birthDate ? formatBirthDate(user.birthDate) : "미설정"}
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size="small"
              color={colors("gray", 500)}
            />
          </ScalePress>
        </View>
      </View>
      <View style={[styles.menuBox]}>
        <View style={[flex.row, flex.spaceCenter, gap.g8, styles.itemBox]}>
          <Text variant="body-1" color={colors("foreground")}>
            프로필 공개
          </Text>
          <Switch
            value={user?.profilePublic}
            onValueChange={handleProfilePublicChange}
          />
        </View>
      </View>
      <ScalePress
        customStyles={{ containerStyle: [flex.center, styles.menuBox] }}
        onPress={handleSignOutPress}>
        <View style={[flex.center, styles.itemBox]}>
          <Text variant="body-1" color={colors("red", "default")}>
            로그아웃
          </Text>
        </View>
      </ScalePress>
    </View>
  );
};

/** inner component */
const AuthRequiredView = () => {
  // hooks
  const { colors } = useTheme();
  const { pushToSignIn } = useRouter();
  // refs
  const opacityAnimationValue = useRef(new Animated.Value(0)).current;
  // router
  const handleLoginPress = () => {
    pushToSignIn("/myPage");
  };
  // effects - 오퍼시티 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacityAnimationValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 1000);
    return () => clearTimeout(timer);
  }, [opacityAnimationValue]);
  // styles
  const styles = StyleSheet.create({
    container: {
      opacity: opacityAnimationValue,
    },
  });
  // render
  return (
    <Animated.View
      style={[flex.column, flex.center, gap.g12, styles.container]}>
      <Text variant="ui-1" color={colors("foreground")}>
        로그인하고 내 정보를 관리해보세요.
      </Text>
      <View style={[flex.row]}>
        <Button
          variant="primary"
          size="small"
          text="로그인"
          isRound
          onPress={handleLoginPress}
        />
      </View>
    </Animated.View>
  );
};

export default MyPageScreen;
