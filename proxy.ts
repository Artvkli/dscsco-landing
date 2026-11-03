
import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["fa", "en", "ar"] as const;
type Locale = (typeof LOCALES)[number];

const DEFAULT_LOCALE: Locale = "fa";
const LOCALE_COOKIE = "NEXT_LOCALE";

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
        if (isLocale(item.language)) {
            return item.language;
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
    matcher: ["/", "/fa/:path*", "/en/:path*", "/ar/:path*"],
};
