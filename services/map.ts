import type {
  PinGroupData,
  PinGroupInsert,
  PinInsert,
  PlaceData,
  PlaceInsert,
} from "@libs/drizzle/schema";
import {
  createPinGroupPins as createPinGroupPinsRepository,
  createPinGroup as createPinGroupRepository,
  createPin as createPinRepository,
  deletePinGroup as deletePinGroupRepository,
  deletePin as deletePinRepository,
  getPinByUserAndPlace as getPinByUserAndPlaceRepository,
  getPinGroupById as getPinGroupByIdRepository,
  getPinGroupsByUser as getPinGroupsByUserRepository,
  getPinsByUser as getPinsByUserRepository,
  updatePinGroup as updatePinGroupRepository,
} from "@repositories/pin";
import {
  getNaverGeocode as getNaverGeocodeRepository,
  getNaverReverseGeocode as getNaverReverseGeocodeRepository,
  getPinnedPlacesByUser as getPinnedPlacesByUserRepository,
  getPlaceByLocation as getPlaceByLocationRepository,
  getPlace as getPlaceRepository,
  searchKakaoPlaces as searchKakaoPlacesRepository,
  searchNaverPlaces as searchNaverPlacesRepository,
  upsertPlaceByLocation as upsertPlaceByLocationRepository,
  upsertPlacesByLocation as upsertPlacesByLocationRepository,
} from "@repositories/place";
import { handleServiceError } from "@utils/errorHandler";

export type TogglePinResult = "created" | "deleted" | "restored";

// 네이버 장소 검색
export const searchNaverPlaces = async ({
  placeName,
}: {
  placeName: string;
}) => {
  try {
    const response = await searchNaverPlacesRepository({ placeName });
    return response;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/SEARCH_NAVER_PLACES",
    });
  }
};

// 네이버 장소 코드 조회
export const getNaverGeocode = async ({
  query,
  coordinate,
}: {
  query: string;
  coordinate?: { latitude: number; longitude: number };
}) => {
  try {
    const response = await getNaverGeocodeRepository({ query, coordinate });
    return response;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/GET_NAVER_GEOCODE",
    });
  }
};

// 네이버 장소 역코드 조회
export const getNaverReverseGeocode = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const response = await getNaverReverseGeocodeRepository({
      latitude,
      longitude,
    });
    return response;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/GET_NAVER_REVERSE_GEOCODE",
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
}) => {
  try {
    const response = await searchKakaoPlacesRepository({
      query,
      coordinate,
      size,
      signal,
    });
    return response;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/SEARCH_KAKAO_PLACES",
    });
  }
};

// 유저가 핀한 장소 목록 (레포: pins + places embed)
export const getPinnedPlacesByUser = async ({
  userId,
}: {
  userId: string;
}): Promise<(PlaceData & { pinGroup?: PinGroupData | null })[]> => {
  try {
    return await getPinnedPlacesByUserRepository({ userId });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/GET_PINNED_PLACES_BY_USER",
    });
  }
};

// 단건 조회 (ID 기준)
export const getPlace = async ({ id }: { id: string }) => {
  try {
    const data = await getPlaceRepository({ id });
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/GET_PLACE",
    });
  }
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
  try {
    const data = await getPlaceByLocationRepository({
      name,
      x,
      y,
    });
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/GET_PLACE_BY_LOCATION",
    });
  }
};

// 지도 장소 생성 및 업데이트 (kakao place id 기준)
export const upsertPlaceByLocation = async (payload: PlaceInsert) => {
  try {
    const data = await upsertPlaceByLocationRepository(payload);
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/UPSERT_PLACE_BY_LOCATION",
    });
  }
};

// 지도 장소 다건 생성 및 업데이트 (kakao place id 기준)
export const upsertPlacesByLocation = async (payloads: PlaceInsert[]) => {
  try {
    const data = await upsertPlacesByLocationRepository(payloads);
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/UPSERT_PLACES_BY_LOCATION",
    });
  }
};

// 핀 생성
export const createPin = async (payload: PinInsert) => {
  try {
    const data = await createPinRepository(payload);
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/CREATE_PIN",
    });
  }
};

// 핀 목록 조회
export const getPinsByUser = async ({ userId }: { userId: string }) => {
  try {
    const data = await getPinsByUserRepository({ userId });
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/GET_PINS_BY_USER",
    });
  }
};

// 핀 단건 조회 (user id, place id 기준)
export const getPinByUserAndPlace = async ({
  userId,
  placeId,
}: {
  userId: string;
  placeId: string;
}) => {
  try {
    const data = await getPinByUserAndPlaceRepository({ userId, placeId });
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/GET_PIN_BY_USER_AND_PLACE",
    });
  }
};

// 핀 삭제
export const deletePin = async ({ pinId }: { pinId: string }) => {
  try {
    const data = await deletePinRepository({ pinId });
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/DELETE_PIN",
    });
  }
};

// 핀 그룹 생성
export const createPinGroup = async (payload: PinGroupInsert) => {
  try {
    const data = await createPinGroupRepository(payload);
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/CREATE_PIN_GROUP",
    });
  }
};

// 핀 그룹 목록 조회
export const getPinGroupsByUser = async ({ userId }: { userId: string }) => {
  try {
    const data = await getPinGroupsByUserRepository({ userId });
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/GET_PIN_GROUPS_BY_USER",
    });
  }
};

// 핀 그룹 단건 조회 (pin group id 기준)
export const getPinGroupById = async ({
  pinGroupId,
}: {
  pinGroupId: string;
}) => {
  try {
    const data = await getPinGroupByIdRepository({ pinGroupId });
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/GET_PIN_GROUP_BY_ID",
    });
  }
};

// 핀 그룹 수정
export const updatePinGroup = async ({
  pinGroupId,
  payload,
}: {
  pinGroupId: string;
  payload: Partial<PinGroupInsert>;
}) => {
  try {
    const data = await updatePinGroupRepository({ pinGroupId, payload });
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/UPDATE_PIN_GROUP",
    });
  }
};

// 핀 그룹 삭제
export const deletePinGroup = async ({
  pinGroupId,
}: {
  pinGroupId: string;
}) => {
  try {
    const result = await deletePinGroupRepository({ pinGroupId });
    return result;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/DELETE_PIN_GROUP",
    });
  }
};

export const createPinGroupPins = async ({
  payloads,
}: {
  payloads: { pinGroupId: string; pinId: string }[];
}) => {
  try {
    const data = await createPinGroupPinsRepository({ payloads });
    return data;
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/MAP/CREATE_PIN_GROUP_PINS",
    });
  }
};
