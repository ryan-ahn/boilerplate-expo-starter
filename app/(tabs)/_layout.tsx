import React from "react";

import { Tabs } from "expo-router";

import Icon from "@components/icon";

/**
 * ===============================
 * 하단 탭 Layout
 * ===============================
 */
const TabLayout = () => {
  // render
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="2nd"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="search" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
