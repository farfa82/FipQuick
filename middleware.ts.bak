import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteggiamo SOLO l'area app
  if (!pathname.startsWith("/app")) {
    return NextResponse.next();
  }

  // Se non c'è sessione, rimandiamo al login
  // (qui usiamo un controllo semplice: cookie supabase)
  const hasSbCookie =
    request.cookies.get("sb-access-token") ||
    request.cookies.get("sb-refresh-token") ||
    request.cookies.get("supabase-auth-token");

  if (!hasSbCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
