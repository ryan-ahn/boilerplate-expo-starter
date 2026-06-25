import { createRepoError } from "@utils/errorHandler";
import { supabase } from "@utils/supabaseClient";

export type UploadStorageOptions = {
  contentType?: string;
  upsert?: boolean;
};

// 업로드 URL 생성
export const createSignedUploadUrl = async (
  bucket: string,
  path: string,
  options: { upsert?: boolean } = {},
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(path, { upsert: options.upsert ?? true });
  if (error) {
    throw createRepoError({
      code: "REPO/STORAGE/CREATE_SIGNED_URL",
      cause: error,
      context: { bucket, path },
    });
  }
  if (!data?.signedUrl) {
    throw createRepoError({
      code: "REPO/STORAGE/CREATE_SIGNED_URL",
      message: "No signed URL returned",
      context: { bucket, path },
    });
  }
  return { signedUrl: data.signedUrl };
};

// 공개 URL 받기
export const getPublicUrl = async ({
  bucket,
  path,
}: {
  bucket: string;
  path: string;
}) => {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);
  return `${publicUrl}?v=${Date.now()}`;
};
