import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Divider from "@components/divider";
import Icon from "@components/icon";
import Input from "@components/input";
import Pressable from "@components/pressable";
import ScalePress from "@components/scalePress";
import Text from "@components/text";
import {
  useUpdateUserBirthDateMutation,
  useUpdateUserDisplayNameMutation,
  useUpdateUserEmailMutation,
  useUpdateUserFullNameMutation,
  useUpdateUserPhoneNumberMutation,
} from "@hooks/queries/auth";
import { useAuth } from "@hooks/useAuth";
import {
  useEditProfileActions,
  useEditProfileState,
} from "@hooks/useEditProfile";
import { useModalActions } from "@hooks/useModal";
import { useRouter } from "@hooks/useRouter";
import { useTheme } from "@hooks/useTheme";
import { useToastActions } from "@hooks/useToast";
import { UserInfo } from "@providers/auth";
import { box, flex, liquid, screen } from "@theme/styles";
import { getDisplayMessage } from "@utils/errorHandler";
import { formatBirthDate } from "@utils/formatter";

export type Mode = "add" | "edit";

export type Variant =
  | "name"
  | "displayName"
  | "email"
  | "phoneNumber"
  | "birthDate";

type Params = {
  mode?: Mode;
  variant: Variant;
};

type HeaderRightProps = {
  mode?: Mode;
  variant: Variant;
};

/**
 * 프로필 편집 스크린
 * @param mode 스크린 모드
 * @param variant 편집 형태
 */
const EditProfileScreen = () => {
  // hooks
  const { mode = "edit", variant } = useLocalSearchParams<Params>();
  const { user } = useAuth();
  const { bottom } = useSafeAreaInsets();
  const { spacing, colors } = useTheme();
  // states
  const { errorMessage } = useEditProfileState();
  // styles
  const styles = StyleSheet.create({
    wrapper: {
      paddingTop: spacing(16),
      paddingBottom: bottom,
      paddingHorizontal: spacing(16),
      backgroundColor: colors("background"),
    },
  });
  // options
  const stackScreenOptions = React.useMemo(
    () => ({
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <HeaderRight mode={mode} variant={variant} />,
    }),
    [variant],
  );
  // render
  return (
    <>
      <Stack.Screen options={stackScreenOptions} />
      <View style={[screen.container, styles.wrapper]}>
        <ScrollView contentContainerStyle={[screen.content]}>
          {variant === "name" && <NameSection user={user} />}
          {variant === "email" && <EmailSection user={user} />}
          {variant === "phoneNumber" && <PhoneNumberSection user={user} />}
          {variant === "birthDate" && <BirthDateSection user={user} />}
          {errorMessage && <ErrorSection errorMessage={errorMessage} />}
        </ScrollView>
      </View>
    </>
  );
};

/** section */
const NameSection = ({ user }: { user: UserInfo }) => {
  // hooks
  const { spacing, colors, radius, borderWidth } = useTheme();
  // refs
  const initRef = useRef(false);
  // states
  const { displayName, userName } = useEditProfileState();
  const { setEditProfileState, resetErrorMessage } = useEditProfileActions();
  // initialize - 유저 정보 초기화
  useEffect(() => {
    if (!user || initRef.current) return;
    setEditProfileState({
      displayName: user.displayName ?? "",
      userName: user.name ?? "",
    });
    initRef.current = true;
    return () => {
      initRef.current = false;
    };
  }, [user]);
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
    labelBox: {
      width: spacing(80),
    },
    valueBox: {
      paddingHorizontal: spacing(4),
    },
  });
  // handlers - 닉네임 변경 이벤트
  const handleDisplayNameChange = (value: string) => {
    setEditProfileState({ displayName: value });
    resetErrorMessage();
  };
  // handlers - 이름 변경 이벤트
  const handleNameChange = (value: string) => {
    setEditProfileState({ userName: value });
    resetErrorMessage();
  };
  // handlers - 이름 수정 버튼 클릭 시
  const handleDisableNamePress = () => {
    Alert.alert(
      "이름 수정 불가",
      "수정이 필요한 경우 로그인 화면에서 이름으로 문의주세요.",
    );
  };
  // render
  return (
    <View style={[styles.menuBox]}>
      <View style={[flex.row, styles.itemBox]}>
        <View style={[styles.labelBox]}>
          <Text variant="body-1" color={colors("foreground")}>
            닉네임
          </Text>
        </View>
        <View style={[flex.full, flex.shrink]}>
          <Input
            size="medium"
            value={displayName}
            onChange={handleDisplayNameChange}
            placeholder={user?.displayName || "닉네임을 입력해 주세요"}
          />
        </View>
      </View>
      <Divider height={1} color={colors("gray", 200)} />
      <View style={[flex.row, styles.itemBox]}>
        <View style={[styles.labelBox]}>
          <Text variant="body-1" color={colors("foreground")}>
            이름
          </Text>
        </View>
        <View style={[flex.full, flex.shrink]}>
          {user?.name && (
            <Pressable
              customStyles={{ containerStyle: styles.valueBox }}
              onPress={handleDisableNamePress}>
              <Text variant="body-1" color={colors("gray", 400)}>
                {user?.name}
              </Text>
            </Pressable>
          )}
          {!user?.name && (
            <View style={[flex.full, flex.shrink]}>
              <Input
                size="medium"
                value={userName}
                onChange={handleNameChange}
                placeholder={user?.name || "이름을 입력해 주세요"}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const EmailSection = ({ user }: { user: UserInfo }) => {
  // hooks
  const { spacing, colors, radius, borderWidth } = useTheme();
  // refs
  const initRef = useRef(false);
  // states
  const { email } = useEditProfileState();
  const { setEditProfileState, resetErrorMessage } = useEditProfileActions();
  // initialize - 유저 정보 초기화
  useEffect(() => {
    if (!user || initRef.current) return;
    setEditProfileState({ email: user.email || "" });
    initRef.current = true;
    return () => {
      initRef.current = false;
    };
  }, [user]);
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
    labelBox: {
      width: spacing(80),
    },
    valueBox: {
      paddingHorizontal: spacing(4),
    },
  });
  // handlers - 이메일 변경 이벤트
  const handleEmailChange = (value: string) => {
    setEditProfileState({ email: value });
    resetErrorMessage();
  };
  // handlers - 이메일 수정 버튼 클릭 시
  const handleDisableEmailPress = () => {
    Alert.alert(
      "이메일 수정 불가",
      "수정이 필요한 경우 로그인 화면에서 이메일로 문의주세요.",
    );
  };
  // render
  return (
    <View style={[styles.menuBox]}>
      <View style={[flex.row, styles.itemBox]}>
        <View style={[styles.labelBox]}>
          <Text variant="body-1" color={colors("foreground")}>
            Email
          </Text>
        </View>
        <View style={[flex.full, flex.shrink]}>
          {user?.email && (
            <Pressable
              customStyles={{ containerStyle: styles.valueBox }}
              onPress={handleDisableEmailPress}>
              <Text variant="body-1" color={colors("gray", 400)}>
                {user?.email}
              </Text>
            </Pressable>
          )}
          {!user?.email && (
            <Input
              size="medium"
              value={email}
              onChange={handleEmailChange}
              placeholder={"이메일을 입력해 주세요"}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const PhoneNumberSection = ({ user }: { user: UserInfo }) => {
  // hooks
  const { spacing, colors, radius, borderWidth } = useTheme();
  // refs
  const initRef = useRef(false);
  // states
  const { phoneNumber } = useEditProfileState();
  const { setEditProfileState, resetErrorMessage } = useEditProfileActions();
  // initialize - 유저 정보 초기화
  useEffect(() => {
    if (!user || initRef.current) return;
    setEditProfileState({ phoneNumber: user.phoneNumber ?? "" });
    initRef.current = true;
    return () => {
      initRef.current = false;
    };
  }, [user]);
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
    labelBox: {
      width: spacing(80),
    },
  });
  // handlers - 전화번호 변경 이벤트
  const handlePhoneNumberChange = (value: string) => {
    setEditProfileState({ phoneNumber: value });
    resetErrorMessage();
  };
  // render
  return (
    <View style={[styles.menuBox]}>
      <View style={[flex.row, styles.itemBox]}>
        <View style={[styles.labelBox]}>
          <Text variant="body-1" color={colors("foreground")}>
            전화번호
          </Text>
        </View>
        <View style={[flex.full, flex.shrink]}>
          <Input
            size="medium"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder={user?.phoneNumber ?? "전화번호를 입력해 주세요"}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </View>
  );
};

const BirthDateSection = ({ user }: { user: UserInfo }) => {
  // hooks
  const { spacing, colors, radius, borderWidth } = useTheme();
  const { openModal } = useModalActions();
  // refs
  const initRef = useRef(false);
  // states
  const { birthDate } = useEditProfileState();
  const { setEditProfileState } = useEditProfileActions();
  // initialize - 유저 정보 초기화
  useEffect(() => {
    if (!user || initRef.current) return;
    setEditProfileState({ birthDate: user.birthDate ?? "" });
    initRef.current = true;
    return () => {
      initRef.current = false;
    };
  }, [user]);
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
    labelBox: {
      width: spacing(80),
    },
    valueBox: {
      paddingHorizontal: spacing(4),
    },
  });
  // handlers - 생년월일 선택 버튼 터치 시
  const handleBirthDatePress = () => {
    openModal({ children: <BirthDateModal /> });
  };
  // render
  return (
    <View style={[styles.menuBox]}>
      <View style={[flex.row, styles.itemBox]}>
        <View style={[styles.labelBox]}>
          <Text variant="body-1" color={colors("foreground")}>
            생년월일
          </Text>
        </View>
        <View style={[flex.full, flex.shrink]}>
          <ScalePress
            customStyles={{ containerStyle: styles.valueBox }}
            onPress={handleBirthDatePress}>
            <Text
              variant="body-1"
              color={birthDate ? colors("foreground") : colors("gray", 500)}>
              {formatBirthDate(birthDate) || "생년월일을 선택해주세요"}
            </Text>
          </ScalePress>
        </View>
      </View>
    </View>
  );
};

/** inner components */
const BirthDateModal = () => {
  // hooks
  const { spacing, colors, deviceTheme } = useTheme();
  const { closeModal } = useModalActions();
  const { birthDate } = useEditProfileState();
  const { setEditProfileState } = useEditProfileActions();
  // variables
  const initialDate = parseBirthDateToDate(birthDate);
  const [pendingDate, setPendingDate] = useState(initialDate);
  // initialize - 생년월일 초기화
  useEffect(() => {
    setPendingDate(parseBirthDateToDate(birthDate));
  }, [birthDate]);
  // handlers - 생년월일 선택 이벤트
  const handleBirthDatePickerChange = (
    _event: unknown,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate == null) return;
    setPendingDate(selectedDate);
  };
  // handlers - 생년월일 선택 확인 버튼 터치 시
  const handleBirthDateConfirm = () => {
    setEditProfileState({ birthDate: formatDateToBirthDate(pendingDate) });
    closeModal();
  };
  // styles
  const styles = StyleSheet.create({
    modalConfirmBox: {
      paddingHorizontal: spacing(24),
      paddingVertical: spacing(6),
    },
    picker: {
      height: 200,
      backgroundColor: colors("gray", 50),
    },
  });
  // render
  return (
    <View style={[flex.center, box.w100]}>
      <ScalePress
        customStyles={{
          containerStyle: [flex.centerEnd, box.w100, styles.modalConfirmBox],
        }}
        onPress={handleBirthDateConfirm}>
        <View style={[flex.centerEnd, box.w100]}>
          <Text variant="body-1" weight={600} color={colors("primary")}>
            확인
          </Text>
        </View>
      </ScalePress>
      <DateTimePicker
        style={[styles.picker]}
        value={pendingDate}
        themeVariant={deviceTheme}
        mode="date"
        display="spinner"
        textColor={colors("foreground")}
        maximumDate={new Date()}
        onChange={handleBirthDatePickerChange}
      />
    </View>
  );
};

const ErrorSection = ({ errorMessage }: { errorMessage: string }) => {
  // hooks
  const { colors, spacing } = useTheme();
  // styles
  const styles = StyleSheet.create({
    errorBox: {
      paddingVertical: spacing(8),
      paddingHorizontal: spacing(4),
    },
  });
  // render
  return (
    <View style={[styles.errorBox]}>
      <Text variant="ui-5" color={colors("red", "default")}>
        {errorMessage}
      </Text>
    </View>
  );
};

/** utils */
function formatDateToBirthDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function parseBirthDateToDate(value: string): Date {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 8) return new Date(2000, 0, 1);
  const y = Number(digits.slice(0, 4));
  const m = Number(digits.slice(4, 6)) - 1;
  const d = Number(digits.slice(6, 8));
  const date = new Date(y, m, d);
  return Number.isNaN(date.getTime()) ? new Date(2000, 0, 1) : date;
}

/** options */
const HeaderLeft = () => {
  // hooks
  const { goBack } = useRouter();
  const { resetEditProfileState } = useEditProfileActions();
  // handlers - 닫기 아이콘 터치 시
  const handleClosePress = () => {
    resetEditProfileState();
    goBack();
  };
  // render
  return (
    <ScalePress
      customStyles={{ containerStyle: [flex.center, liquid.hitArea] }}
      onPress={handleClosePress}>
      <Icon name="close" size="small" />
    </ScalePress>
  );
};

const HeaderRight = ({ mode, variant }: HeaderRightProps) => {
  // hooks
  const { user } = useAuth();
  const { displayName, userName, email, phoneNumber, birthDate } =
    useEditProfileState();
  const { setEditProfileState, resetEditProfileState } =
    useEditProfileActions();
  const { colors } = useTheme();
  const { goBack } = useRouter();
  const { showToast } = useToastActions();
  // mutations
  const updateUserDisplayNameMutation = useUpdateUserDisplayNameMutation();
  const updateUserFullNameMutation = useUpdateUserFullNameMutation();
  const updateUserEmailMutation = useUpdateUserEmailMutation();
  const updateUserPhoneNumberMutation = useUpdateUserPhoneNumberMutation();
  const updateUserBirthDateMutation = useUpdateUserBirthDateMutation();
  // variables
  const authLoading =
    updateUserDisplayNameMutation.isPending ||
    updateUserFullNameMutation.isPending ||
    updateUserEmailMutation.isPending ||
    updateUserPhoneNumberMutation.isPending ||
    updateUserBirthDateMutation.isPending;
  // handlers - 닉네임 제출 이벤트
  const handleEditNameSubmit = async () => {
    try {
      const trimmedDisplayName = displayName.trim();
      const trimmedName = userName.trim();
      const parsedDisplayName =
        trimmedDisplayName === "" ? null : trimmedDisplayName;
      const parsedName = trimmedName === "" ? null : trimmedName;
      const isChangedDisplayName = parsedDisplayName !== user?.displayName;
      const isChangedName = parsedName !== user?.name;
      const displayNameRegex = /^[가-힣a-zA-Z]{1,8}$/;
      const nameRegex = /^[가-힣a-zA-Z]{1,5}$/;
      if (!isChangedDisplayName && !isChangedName) {
        showToast({
          text: "변경된 정보가 없습니다.",
          variant: "info",
        });
        goBack();
        return;
      }
      if (
        parsedDisplayName !== null &&
        !displayNameRegex.test(parsedDisplayName)
      ) {
        setEditProfileState({
          errorMessage: "닉네임은 8자 이하의 한글,영문 조합만 가능합니다",
        });
        return;
      }
      if (parsedName !== null && !nameRegex.test(parsedName)) {
        setEditProfileState({
          errorMessage: "이름은 5자 이하의 한글 또는 영문만 가능합니다",
        });
        return;
      }
      if (isChangedDisplayName) {
        await updateUserDisplayNameMutation.mutateAsync({
          displayName: parsedDisplayName,
        });
      }
      if (isChangedName) {
        await updateUserFullNameMutation.mutateAsync({
          fullName: parsedName,
        });
      }
      showToast({
        text:
          parsedDisplayName === null && parsedName === null
            ? "정보를 삭제했습니다."
            : "정보를 변경했습니다.",
        variant: "success",
      });
      resetEditProfileState();
      goBack();
    } catch (error) {
      showToast({
        text: getDisplayMessage(error),
        variant: "error",
      });
    }
  };
  // handlers - 이메일 제출 이벤트
  const handleEditEmailSubmit = async () => {
    try {
      const trimmedEmail = email.trim();
      const parsedEmail = trimmedEmail === "" ? null : trimmedEmail;
      const isChangedEmail = parsedEmail !== user?.email;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!isChangedEmail) {
        showToast({ text: "변경된 정보가 없습니다.", variant: "info" });
        goBack();
        return;
      }
      if (parsedEmail !== null && !emailRegex.test(parsedEmail)) {
        setEditProfileState({
          errorMessage: "올바른 이메일을 입력해 주세요.",
        });
        return;
      }
      await updateUserEmailMutation.mutateAsync({ email: parsedEmail ?? "" });
      showToast({
        text:
          parsedEmail === null
            ? "이메일을 삭제했습니다."
            : "이메일을 변경했습니다.",
        variant: "success",
      });
      resetEditProfileState();
      goBack();
    } catch (error) {
      showToast({ text: getDisplayMessage(error), variant: "error" });
    }
  };
  // handlers - 전화번호 제출 이벤트
  const handleEditPhoneNumberSubmit = async () => {
    try {
      const trimmedPhoneNumber = phoneNumber.trim();
      const digitsOnlyPhoneNumber = trimmedPhoneNumber.replace(/\D/g, "");
      const parsedPhoneNumber =
        digitsOnlyPhoneNumber === "" ? null : digitsOnlyPhoneNumber;
      const isChangedPhoneNumber = parsedPhoneNumber !== user?.phoneNumber;
      if (!isChangedPhoneNumber) {
        showToast({ text: "변경된 정보가 없습니다.", variant: "info" });
        goBack();
        return;
      }
      const phoneNumberRegex = /^(?:010[0-9]{8}|01[1-9][0-9]{7,8})$/;
      if (
        parsedPhoneNumber !== null &&
        !phoneNumberRegex.test(parsedPhoneNumber)
      ) {
        setEditProfileState({
          errorMessage: "하이픈을 제외한 휴대전화를 입력해 주세요.",
        });
        return;
      }
      await updateUserPhoneNumberMutation.mutateAsync({
        phoneNumber: parsedPhoneNumber ?? "",
      });
      showToast({
        text:
          parsedPhoneNumber === null
            ? "전화번호를 삭제했습니다."
            : "전화번호를 변경했습니다.",
        variant: "success",
      });
      resetEditProfileState();
      goBack();
    } catch (error) {
      showToast({ text: getDisplayMessage(error), variant: "error" });
    }
  };
  // handlers - 생년월일 제출 이벤트
  const handleEditBirthDateSubmit = async () => {
    try {
      const trimmedBirthDate = birthDate.trim();
      const digitsOnlyBirthDate = trimmedBirthDate.replace(/\D/g, "");
      const parsedBirthDate =
        digitsOnlyBirthDate === "" ? null : digitsOnlyBirthDate;
      const isChangedBirthDate = parsedBirthDate !== user?.birthDate;
      if (!isChangedBirthDate) {
        showToast({ text: "변경된 정보가 없습니다.", variant: "info" });
        goBack();
        return;
      }
      if (parsedBirthDate !== null) {
        const y = Number(parsedBirthDate.slice(0, 4));
        const m = Number(parsedBirthDate.slice(4, 6)) - 1;
        const d = Number(parsedBirthDate.slice(6, 8));
        const date = new Date(y, m, d);
        if (
          date.getFullYear() !== y ||
          date.getMonth() !== m ||
          date.getDate() !== d
        ) {
          setEditProfileState({ errorMessage: "올바른 날짜를 입력해 주세요." });
          return;
        }
      }
      await updateUserBirthDateMutation.mutateAsync({
        birthDate: parsedBirthDate ?? "",
      });
      showToast({
        text:
          parsedBirthDate === null
            ? "생년월일을 삭제했습니다."
            : "생년월일을 변경했습니다.",
        variant: "success",
      });
      resetEditProfileState();
      goBack();
    } catch (error) {
      showToast({ text: getDisplayMessage(error), variant: "error" });
    }
  };
  // handlers - 폼 제출 이벤트
  const handleFormSubmit = async () => {
    if (variant === "name") {
      await handleEditNameSubmit();
      return;
    }
    if (variant === "email") {
      await handleEditEmailSubmit();
      return;
    }
    if (variant === "phoneNumber") {
      await handleEditPhoneNumberSubmit();
      return;
    }
    if (variant === "birthDate") {
      await handleEditBirthDateSubmit();
      return;
    }
  };
  // render
  return (
    <ScalePress
      customStyles={{ containerStyle: [flex.center, liquid.hitArea] }}
      onPress={handleFormSubmit}>
      {authLoading ? (
        <ActivityIndicator size="small" color={colors("foreground")} />
      ) : (
        <Icon name="check" size="small" />
      )}
    </ScalePress>
  );
};

export default EditProfileScreen;
