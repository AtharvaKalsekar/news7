export default () => ({
  expo: {
    name: "News71",
    slug: "news-71",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/news71-logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/news71-logo.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.athar7a.news71",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "ca6df7b9-53d7-49af-b1af-f95ae1bc30c1",
      },
      environment: process.env.ENVIRONMENT,
    },
    owner: "athar7a",
  },
});
