import version from "./version.json";

export const appConfig = {
  slug: "noru",
  name: "noru",
  displayName: "noru",
  version: version.version,
  runtimeVersion: version.runtimeVersion,
  icon: "./assets/images/logo.png",
  orientation: "portrait",
  scheme: "noru",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "me.noonu.noru",
    entitlements: {
      "com.apple.security.application-groups": ["group.me.noonu.noru"],
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      CFBundleAllowMixedLocalizations: true,
      AppGroup: "group.me.noonu.noru",
      AppGroupIdentifier: "group.me.noonu.noru",
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: ["noru"],
          CFBundleTypeRole: "Editor",
        },
        {
          CFBundleURLSchemes: [
            "com.googleusercontent.apps.143770688861-rr13gp7rd8tk97sv23dpgn474d2v20tb",
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
      "expo-build-properties",
      {
        ios: {
          extraPods: [{ name: "AppCheckCore", version: "11.2.0" }],
        },
      },
    ],
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
    "expo-sqlite",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "321a8bf2-5cf5-4024-bf6e-961106f9a5c0",
    },
  },
  owner: "ryan-ahn",
  updates: {
    url: "https://u.expo.dev/321a8bf2-5cf5-4024-bf6e-961106f9a5c0",
  },
  android: {
    package: "me.noonu.noru",
  },
};

export default appConfig;
