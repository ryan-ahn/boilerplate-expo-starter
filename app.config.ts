import version from "./version.json";

export const appConfig = {
  slug: "slug 입력",
  name: "name 입력",
  displayName: "displayName 입력",
  version: version.version,
  runtimeVersion: version.runtimeVersion,
  icon: "./assets/images/logo.png",
  orientation: "portrait",
  scheme: "scheme 입력",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "bundle identifier 입력",
    entitlements: {
      "com.apple.security.application-groups": ["group.bundle identifier 입력"],
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      CFBundleAllowMixedLocalizations: true,
      AppGroup: "group.bundle identifier 입력",
      AppGroupIdentifier: "group.bundle identifier 입력",
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: ["scheme 입력"],
          CFBundleTypeRole: "Editor",
        },
        {
          CFBundleURLSchemes: [
            "com.googleusercontent.apps.google client id 입력",
          ],
        },
      ],
      NSPhotoLibraryUsageDescription:
        "프로필 사진을 사용하기 위해 사진 라이브러리 접근이 필요합니다.",
      NSCameraUsageDescription:
        "프로필 사진 촬영을 위해 카메라 접근이 필요합니다.",
      NSMicrophoneUsageDescription:
        "검색시 음성 녹음을 위해 마이크 접근이 필요합니다.",
      NSLocationAlwaysAndWhenInUseUsageDescription:
        "사용자 주변의 위치 기반 서비스를 제공하기 위해 위치 정보를 사용합니다.",
      NSLocationWhenInUseUsageDescription:
        "지도에서 현재 위치를 표시하기 위해 위치 정보를 사용합니다.",
      NSLocationTemporaryUsageDescriptionDictionary: {
        "current-location":
          "정확한 현재 위치를 기반으로 지도 서비스를 제공하기 위해 사용합니다.",
      },
    },
    googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/logo.png",
        imageWidth: 140,
        resizeMode: "contain",
        backgroundColor: "#020202",
        dark: {
          backgroundColor: "#020202",
        },
      },
    ],
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "앱이 위치 기반 서비스를 제공하기 위해 항상 위치를 사용할 수 있도록 허용하시겠습니까?",
        locationWhenInUsePermission:
          "앱 사용 중 현재 위치 기반 서비스를 제공하기 위해 위치를 사용할 수 있도록 허용하시겠습니까?",
      },
    ],
    [
      "expo-share-extension",
      {
        activationRules: [{ type: "url", max: 1 }, { type: "text" }],
        excludedPackages: [
          "expo-dev-client",
          "expo-splash-screen",
          "expo-updates",
          "expo-font",
        ],
      },
    ],
    "expo-sqlite",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "project id 입력",
    },
  },
  owner: "ryan-ahn",
  updates: {
    url: "url 입력",
  },
  android: {
    package: "package name 입력",
  },
};

export default appConfig;
