import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const {
    nextUrl: { pathname },
  } = request;

  const isAppRoute = pathname.startsWith("/app");
  const isLoginRoute = pathname.startsWith("/login");

  const hasAuthCookie =
    request.cookies.getAll().some((cookie) =>
      cookie.name.includes("sb-")
    );

  if (isAppRoute && !hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/app";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/app/:path*", "/login"],
};