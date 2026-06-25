import { APP_CONFIG_TABLE_NAME } from "@libs/drizzle/schema";
import { createRepoError } from "@utils/errorHandler";
import { supabase } from "@utils/supabaseClient";

// 앱 설정 전체 조회
export const getAppConfigs = async () => {
  const { data, error } = await supabase
    .from(APP_CONFIG_TABLE_NAME)
    .select("id, key, value, description, version, value_type")
    .is("deleted_at", null);
  if (error) {
    throw createRepoError({
      code: "REPO/APP/GET_APP_CONFIGS",
      cause: error,
    });
  }
  return data ?? [];
};
// 앱 설정별 단건 조회
export const getAppConfigByKey = async ({ key }: { key: string }) => {
  const { data, error } = await supabase
    .from(APP_CONFIG_TABLE_NAME)
    .select("id, key, value, description, version, value_type")
    .eq("key", key)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) {
    throw createRepoError({
      code: "REPO/APP/GET_APP_CONFIG_BY_KEY",
      cause: error,
    });
  }
  return data;
};
