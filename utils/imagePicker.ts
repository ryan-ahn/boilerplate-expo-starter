import { Alert } from "react-native";

import * as Picker from "react-native-image-picker";

export const openImagePicker = async ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return new Promise<Picker.Asset[]>((resolve, reject) => {
    Alert.alert(
      title,
      message,
      [
        { text: "취소", style: "cancel", onPress: () => reject() },
        {
          text: "카메라",
          onPress: () => launchCamera().then(resolve).catch(reject),
        },
        {
          text: "갤러리",
          onPress: () => launchImageLibrary().then(resolve).catch(reject),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => reject(),
      },
    );
  });
};

export const launchCamera = () => {
  return new Promise<Picker.Asset[]>((resolve, reject) => {
    Picker.launchCamera(
      {
        maxWidth: 2048,
        maxHeight: 2048,
        mediaType: "photo",
      },
      response => {
        if (response.didCancel) {
          reject();
        } else if (response.errorCode) {
          reject(response.errorCode);
        } else {
          resolve(response.assets);
        }
      },
    );
  });
};

export const launchImageLibrary = () => {
  return new Promise<Picker.Asset[]>((resolve, reject) => {
    Picker.launchImageLibrary(
      {
        maxWidth: 2048,
        maxHeight: 2048,
        mediaType: "photo",
      },
      response => {
        if (response.didCancel) {
          reject("cancel");
        } else if (response.errorCode) {
          reject(response.errorCode);
        } else if (response.errorMessage) {
          reject();
        } else {
          resolve(response.assets);
        }
      },
    );
  });
};

export const launchImageMultipleLibrary = (limit: number) => {
  return new Promise<Picker.Asset[]>((resolve, reject) => {
    Picker.launchImageLibrary(
      {
        selectionLimit: limit,
        maxWidth: 2048,
        maxHeight: 2048,
        mediaType: "photo",
      },
      response => {
        if (response.didCancel) {
          reject("cancel");
        } else if (response.errorCode) {
          reject(response.errorCode);
        } else if (response.errorMessage) {
          reject();
        } else {
          resolve(response.assets);
        }
      },
    );
  });
};
