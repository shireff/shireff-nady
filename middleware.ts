import { NextRequest, NextResponse } from "next/server";

const MARKDOWN_ELIGIBLE_PATHS = [
  "/",
  "/projects",
  "/experiences",
  "/recommendations",
  "/contact",
];

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const pathname = request.nextUrl.pathname;

  // Redirect agents requesting text/markdown to the dedicated markdown route handler
  if (
    accept.includes("text/markdown") &&
    MARKDOWN_ELIGIBLE_PATHS.some(
      (p) => pathname === p || pathname.startsWith(p + "/"),
    )
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/markdown";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon|api/|.*\\.(?:ico|png|jpg|jpeg|svg|webp|gif|css|js|woff2?|ttf)).*)",
  ],
};
