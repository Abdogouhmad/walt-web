export type ApkVariant = {
  id: "arm64-v8a" | "armeabi-v7a" | "universal";
  label: string;
  description: string;
  url: string;
  recommended?: boolean;
};

export const APK_VARIANTS: ApkVariant[] = [
  {
    id: "universal",
    label: "Universal",
    description: "Works on all Android devices",
    url: "https://github.com/Abdogouhmad/walt/releases/download/v0.6.0/walt-v0.6.0-universal.apk",
    recommended: true,
  },
  {
    id: "arm64-v8a",
    label: "arm64-v8a",
    description: "For modern 64-bit phones (most devices)",
    url: "https://github.com/Abdogouhmad/walt/releases/download/v0.6.0/walt-v0.6.0-arm64-v8a.apk",
  },
  {
    id: "armeabi-v7a",
    label: "armeabi-v7a",
    description: "For older 32-bit devices",
    url: "https://github.com/Abdogouhmad/walt/releases/download/v0.6.0/walt-v0.6.0-armeabi-v7a.apk",
  },
];