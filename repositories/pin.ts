import type {
  PinData,
  PinGroupData,
  PinGroupInsert,
  PinInsert,
} from "@libs/drizzle/schema";
import {
  PIN_GROUP_PIN_TABLE_NAME,
  PIN_GROUP_TABLE_NAME,
  PIN_TABLE_NAME,
} from "@libs/drizzle/schema";
import { createRepoError } from "@utils/errorHandler";
import { supabase } from "@utils/supabaseClient";

export type PinGroupWithPinsData = PinGroupData & {
  pinCount: number;
};

type PinGroupWithPinsRow = PinGroupData & {
  pin_count: number | null;
};

// 핀 생성
export const createPin = async (payload: PinInsert) => {
  const { data, error } = await supabase
    .from(PIN_TABLE_NAME)
    .insert(payload)
    .select("*")
    .maybeSingle();
  if (error) {
    throw createRepoError({
      code: "REPO/PIN/CREATE_PIN",
      cause: error,
    });
  }
  return data as PinData | null;
};

// 핀 목록 조회 (user id 기준)
export const getPinsByUser = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase
    .from(PIN_TABLE_NAME)
    .select("*")
    .eq("user_id", userId)
    .is("deleted_at", null);
  if (error) {
    throw createRepoError({
      code: "REPO/PIN/GET_PINS_BY_USER",
      cause: error,
    });
  }
  return (data ?? []) as PinData[];
};

// 핀 단건 조회 (user id, place id 기준)
export const getPinByUserAndPlace = async ({
  userId,
  placeId,
}: {
  userId: string;
  placeId: string;
}) => {
  const { data, error } = await supabase
    .from(PIN_TABLE_NAME)
    .select("*")
    .eq("user_id", userId)
    .eq("place_id", placeId)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) {
    throw createRepoError({
      code: "REPO/PIN/GET_PIN_BY_USER_AND_PLACE",
      cause: error,
    });
  }
  return data as PinData | null;
};

// 핀 삭제
export const deletePin = async ({ pinId }: { pinId: string }) => {
  const deletedAt = new Date();
  const { error } = await supabase
    .from(PIN_TABLE_NAME)
    .update({ deleted_at: deletedAt })
    .eq("id", pinId);
  if (error) {
    throw createRepoError({
      code: "REPO/PIN/DELETE_PIN",
      cause: error,
    });
  }
  const { error: pinGroupPinsDeleteError } = await supabase
    .from(PIN_GROUP_PIN_TABLE_NAME)
    .update({ deleted_at: deletedAt })
    .eq("pin_id", pinId);
  if (pinGroupPinsDeleteError) {
    throw createRepoError({
      code: "REPO/PIN/DELETE_PIN",
      cause: pinGroupPinsDeleteError,
    });
  }
  return true;
};

// 핀 그룹 생성
export const createPinGroup = async (payload: PinGroupInsert) => {
  const { data, error } = await supabase
    .from(PIN_GROUP_TABLE_NAME)
    .insert(payload)
    .select("*")
    .maybeSingle();
  if (error) {
    throw createRepoError({
      code: "REPO/PIN/CREATE_PIN_GROUP",
      cause: error,
    });
  }
  return data as PinGroupData | null;
};

// 핀 그룹 목록 조회 (user id 기준)
export const getPinGroupsByUser = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase.rpc(
    "get_pin_groups_with_alive_count",
    {
      p_user_id: userId,
    },
  );
  if (error) {
    throw createRepoError({
      code: "REPO/PIN/GET_PIN_GROUPS_BY_USER",
      cause: error,
    });
  }
  return ((data ?? []) as PinGroupWithPinsRow[]).map(item => ({
    ...item,
    pinCount: Number(item.pin_count ?? 0),
  })) as PinGroupWithPinsData[];
};

// 핀 그룹 단건 조회 (pin group id 기준)
export const getPinGroupById = async ({
  pinGroupId,
}: {
  pinGroupId: string;
}) => {
  const { data, error } = await supabase
    .from(PIN_GROUP_TABLE_NAME)
    .select("*")
    .eq("id", pinGroupId)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) {
    throw createRepoError({
      code: "REPO/PIN/GET_PIN_GROUP_BY_ID",
      cause: error,
    });
  }
  return data as PinGroupData;
};

// 핀 그룹 수정
export const updatePinGroup = async ({
  pinGroupId,
  payload,
}: {
  pinGroupId: string;
  payload: Partial<PinGroupInsert>;
}) => {
  const { error } = await supabase
    .from(PIN_GROUP_TABLE_NAME)
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pinGroupId)
    .is("deleted_at", null);
  if (error) {
    throw createRepoError({
      code: "REPO/PIN/UPDATE_PIN_GROUP",
      cause: error,
    });
  }
  return true;
};

// 핀 그룹 삭제
export const deletePinGroup = async ({
  pinGroupId,
}: {
  pinGroupId: string;
}) => {
  const deletedAt = new Date();
  const { error } = await supabase
    .from(PIN_GROUP_TABLE_NAME)
    .update({ deleted_at: deletedAt })
    .eq("id", pinGroupId);
  if (error) {
    throw createRepoError({
      code: "REPO/PIN/DELETE_PIN_GROUP",
      cause: error,
    });
  }
  const { error: pinGroupPinsDeleteError } = await supabase
    .from(PIN_GROUP_PIN_TABLE_NAME)
    .update({ deleted_at: deletedAt })
    .eq("pin_group_id", pinGroupId);
  if (pinGroupPinsDeleteError) {
    throw createRepoError({
      code: "REPO/PIN/DELETE_PIN_GROUP",
      cause: pinGroupPinsDeleteError,
    });
  }
  return true;
};

// 핀 그룹 핀 생성
export const createPinGroupPins = async ({
  payloads,
}: {
  payloads: { pinGroupId: string; pinId: string }[];
}) => {
  const { error } = await supabase.from(PIN_GROUP_PIN_TABLE_NAME).insert(
    payloads.map(payload => ({
      pin_group_id: payload.pinGroupId,
      pin_id: payload.pinId,
    })),
  );
  if (error) {
    throw createRepoError({
      code: "REPO/PIN/CREATE_PIN_GROUP_PINS",
      cause: error,
    });
  }
  return true;
};
