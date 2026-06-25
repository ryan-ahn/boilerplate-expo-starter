import axios from "axios";

import type {
  PinGroupData,
  PlaceData,
  PlaceInsert,
} from "@libs/drizzle/schema";
import {
  PIN_GROUP_PIN_TABLE_NAME,
  PIN_GROUP_TABLE_NAME,
  PIN_TABLE_NAME,
  PLACE_TABLE_NAME,
} from "@libs/drizzle/schema";
import { createRepoError } from "@utils/errorHandler";
import { supabase } from "@utils/supabaseClient";
import { asEmbeddedRows, filterAliveRows } from "@utils/supabaseEmbed";

export type SearchNaverPlacesData = {
  address: string;
  category: string;
  description: string;
  link: string;
  mapx: string;
  mapy: string;
  roadAddress: string;
  telephone: string;
  title: string;
}[];

export type SearchKakaoPlacesData = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: "";
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}[];

export type GetGeocodeData = {
  addresses: {
    addressElements: {
      code: number;
      longName: string;
      shortName: string;
      types: string[];
    }[];
    distance: number;
    englishAddress: string;
    jibunAddress: string;
    roadAddress: string;
    x: string;
    y: string;
  }[];
  errorMessage: string;
  meta: {
    count: number;
    page: number;
    totalCount: number;
  };
  status: string;
};

export type PinnedPlaceData = PlaceData & { pinGroup?: PinGroupData | null };

// 네이버 장소 검색
export const searchNaverPlaces = async ({
  placeName,
}: {
  placeName: string;
}): Promise<SearchNaverPlacesData> => {
  try {
    const response = await axios.get(
      `https://openapi.naver.com/v1/search/local.json`,
      {
        params: {
          query: placeName,
          display: 5,
        },
        headers: {
          "X-Naver-Client-Id":
            process.env.EXPO_PUBLIC_NAVER_DEVELOPER_CLIENT_ID,
          "X-Naver-Client-Secret":
            process.env.EXPO_PUBLIC_NAVER_DEVELOPER_CLIENT_SECRET,
        },
      },
    );
    return response.data.items;
  } catch (error) {
    throw createRepoError({
      code: "REPO/PLACE/SEARCH_NAVER_PLACES",
      cause: error,
    });
  }
};

// 네이버 장소 코드 조회
export const getNaverGeocode = async ({
  query,
  coordinate,
  filter,
  language,
  page,
  count,
}: {
  query: string;
  coordinate?: { latitude: number; longitude: number };
  filter?: number;
  language?: "kor" | "eng";
  page?: number;
  count?: number;
}): Promise<GetGeocodeData> => {
  try {
    const response = await axios.get(
      "https://maps.apigw.ntruss.com/map-geocode/v2/geocode",
      {
        params: {
          query,
          coordinate,
          filter,
          language,
          page,
          count,
        },
        headers: {
          Accept: "application/json",
          "X-NCP-APIGW-API-KEY-ID":
            process.env.EXPO_PUBLIC_NAVER_CLOUD_CLIENT_ID,
          "X-NCP-APIGW-API-KEY":
            process.env.EXPO_PUBLIC_NAVER_CLOUD_CLIENT_SECRET,
        },
      },
    );
    if (response.data.errorMessage) {
      throw createRepoError({
        code: "REPO/PLACE/GET_NAVER_GEOCODE",
        cause: response.data.errorMessage,
      });
    }
    return response.data.addresses;
  } catch (error) {
    throw createRepoError({
      code: "REPO/PLACE/GET_NAVER_GEOCODE",
      cause: error,
    });
  }
};

// 네이버 장소 코드 조회
export const getNaverReverseGeocode = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const response = await axios.get(
      "https://maps.apigw.ntruss.com/map-reversegeocode/v2/gc",
      {
        params: {
          coords: `${longitude},${latitude}`,
          output: "json",
        },
        headers: {
          Accept: "application/json",
          "X-NCP-APIGW-API-KEY-ID":
            process.env.EXPO_PUBLIC_NAVER_CLOUD_CLIENT_ID,
          "X-NCP-APIGW-API-KEY":
            process.env.EXPO_PUBLIC_NAVER_CLOUD_CLIENT_SECRET,
        },
      },
    );
    const region = response.data.results?.[1]?.region;
    const area1 = region?.area1?.name;
    const area2 = region?.area2?.name;
    const area3 = region?.area3?.name;
    const area4 = region?.area4?.name;
    return [area1, area2, area3, area4];
  } catch (error) {
    throw createRepoError({
      code: "REPO/PLACE/GET_NAVER_REVERSE_GEOCODE",
      cause: error,
    });
  }
};

// 카카오 장소 검색
export const searchKakaoPlaces = async ({
  query,
  coordinate,
  size,
  signal,
}: {
  query: string;
  coordinate?: { latitude: number; longitude: number };
  size?: number;
  signal?: AbortSignal;
}): Promise<SearchKakaoPlacesData> => {
  try {
    const response = await axios.get(
      "https://dapi.kakao.com/v2/local/search/keyword.json",
      {
        params: {
          query,
          ...(coordinate
            ? {
                x: coordinate.longitude.toString(),
                y: coordinate.latitude.toString(),
              }
            : {}),
          size: size ?? 10,
        },
        headers: {
          Authorization: `KakaoAK ${process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY}`,
        },
        signal,
      },
    );
    return response.data.documents;
  } catch (error) {
    if ((error as { code?: string })?.code === "ERR_CANCELED") {
      throw createRepoError({
        code: "REPO/PLACE/SEARCH_KAKAO_PLACES/CANCELED",
        cause: error,
      });
    }
    throw createRepoError({
      code: "REPO/PLACE/SEARCH_KAKAO_PLACES",
      cause: error,
    });
  }
};

// 장소 단건 조회 (ID 기준)
export const getPlace = async ({ id }: { id: string }) => {
  const { data, error } = await supabase
    .from(PLACE_TABLE_NAME)
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) {
    throw createRepoError({
      code: "REPO/PLACE/GET_PLACE",
      cause: error,
    });
  }

  return data as PlaceData | null;
};

// 유저가 핀한 장소 목록 (pins → places embed 한 번에 조회)
export const getPinnedPlacesByUser = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase
    .from(PIN_TABLE_NAME)
    .select(
      `*, ${PLACE_TABLE_NAME}(*), ${PIN_GROUP_PIN_TABLE_NAME}(*, ${PIN_GROUP_TABLE_NAME}(*))`,
    )
    .eq("user_id", userId)
    .is("deleted_at", null);
  if (error) {
    throw createRepoError({
      code: "REPO/PLACE/GET_PINNED_PLACES_BY_USER",
      cause: error,
    });
  }
  const rows = data ?? [];
  const places: (PlaceData & { pinGroup?: PinGroupData | null })[] = [];
  for (const row of rows) {
    const place = filterAliveRows(asEmbeddedRows(row.places))[0];
    if (!place) continue;
    const junctions = filterAliveRows(asEmbeddedRows(row.pin_group_pins));
    junctions.sort((a, b) => {
      const ta = (a as { created_at?: string }).created_at ?? "";
      const tb = (b as { created_at?: string }).created_at ?? "";
      return String(ta).localeCompare(String(tb));
    });
    const firstMappedGroup = junctions[0]?.pin_groups;
    const pinGroup =
      filterAliveRows(asEmbeddedRows(firstMappedGroup))[0] ?? null;
    places.push({
      ...place,
      pinGroup,
    });
  }
  return places;
};

// 장소 단건 조회 (위치 기준)
export const getPlaceByLocation = async ({
  name,
  x,
  y,
}: {
  name: string;
  x: string;
  y: string;
}) => {
  const { data, error } = await supabase
    .from(PLACE_TABLE_NAME)
    .select("*")
    .eq("name", name)
    .eq("x", x)
    .eq("y", y)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) {
    throw createRepoError({
      code: "REPO/PLACE/GET_PLACE_BY_LOCATION",
      cause: error,
    });
  }
  return data as PlaceData | null;
};

// 장소 생성 및 업데이트 (kakao place id 기준)
export const upsertPlaceByLocation = async (payload: PlaceInsert) => {
  const { data, error } = await supabase
    .from(PLACE_TABLE_NAME)
    .upsert(payload, {
      onConflict: "kakao_place_id",
    })
    .select("*")
    .maybeSingle();
  if (error) {
    throw createRepoError({
      code: "REPO/PLACE/UPSERT_PLACE_BY_LOCATION",
      cause: error,
    });
  }
  return data as PlaceData | null;
};

// 장소 다건 생성 및 업데이트 (kakao place id 기준)
export const upsertPlacesByLocation = async (payloads: PlaceInsert[]) => {
  if (payloads.length <= 0) return [];
  const { data, error } = await supabase
    .from(PLACE_TABLE_NAME)
    .upsert(payloads, {
      onConflict: "kakao_place_id",
    })
    .select("*");
  if (error) {
    throw createRepoError({
      code: "REPO/PLACE/UPSERT_PLACES_BY_LOCATION",
      cause: error,
    });
  }
  return (data ?? []) as PlaceData[];
};
