import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // li_at is our persistent admin cookie
  const liAt = request.cookies.get('li_at')?.value;
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      // If already authenticated, redirect to dashboard
      if (liAt && isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // If no li_at cookie, redirect to login
    if (!liAt) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
