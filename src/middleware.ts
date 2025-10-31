import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Prevent direct access to /offline route
  // This page should only be served by Service Worker when offline
  if (request.nextUrl.pathname === '/offline') {
    return NextResponse.redirect(new URL('/', request.url), 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/offline',
};

