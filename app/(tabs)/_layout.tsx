import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  type LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";

import { Route, useFocusEffect, usePathname } from "expo-router";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon, { Name as IconName } from "@components/icon";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "@hooks/useRouter";
import { useTheme } from "@hooks/useTheme";
import { flex } from "@theme/styles";

const TAB_LIST: {
  key: string;
  pathname: Route;
  icon: IconName;
  requireAuth: boolean;
}[] = [
  {
    key: "home",
    pathname: "/",
    icon: "map",
    requireAuth: false,
  },
  {
    key: "myPage",
    pathname: "/myPage",
    icon: "user",
    requireAuth: true,
  },
] as const;

type TabLayoutItem = {
  x: number;
  width: number;
};

type TabLayoutMap = Partial<
  Record<(typeof TAB_LIST)[number]["key"], TabLayoutItem>
>;

/**
 * 하단 탭 Layout
 */
const TabLayout = () => {
  // hooks
  const { user } = useAuth();
  const { bottom } = useSafeAreaInsets();
  const { pushToSignIn } = useRouter();
  const { spacing, colors, radius, decimal, unit } = useTheme();
  const pathname = usePathname();
  // states
  const [tabLayouts, setTabLayouts] = useState<TabLayoutMap>({});
  // refs
  const pillXAnimationValue = useRef(new Animated.Value(0)).current;
  const pillWidthAnimationValue = useRef(new Animated.Value(0)).current;
  const pillOpacityAnimationValue = useRef(new Animated.Value(0)).current;
  const skipNextSlideRef = useRef(false);
  // variables
  const activeTab =
    TAB_LIST.find(tab => tab.pathname === pathname) ?? TAB_LIST[0];
  const activeLayout = tabLayouts[activeTab.key];
  const activeLayoutX = activeLayout?.x;
  const activeLayoutWidth = activeLayout?.width;
  // effects
  useFocusEffect(
    useCallback(() => {
      skipNextSlideRef.current = true;
      return () => {
        pillOpacityAnimationValue.setValue(0);
      };
    }, [pillOpacityAnimationValue]),
  );

  useEffect(() => {
    if (
      typeof activeLayoutX !== "number" ||
      typeof activeLayoutWidth !== "number"
    )
      return;
    if (activeLayoutWidth <= 0) return;
    const timingConfig = {
      duration: 150,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    } as const;
    if (skipNextSlideRef.current) {
      skipNextSlideRef.current = false;
      pillXAnimationValue.setValue(activeLayoutX);
      pillWidthAnimationValue.setValue(activeLayoutWidth);
      Animated.timing(pillOpacityAnimationValue, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
      return;
    }
    Animated.parallel([
      Animated.timing(pillXAnimationValue, {
        ...timingConfig,
        toValue: activeLayoutX,
      }),
      Animated.timing(pillWidthAnimationValue, {
        ...timingConfig,
        toValue: activeLayoutWidth,
      }),
    ]).start();
  }, [
    activeTab.key,
    activeLayoutX,
    activeLayoutWidth,
    pillXAnimationValue,
    pillWidthAnimationValue,
    pillOpacityAnimationValue,
  ]);
  // styles
  const styles = useMemo(
    () =>
      StyleSheet.create({
        tabList: {
          position: "absolute",
          bottom: bottom - spacing(8),
          alignSelf: "center",
          padding: spacing(8),
          borderRadius: radius(9999),
          backgroundColor: colors("gray", 50),
          shadowOffset: { width: unit(0), height: unit(3) },
          shadowOpacity: decimal(0.12),
          shadowRadius: radius(8),
          shadowColor: colors("foreground", "default", "static"),
        },
        tabItemHitBox: {
          position: "absolute",
          top: 5,
          left: pillXAnimationValue,
          width: pillWidthAnimationValue,
          height: unit(50),
          borderRadius: unit(9999),
          backgroundColor: colors("primary", "default"),
          opacity: pillOpacityAnimationValue,
        },
        tabItem: {
          paddingVertical: spacing(8),
          paddingHorizontal: spacing(12),
          borderRadius: unit(9999),
        },
      }),
    [
      bottom,
      colors,
      decimal,
      pillOpacityAnimationValue,
      pillWidthAnimationValue,
      pillXAnimationValue,
      radius,
      spacing,
      unit,
    ],
  );

  const tabLayoutHandlers = useMemo(() => {
    const map: Partial<
      Record<(typeof TAB_LIST)[number]["key"], (e: LayoutChangeEvent) => void>
    > = {};
    for (const tab of TAB_LIST) {
      map[tab.key] = (event: LayoutChangeEvent) => {
        const { x, width } = event.nativeEvent.layout;
        setTabLayouts(prev => ({
          ...prev,
          [tab.key]: { x, width },
        }));
      };
    }
    return map;
  }, []);

  const handleAuthRedirectPress = (pathname: Route) => (event: unknown) => {
    if (event && typeof event === "object") {
      const eventObject = event as {
        defaultPrevented?: boolean;
        isDefaultPrevented?: () => boolean;
        preventDefault?: () => void;
      };
      eventObject.defaultPrevented = true;
      eventObject.isDefaultPrevented = () => true;
      eventObject.preventDefault = () => {};
    }
    pushToSignIn(pathname);
  };
  // render
  return (
    <Tabs>
      <TabSlot />
      <TabList style={[flex.row, flex.alignCenter, styles.tabList]}>
        <Animated.View pointerEvents="none" style={styles.tabItemHitBox} />
        {TAB_LIST.map(tab => {
          const needAuthRedirect = tab.requireAuth && !user?.isLoggedIn;
          return (
            <TabTrigger
              key={tab.key}
              name={tab.key}
              href={tab.pathname}
              onLayout={tabLayoutHandlers[tab.key]}
              onPress={
                needAuthRedirect
                  ? handleAuthRedirectPress(tab.pathname)
                  : undefined
              }>
              <View style={[flex.row, flex.center, styles.tabItem]}>
                <Icon
                  name={tab.icon}
                  size="large"
                  color={
                    tab.key === activeTab.key
                      ? colors("background", "default", "static")
                      : colors("foreground")
                  }
                />
              </View>
            </TabTrigger>
          );
        })}
      </TabList>
    </Tabs>
  );
};

export default TabLayout;
