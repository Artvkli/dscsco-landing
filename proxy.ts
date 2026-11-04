import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["farsi", "english", "arabic", "turkish"] as const;
type Locale = (typeof LOCALES)[number];

const DEFAULT_LOCALE: Locale = "farsi";
const LOCALE_COOKIE = "NEXT_LOCALE";

const LANGUAGE_MAP: Record<string, Locale> = {
    fa: "farsi",
    en: "english",
    ar: "arabic",
    tr: "turkish",
};

function isLocale(value: string): value is Locale {
    return LOCALES.includes(value as Locale);
}

function getBrowserLocale(header: string | null): Locale {
    if (!header) return DEFAULT_LOCALE;

    const languages = header
        .split(",")
        .map((item) => {
            const [language, quality] = item.trim().split(";q=");

            return {
                language: language.split("-")[0].toLowerCase(),
                quality: quality ? Number(quality) : 1,
            };
        })
        .sort((a, b) => b.quality - a.quality);

    for (const item of languages) {
        const locale = LANGUAGE_MAP[item.language];

        if (locale) {
            return locale;
        }
    }

    return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const firstSegment = pathname.split("/")[1];

    // Save the user's selected language.
    if (isLocale(firstSegment)) {
        const response = NextResponse.next();

        response.cookies.set(LOCALE_COOKIE, firstSegment, {
            path: "/",
            maxAge: 60 * 60 * 24 * 365,
            sameSite: "lax",
        });

        return response;
    }

    // Only detect language on the landing root.
    if (pathname !== "/") {
        return NextResponse.next();
    }

    const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value;

    const locale = isLocale(savedLocale ?? "")
        ? savedLocale
        : getBrowserLocale(request.headers.get("accept-language"));

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;

    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        "/",
        "/farsi/:path*",
        "/english/:path*",
        "/arabic/:path*",
        "/turkish/:path*",
    ],
};