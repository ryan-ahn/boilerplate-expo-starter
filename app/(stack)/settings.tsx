import React, { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

import { Picker } from "@react-native-picker/picker";
import * as Application from "expo-application";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "@components/icon";
import ScalePress from "@components/scalePress";
import StackLeft from "@components/stackLeft";
import Text from "@components/text";
import { useModalActions } from "@hooks/useModal";
import { useTheme } from "@hooks/useTheme";
import { useThemeModeActions, useThemeModeState } from "@hooks/useThemeMode";
import { useToastActions } from "@hooks/useToast";
import { ThemeMode } from "@stores/mode";
import { box, flex, gap, screen } from "@theme/styles";

const MODE_OPTIONS: { id: number; label: string; value: ThemeMode }[] = [
  { id: 0, label: "다크모드", value: "dark" },
  { id: 1, label: "라이트모드", value: "light" },
  { id: 2, label: "시스템 설정", value: "system" },
];

/**
 * 설정 스크린
 */
const SettingsScreen = () => {
  // hooks
  const { bottom } = useSafeAreaInsets();
  const { spacing, colors } = useTheme();
  // styles
  const styles = StyleSheet.create({
    container: {
      paddingBottom: bottom,
      backgroundColor: colors("background"),
    },
    contentContainer: {
      paddingTop: spacing(20),
      paddingHorizontal: spacing(16),
    },
  });
  // options
  const stackScreenOptions = useMemo(
    () => ({
      headerTitle: "설정",
      headerLeft: () => <StackLeft />,
    }),
    [],
  );
  // render
  return (
    <>
      <Stack.Screen options={stackScreenOptions} />
      <View style={[screen.container, styles.container]}>
        <ScrollView
          contentContainerStyle={[screen.content, styles.contentContainer]}>
          <MenuSection />
        </ScrollView>
      </View>
    </>
  );
};

/** section */
const MenuSection = () => {
  // hooks
  const { themeMode } = useThemeModeState();
  const { spacing, colors, radius, borderWidth } = useTheme();
  const { openModal } = useModalActions();
  const { showToast } = useToastActions();
  // variables
  const currentAppModeLabel = MODE_OPTIONS.find(
    option => option.value === themeMode,
  )?.label;
  const appVersion = [
    Application?.nativeApplicationVersion || "버전 정보 없음",
    " / " + (Application?.nativeBuildVersion || "빌드 넘버 없음"),
  ].join("");
  // handlers - 화면 모드 스피너 열기
  const handleAppModePickerPress = () => {
    openModal({
      children: <AppModePickerModal />,
    });
  };
  // handlers - 캐시 삭제 버튼 터치 시
  const handleCacheClearButtonPress = () => {
    Alert.alert("캐시 삭제", "캐시를 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          try {
            await Image.clearMemoryCache();
            await Image.clearDiskCache();
            showToast({
              text: "캐시를 삭제했습니다.",
              variant: "success",
            });
          } catch {
            showToast({
              text: "캐시 삭제에 실패했습니다.",
              variant: "error",
            });
          }
        },
      },
    ]);
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
    descriptionBox: {
      paddingHorizontal: spacing(16),
    },
  });
  // render
  return (
    <View style={[flex.column, gap.g20]}>
      <View style={[styles.menuBox]}>
        <View style={[flex.row, flex.spaceCenter, gap.g8, styles.itemBox]}>
          <View style={flex.shrink}>
            <Text variant="body-1" color={colors("foreground")}>
              화면 모드
            </Text>
          </View>
          <ScalePress
            customStyles={{
              containerStyle: [flex.full, flex.row, flex.endCenter, gap.g2],
            }}
            onPress={handleAppModePickerPress}>
            <View style={flex.shrink}>
              <Text
                variant="body-2"
                color={colors("gray", 500)}
                numberOfLines={1}>
                {currentAppModeLabel}
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
        <ScalePress
          customStyles={{
            containerStyle: [
              flex.row,
              flex.spaceCenter,
              gap.g8,
              styles.itemBox,
            ],
          }}
          onPress={handleCacheClearButtonPress}>
          <View style={flex.shrink}>
            <Text variant="body-1" color={colors("foreground")}>
              캐시 삭제
            </Text>
          </View>
          <View style={[flex.full, flex.row, flex.endCenter]}>
            <Icon
              name="chevron-right"
              size="small"
              color={colors("gray", 500)}
            />
          </View>
        </ScalePress>
      </View>
      <View style={[styles.menuBox]}></View>
      <View style={[flex.row, flex.endCenter, gap.g4, styles.descriptionBox]}>
        <Text variant="body-3" color={colors("gray", 400)}>
          버전정보
        </Text>
        <Text variant="body-3" color={colors("gray", 400)}>
          {appVersion}
        </Text>
      </View>
    </View>
  );
};

/** inner components */
const AppModePickerModal = () => {
  // hooks
  const { themeMode } = useThemeModeState();
  const { setThemeMode } = useThemeModeActions();
  const { closeModal } = useModalActions();
  const { colors, spacing } = useTheme();
  // variables
  const [pendingMode, setPendingMode] = useState(themeMode);
  // handlers - 화면 모드 선택 확인 버튼 터치 시
  const handleAppModeConfirmButtonPress = () => {
    setThemeMode(pendingMode);
    closeModal();
  };
  // initialize
  useEffect(() => {
    setPendingMode(themeMode);
  }, [themeMode]);
  // styles
  const styles = StyleSheet.create({
    modalConfirmBox: {
      paddingHorizontal: spacing(24),
      paddingVertical: spacing(6),
    },
    picker: {
      paddingHorizontal: spacing(24),
      backgroundColor: colors("gray", 50),
    },
    pickerItem: {
      color: colors("foreground"),
    },
  });
  // render
  return (
    <View style={[flex.centerEnd, box.w100]}>
      <ScalePress
        customStyles={{
          containerStyle: [flex.centerEnd, styles.modalConfirmBox],
        }}
        onPress={handleAppModeConfirmButtonPress}>
        <Text variant="body-1" weight={600} color={colors("primary")}>
          확인
        </Text>
      </ScalePress>
      <Picker
        style={[box.w100, styles.picker]}
        itemStyle={styles.pickerItem}
        selectedValue={pendingMode}
        onValueChange={itemValue =>
          setPendingMode(itemValue as "light" | "dark" | "system")
        }>
        {MODE_OPTIONS.map(option => (
          <Picker.Item
            key={option.id}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default SettingsScreen;
