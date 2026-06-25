import { StyleSheet } from "react-native";

import { getUnitToken } from "@theme/tokens";

export const screen = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

export const liquid = StyleSheet.create({
  hitArea: {
    padding: getUnitToken(8),
    borderRadius: getUnitToken(9999),
  },
});

export const flex = StyleSheet.create({
  full: {
    flex: 1,
  },
  shrink: {
    flexShrink: 1,
  },
  grow: {
    flexGrow: 1,
  },
  minWidth: {
    minWidth: 0,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifySpaceBetween: {
    justifyContent: "space-between",
  },
  justifySpaceAround: {
    justifyContent: "space-around",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  alignCenter: {
    alignItems: "center",
  },
  alignEnd: {
    alignItems: "flex-end",
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

export const box = StyleSheet.create({
  w100: {
    width: "100%",
  },
  h100: {
    height: "100%",
  },
});

export const gap = StyleSheet.create({
  g1: {
    gap: getUnitToken(1),
  },
  g2: {
    gap: getUnitToken(2),
  },
  g4: {
    gap: getUnitToken(4),
  },
  g6: {
    gap: getUnitToken(6),
  },
  g8: {
    gap: getUnitToken(8),
  },
  g10: {
    gap: getUnitToken(10),
  },
  g12: {
    gap: getUnitToken(12),
  },
  g14: {
    gap: getUnitToken(14),
  },
  g16: {
    gap: getUnitToken(16),
  },
  g18: {
    gap: getUnitToken(18),
  },
  g20: {
    gap: getUnitToken(20),
  },
  g22: {
    gap: getUnitToken(22),
  },
  g24: {
    gap: getUnitToken(24),
  },
  g28: {
    gap: getUnitToken(28),
  },
  g32: {
    gap: getUnitToken(32),
  },
  g40: {
    gap: getUnitToken(40),
  },
  g48: {
    gap: getUnitToken(48),
  },
  g56: {
    gap: getUnitToken(56),
  },
});
