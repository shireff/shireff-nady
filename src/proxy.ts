import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define admin paths that require authentication
  const isAdminPath = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  if (isAdminPath && !isLoginPage) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      // Not authenticated, redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      // Pass the original URL as a callback if needed
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already authenticated and trying to access login page, redirect to dashboard
  if (isLoginPage) {
    const token = request.cookies.get('token')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
