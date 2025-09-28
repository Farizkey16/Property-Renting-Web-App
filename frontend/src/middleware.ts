import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJwt(token: string) {
  try {
    const base64 = token.split(".")[1];
    return JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!token || token.trim() === "") {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("from", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }

    const payload = decodeJwt(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const role = payload.role as string | undefined;

    if (role === "tenant") {
      if (pathname.startsWith("/dashboard/history")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    if (role === "user") {
      const allowed = [
        "/dashboard",
        "/dashboard/history",
        "/dashboard/bookings",
        "/dashboard/notifications",
        "/dashboard/booking-detail",
        "/dashboard/payment-page",
        "/dashboard/booking-confirmation/:bookingId"
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
