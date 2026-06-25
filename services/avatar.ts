import { FileSystemUploadType, uploadAsync } from "expo-file-system/legacy";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

import { createSignedUploadUrl, getPublicUrl } from "@repositories/storage";
import { handleServiceError } from "@utils/errorHandler";

const AVATAR_BUCKET = "user_avatars";
const AVATAR_EXT = "jpg";
const AVATAR_MAX_SIZE = 512;
const AVATAR_COMPRESS = 0.85;

// 새로운 아바타 업로드
export const uploadNewAvatar = async ({
  userId,
  fileUri,
}: {
  userId: string;
  fileUri: string;
}): Promise<string> => {
  try {
    const imageRef = await ImageManipulator.manipulate(fileUri)
      .resize({ width: AVATAR_MAX_SIZE })
      .renderAsync();
    const { uri } = await imageRef.saveAsync({
      compress: AVATAR_COMPRESS,
      format: SaveFormat.JPEG,
    });
    const path = `${userId}.${AVATAR_EXT}`;
    const { signedUrl } = await createSignedUploadUrl(AVATAR_BUCKET, path, {
      upsert: true,
    });
    const result = await uploadAsync(signedUrl, uri, {
      httpMethod: "PUT",
      uploadType: FileSystemUploadType.BINARY_CONTENT,
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
    if (result.status < 200 || result.status >= 300) {
      throw new Error(`Upload failed: ${result.status}`);
    }
    return getPublicUrl({ bucket: AVATAR_BUCKET, path });
  } catch (error) {
    handleServiceError(error, {
      code: "SERVICE/AVATAR/UPLOAD_NEW_AVATAR",
      context: { userId },
    });
  }
};
