import type { NextRequest, NextResponse } from 'next/server';
import { defaultTokenStrategy } from '../strategies/token.strategy';

/**
 * Auth Middleware
 * Server-side authentication middleware for Next.js
 */
export function authMiddleware(request: NextRequest): NextResponse | null {
  // Get token from cookie or header
  const token = getTokenFromRequest(request);

  if (!token) {
    // No token found - redirect to auth or return 401
    return null; // Let the route handler decide
  }

  // Validate token (in a real app, you'd verify JWT here)
  // For now, we just check if it exists
  if (!isValidToken(token)) {
    return null;
  }

  // Add user info to request headers for downstream handlers
  const response = NextResponse.next();
  response.headers.set('x-user-id', 'user-id-from-token'); // Extract from token
  return response;
}

/**
 * Get token from request
 */
function getTokenFromRequest(request: NextRequest): string | null {
  // Try cookie first
  const cookieToken = request.cookies.get('auth_token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  // Try Authorization header
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}

/**
 * Validate token
 * In a real app, this would verify JWT signature and expiration
 */
function isValidToken(token: string): boolean {
  // Basic validation - in production, verify JWT
  return token.length > 0;
}

