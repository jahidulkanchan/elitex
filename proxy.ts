import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isAllow = false;
  if (!isAllow) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/about/:path*",
};
