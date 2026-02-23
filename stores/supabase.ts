import { create } from "zustand";

import { supabase, supabaseEnv } from "@utils/supabase";

export type ConnectionStatus = "checking" | "connected" | "error";

interface SupabaseState {
  status: ConnectionStatus;
  error: string | null;
  checkConnection: () => void;
}

export const useSupabaseStore = create<SupabaseState>(set => ({
  status: "checking",
  error: null,
  checkConnection: () => {
    if (!supabaseEnv.isConfigured) {
      set({ status: "error", error: "환경 변수 미설정" });
      return;
    }
    supabase.auth
      .getSession()
      .then(() => set({ status: "connected", error: null }))
      .catch((err: Error) =>
        set({
          status: "error",
          error: err instanceof Error ? err.message : String(err),
        }),
      );
  },
}));
