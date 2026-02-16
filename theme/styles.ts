import { StyleSheet } from "react-native";

import { getUnitToken } from "@theme/tokens";

export const flex = StyleSheet.create({
  full: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  start: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  end: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  spaceStart: {
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  spaceCenter: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  aroundCenter: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  startEnd: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  startCenter: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  endStart: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  endCenter: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  centerStart: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  centerEnd: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export const spacing = StyleSheet.create({
  gap1: {
    gap: getUnitToken(1),
  },
  gap2: {
    gap: getUnitToken(2),
  },
  gap4: {
    gap: getUnitToken(4),
  },
  gap6: {
    gap: getUnitToken(6),
  },
  gap8: {
    gap: getUnitToken(8),
  },
  gap12: {
    gap: getUnitToken(12),
  },
  gap16: {
    gap: getUnitToken(16),
  },
  gap20: {
    gap: getUnitToken(20),
  },
  gap24: {
    gap: getUnitToken(24),
  },
  gap32: {
    gap: getUnitToken(32),
  },
  gap40: {
    gap: getUnitToken(40),
  },
});
