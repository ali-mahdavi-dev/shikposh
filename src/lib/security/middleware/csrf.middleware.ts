import type { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * CSRF Token Generator
 */
export function generateCsrfToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * CSRF Middleware
 * Validates CSRF tokens for state-changing requests
 */
export function csrfMiddleware(request: NextRequest): NextResponse | null {
  // Only check CSRF for state-changing methods
  const stateChangingMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  if (!stateChangingMethods.includes(request.method)) {
    return null; // No CSRF check needed
  }

  // Get CSRF token from request
  const requestToken = request.headers.get('x-csrf-token') || request.headers.get('csrf-token');

  if (!requestToken) {
    return NextResponse.json({ error: 'CSRF token missing' }, { status: 403 });
  }

  // Get CSRF token from cookie
  const cookieToken = request.cookies.get('csrf-token')?.value;

  if (!cookieToken || cookieToken !== requestToken) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  return null; // CSRF check passed
}

/**
 * Set CSRF token in response
 */
export function setCsrfToken(response: NextResponse): void {
  const token = generateCsrfToken();
  response.cookies.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
}

