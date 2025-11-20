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

  // Note: Authentication check is handled client-side since tokens are stored in localStorage
  // which is not accessible in server-side middleware
  // Protected routes will check authentication in their client components

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
