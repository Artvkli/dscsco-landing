
import localFont from "next/font/local";

const vazirmatn = localFont({
  src: "../public/fonts/Vazirmatn.ttf",
  variable: "--font-vazirmatn",
  display: "swap",
  weight: "100 900",
  preload: true,
});

const plexArabic = localFont({
  src: "../public/fonts/IBMPlexSansArabic-Regular.ttf",
  variable: "--font-plex-arabic",
  display: "swap",
  weight: "400",
  preload: false,
});

const manrope = localFont({
  src: "../public/fonts/Manrope.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
  preload: false,
});

const plexMono = localFont({
  src: "../public/fonts/IBMPlexMono-Regular.ttf",
  variable: "--font-mono",
  display: "swap",
  weight: "400",
  preload: false,
});

export const fontVariables = [
  vazirmatn,
  plexArabic,
  manrope,
  plexMono,
]
  .map((font) => font.variable)
  .join(" ");
