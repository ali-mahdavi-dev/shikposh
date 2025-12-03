import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware } from '@/lib/security/middleware/auth.middleware';

// Protected routes that require authentication
const protectedRoutes = ['/profile', '/cart', '/wishlist', '/seller', '/orders'];
const authRoutes = ['/auth'];
const adminRoutes = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Prevent direct access to /offline route
  if (pathname === '/offline') {
    return NextResponse.redirect(new URL('/', request.url), 302);
  }

  // Use enterprise auth middleware for protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authResponse = authMiddleware(request);
    if (authResponse) {
      return authResponse;
    }
  }

  // Note: Full authentication check is handled client-side since tokens are stored in localStorage
  // which is not accessible in server-side middleware
  // Protected routes will check authentication in their client components using auth guards

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
