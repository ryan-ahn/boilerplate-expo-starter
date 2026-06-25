import axios from "axios";

import { createRepoError } from "@utils/errorHandler";

const IFRAMELY_BASE = "https://iframe.ly/api/iframely";

const IFRAMELY_CLIENT_KEY = process.env.EXPO_PUBLIC_IFRAMELY_CLIENT_KEY;

export type MediaType =
  | "instagram-post"
  | "instagram-reel"
  | "youtube-shorts"
  | "youtube-video"
  | "facebook-post"
  | "tiktok-video"
  | "website";

export type EmbedMeta = {
  title?: string;
  description?: string;
  site?: string;
  author?: string;
  author_url?: string;
  canonical?: string;
  duration?: number;
  date?: string;
  medium?: MediaType;
  [key: string]: unknown;
};

export type EmbedPlayerLink = {
  href: string;
  type: string;
  rel?: string[];
  html?: string;
  media?: { "aspect-ratio"?: number };
};

export type EmbedIframelyData = {
  id?: string;
  url?: string;
  rel?: string[];
  html?: string;
  meta?: EmbedMeta;
  links?: {
    player?: EmbedPlayerLink[];
    thumbnail?: {
      href: string;
      media?: { width?: number; height?: number };
    }[];
    [key: string]: unknown;
  };
  status?: number;
  error?: string;
};

export const getEmbedData = async ({
  url,
  type,
}: {
  url: string;
  type: "media" | "thumbnail";
}): Promise<EmbedIframelyData> => {
  if (!IFRAMELY_CLIENT_KEY) {
    throw createRepoError({
      code: "REPO/EMBED/GET_EMBED_DATA",
      message: "Iframely client key is not configured",
    });
  }
  try {
    const encodedUrl = encodeURIComponent(url);
    const { data } = await axios.get<EmbedIframelyData>(
      `${IFRAMELY_BASE}?url=${encodedUrl}&key=${IFRAMELY_CLIENT_KEY}&ssl=1&omit_script=1&iframe=card&media=${type === "media" ? "1" : "0"}`,
      { timeout: 10000 },
    );
    if (data.status && data.status >= 400) {
      throw createRepoError({
        code: "REPO/EMBED/GET_EMBED_DATA",
        message: data.error ?? `Iframely error: ${data.status}`,
        context: { status: data.status, url },
      });
    }
    return data;
  } catch (error) {
    throw createRepoError({
      code: "REPO/EMBED/GET_EMBED_DATA",
      cause: error,
      context: { url },
    });
  }
};
