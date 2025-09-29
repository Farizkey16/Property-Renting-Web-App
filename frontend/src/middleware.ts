import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";

function decodeJwt(token: string): JwtPayload | null {
  try {
    const secret = process.env.TOKEN_KEY;
    if (!secret) return null;
    return verify(token, secret) as JwtPayload;
  } catch (errror) {
    console.log(errror);
    return null;
  }
}

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1]; // Bearer <token>
  const { pathname, search } = req.nextUrl;

  // Proteksi semua route dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("from", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }

    const payload = decodeJwt(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const role = payload.role as string | undefined;

    // Tenant tidak boleh akses /dashboard/history
    if (role === "tenant" && pathname.startsWith("/dashboard/history")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // User hanya boleh akses halaman tertentu
    if (role === "user") {
      const allowed = [
        "/dashboard",
        "/dashboard/history",
        "/dashboard/bookings",
        "/dashboard/notifications",
        "/dashboard/booking-detail",
        "/dashboard/payment-page",
        "/dashboard/booking-confirmation",
      ];

      const isAllowed = allowed.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`)
      );

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
