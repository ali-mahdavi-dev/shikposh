import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/profile', '/cart', '/wishlist', '/seller'];
const authRoutes = ['/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Prevent direct access to /offline route
  if (pathname === '/offline') {
    return NextResponse.redirect(new URL('/', request.url), 302);
  }

  // Get token from cookie or header
  const token =
    request.cookies.get('auth_token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to home if accessing auth routes with token
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/offline',
    '/profile/:path*',
    '/cart/:path*',
    '/wishlist/:path*',
    '/seller/:path*',
    '/auth/:path*',
  ],
};
