import type { User } from '@/stores/slices/authSlice';

/**
 * Permission types
 * - superuser: Highest level, can do everything
 * - admin: Can manage products, orders, etc. but not users
 * - user: Regular user with limited access
 */
export type PermissionLevel = 'superuser' | 'admin' | 'user';

/**
 * Permission scopes
 */
export enum PermissionScope {
  // Admin permissions
  MANAGE_PRODUCTS = 'manage_products',
  MANAGE_ORDERS = 'manage_orders',
  MANAGE_SETTINGS = 'manage_settings',
  VIEW_ADMIN_DASHBOARD = 'view_admin_dashboard',

  // Superuser only permissions
  MANAGE_USERS = 'manage_users',
  MANAGE_ADMINS = 'manage_admins',
  SYSTEM_SETTINGS = 'system_settings',
}

/**
 * Permission matrix: defines which roles can access which scopes
 */
const PERMISSION_MATRIX: Record<PermissionScope, PermissionLevel[]> = {
  // Admin scopes - accessible by both admin and superuser
  [PermissionScope.MANAGE_PRODUCTS]: ['admin', 'superuser'],
  [PermissionScope.MANAGE_ORDERS]: ['admin', 'superuser'],
  [PermissionScope.MANAGE_SETTINGS]: ['admin', 'superuser'],
  [PermissionScope.VIEW_ADMIN_DASHBOARD]: ['admin', 'superuser'],

  // Superuser only scopes
  [PermissionScope.MANAGE_USERS]: ['superuser'],
  [PermissionScope.MANAGE_ADMINS]: ['superuser'],
  [PermissionScope.SYSTEM_SETTINGS]: ['superuser'],
};

/**
 * Get user's permission level from user object
 */
export function getUserPermissionLevel(user: User | null): PermissionLevel {
  if (!user) {
    return 'user';
  }

  if (user.is_superuser === true) {
    return 'superuser';
  }

  if (user.is_admin === true) {
    return 'admin';
  }

  return 'user';
}

/**
 * Check if user has permission for a specific scope
 * This is the main permission checking function (AOP-style)
 */
export function hasPermission(
  user: User | null,
  scope: PermissionScope | PermissionScope[],
): boolean {
  const userLevel = getUserPermissionLevel(user);

  // If checking multiple scopes, user must have at least one
  if (Array.isArray(scope)) {
    return scope.some((s) => hasPermission(user, s));
  }

  // Check if user's level is in the allowed levels for this scope
  const allowedLevels = PERMISSION_MATRIX[scope] || [];
  return allowedLevels.includes(userLevel);
}

/**
 * Check if user is admin (includes superuser)
 */
export function isAdmin(user: User | null): boolean {
  return hasPermission(user, PermissionScope.VIEW_ADMIN_DASHBOARD);
}

/**
 * Check if user is superuser
 */
export function isSuperuser(user: User | null): boolean {
  return getUserPermissionLevel(user) === 'superuser';
}

/**
 * Higher-order function for permission-based rendering (AOP pattern)
 * Returns a function that checks permission before rendering
 * Usage: Use this in your components with conditional rendering
 * Example: {hasPermission(user, PermissionScope.MANAGE_USERS) && <UserManagement />}
 */
export function withPermissionCheck(
  user: User | null,
  scope: PermissionScope | PermissionScope[],
): boolean {
  return hasPermission(user, scope);
}

/**
 * Hook for permission checking in components
 */
export function usePermissions(user: User | null) {
  return {
    hasPermission: (scope: PermissionScope | PermissionScope[]) => hasPermission(user, scope),
    isAdmin: () => isAdmin(user),
    isSuperuser: () => isSuperuser(user),
    getUserLevel: () => getUserPermissionLevel(user),
  };
}
