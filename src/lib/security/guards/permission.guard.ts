'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from '@/stores/hooks';

/**
 * Permission Guard Options
 */
export interface PermissionGuardOptions {
  requiredPermissions: string[];
  redirectTo?: string;
  onForbidden?: () => void;
  requireAll?: boolean; // If true, user must have all permissions; if false, any permission
}

/**
 * Permission Guard Hook
 * Protects routes based on user permissions
 */
export function usePermissionGuard(options: PermissionGuardOptions) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const { requiredPermissions, redirectTo = '/', onForbidden, requireAll = false } = options;

  const userPermissions = (user as any)?.permissions || [];
  const hasPermission = requireAll
    ? requiredPermissions.every((perm) => userPermissions.includes(perm))
    : requiredPermissions.some((perm) => userPermissions.includes(perm));

  useEffect(() => {
    if (isLoading) {
      return; // Wait for auth state to load
    }

    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    if (!hasPermission) {
      if (onForbidden) {
        onForbidden();
      } else {
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, hasPermission, redirectTo, router, onForbidden]);

  return {
    isAuthenticated,
    isLoading,
    hasPermission,
    userPermissions,
  };
}

/**
 * Permission Guard HOC
 */
export function withPermissionGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: PermissionGuardOptions,
) {
  return function PermissionGuardedComponent(props: P) {
    const { hasPermission, isLoading } = usePermissionGuard(options);

    if (isLoading) {
      return React.createElement('div', null, 'Loading...');
    }

    if (!hasPermission) {
      return null; // Will redirect via usePermissionGuard
    }

    return React.createElement(Component, props);
  };
}
