// repositories/link.ts
import axios from "axios";

import { createRepoError } from "@utils/errorHandler";

// 링크 존재 여부 확인
export const checkUrlExists = async (url: string): Promise<boolean> => {
  try {
    new URL(url);
  } catch {
    return false;
  }
  try {
    const headResponse = await axios.head(url, {
      maxRedirects: 3,
      timeout: 5000,
      validateStatus: () => true,
    });
    if (headResponse.status >= 200 && headResponse.status < 400) {
      return true;
    }
    if (headResponse.status === 405 || headResponse.status === 403) {
      const getResponse = await axios.get(url, {
        maxRedirects: 3,
        timeout: 5000,
        validateStatus: () => true,
      });
      return getResponse.status >= 200 && getResponse.status < 400;
    }
    return false;
  } catch (error) {
    throw createRepoError({
      code: "REPO/LINK/CHECK_URL_EXISTS",
      cause: error,
      context: { url },
    });
  }
};
