import { useSupabaseStore } from "@stores/supabase";

export function useSupabase() {
  const status = useSupabaseStore(state => state.status);
  const error = useSupabaseStore(state => state.error);
  return { status, error };
}
