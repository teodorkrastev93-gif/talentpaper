// /middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["en", "bg", "ro", "es", "fr", "de"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next internals & static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Already localized? continue
  if (LOCALES.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  // Redirect to default locale (/en)
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/:path*"
};
