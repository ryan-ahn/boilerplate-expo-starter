import { useContext } from "react";

import { AuthContext } from "@providers/auth";

export function useAuth() {
  // contexts
  const ctx = useContext(AuthContext);
  // checks
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  // return
  return ctx;
}
