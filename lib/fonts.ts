import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Manrope, Vazirmatn } from "next/font/google";

// Self-hosted at build time by next/font — no runtime requests to Google.
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const fontVariables = [vazirmatn, plexArabic, manrope, plexMono].map((f) => f.variable).join(" ");
