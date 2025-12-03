/**
 * React Query Key Factories
 * Centralized query key management for type safety and consistency
 */

/**
 * Query key factory for products
 */
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...productKeys.details(), id] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  byCategory: (category: string) => [...productKeys.all, 'category', category] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
};

/**
 * Query key factory for orders
 */
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...orderKeys.details(), id] as const,
};

/**
 * Query key factory for auth
 */
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  session: () => [...authKeys.all, 'session'] as const,
};

/**
 * Query key factory for categories
 */
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: () => [...categoryKeys.lists()] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...categoryKeys.details(), slug] as const,
};

/**
 * Query key factory for wishlist
 */
export const wishlistKeys = {
  all: ['wishlist'] as const,
  items: () => [...wishlistKeys.all, 'items'] as const,
};

/**
 * Query key factory for cart
 */
export const cartKeys = {
  all: ['cart'] as const,
  items: () => [...cartKeys.all, 'items'] as const,
};

/**
 * Query key factory for notifications
 */
export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: () => [...notificationKeys.lists()] as const,
  unread: () => [...notificationKeys.all, 'unread'] as const,
};
