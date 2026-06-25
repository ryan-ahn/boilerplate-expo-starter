import {
  type EmbedIframelyData,
  getEmbedData as getEmbedDataRepository,
} from "@repositories/embed";
import { checkUrlExists as checkUrlExistsRepository } from "@repositories/link";
import { handleServiceError } from "@utils/errorHandler";

// 콘텐츠 조회
export const getEmbedData = async ({
  url,
  type,
}: {
  type: "media" | "thumbnail";
  url: string;
}): Promise<EmbedIframelyData> => {
  try {
    return await getEmbedDataRepository({ url, type });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/EMBED/GET_EMBED_DATA",
    });
  }
};

// 썸네일 조회
export const getEmbedThumbnail = async ({
  url,
}: {
  url: string;
}): Promise<EmbedIframelyData> => {
  try {
    return await getEmbedDataRepository({ url, type: "thumbnail" });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/EMBED/GET_EMBED_THUMBNAIL",
    });
  }
};

// 링크 존재 여부 확인
export const checkEmbedUrlExists = async (url: string): Promise<boolean> => {
  try {
    return await checkUrlExistsRepository(url);
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/LINK/CHECK_URL_EXISTS",
    });
  }
};
