import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  let isAdmin = false;

  if (token) {
    try {
      const payloadBase64 = token.split('.')[1];
      if (payloadBase64) {
        const decoded = JSON.parse(atob(payloadBase64));
        if (decoded.isAdmin) {
          isAdmin = true;
        }
      }
    } catch (err) {
      console.error("Middleware decode error", err);
    }
  }

  // 1. If the user IS logged in and tries to go to the login page -> Redirect to dashboard
  if (isLoginPage && isAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // 2. If the user is NOT logged in and tries to go anywhere else in /admin -> Redirect home/login
  if (!isLoginPage && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};