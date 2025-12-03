'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from '@/stores/hooks';

/**
 * Auth Guard Options
 */
export interface AuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  onUnauthorized?: () => void;
}

/**
 * Auth Guard Hook
 * Protects routes that require authentication
 */
export function useAuthGuard(options: AuthGuardOptions = {}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const { redirectTo = '/auth', requireAuth = true, onUnauthorized } = options;

  useEffect(() => {
    if (isLoading) {
      return; // Wait for auth state to load
    }

    if (requireAuth && !isAuthenticated) {
      if (onUnauthorized) {
        onUnauthorized();
      } else {
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router, onUnauthorized]);

  return {
    isAuthenticated,
    isLoading,
    isAuthorized: requireAuth ? isAuthenticated : true,
  };
}

/**
 * Auth Guard HOC
 * Higher-order component for protecting routes
 */
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: AuthGuardOptions = {},
) {
  return function AuthGuardedComponent(props: P) {
    const { isAuthorized, isLoading } = useAuthGuard(options);

    if (isLoading) {
      return React.createElement('div', null, 'Loading...'); // Or your loading component
    }

    if (!isAuthorized) {
      return null; // Will redirect via useAuthGuard
    }

    return React.createElement(Component, props);
  };
}
