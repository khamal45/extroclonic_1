import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/images/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const uid = request.cookies.get("uid")?.value;

  if (pathname.startsWith("/") && pathname.endsWith("/")) {
    if (!uid) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } else if (!uid) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
