'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from '@/stores/hooks';

/**
 * Role Guard Options
 */
export interface RoleGuardOptions {
  allowedRoles: string[];
  redirectTo?: string;
  onForbidden?: () => void;
}

/**
 * Role Guard Hook
 * Protects routes based on user roles
 */
export function useRoleGuard(options: RoleGuardOptions) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const { allowedRoles, redirectTo = '/', onForbidden } = options;

  const userRole = (user as any)?.role || 'user';
  const hasRequiredRole = allowedRoles.includes(userRole);

  useEffect(() => {
    if (isLoading) {
      return; // Wait for auth state to load
    }

    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    if (!hasRequiredRole) {
      if (onForbidden) {
        onForbidden();
      } else {
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, hasRequiredRole, redirectTo, router, onForbidden]);

  return {
    isAuthenticated,
    isLoading,
    hasRequiredRole,
    userRole,
  };
}

/**
 * Role Guard HOC
 */
export function withRoleGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: RoleGuardOptions,
) {
  return function RoleGuardedComponent(props: P) {
    const { hasRequiredRole, isLoading } = useRoleGuard(options);

    if (isLoading) {
      return React.createElement('div', null, 'Loading...');
    }

    if (!hasRequiredRole) {
      return null; // Will redirect via useRoleGuard
    }

    return React.createElement(Component, props);
  };
}
