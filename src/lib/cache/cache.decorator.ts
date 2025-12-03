/**
 * Cache Decorator
 * Decorator pattern for automatic caching
 */

import { cacheManager } from './cache.manager';

/**
 * Cache decorator options
 */
export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  key?: string; // Custom cache key
  strategy?: 'memory' | 'indexeddb' | 'react-query';
}

/**
 * Generate cache key from function name and arguments
 */
function generateCacheKey(fnName: string, args: unknown[]): string {
  const argsKey = args.map((arg) => JSON.stringify(arg)).join(':');
  return `${fnName}:${argsKey}`;
}

/**
 * Cache decorator for methods
 * Automatically caches method results
 */
export function Cache(options: CacheOptions = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const ttl = options.ttl || 5 * 60 * 1000; // Default 5 minutes

    descriptor.value = async function (...args: unknown[]) {
      const cacheKey = options.key || generateCacheKey(`${target.constructor.name}.${propertyKey}`, args);

      // Check cache first
      const cached = cacheManager.get(cacheKey);
      if (cached !== null) {
        return cached;
      }

      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Cache the result
      cacheManager.set(cacheKey, result, ttl);

      return result;
    };

    return descriptor;
  };
}

/**
 * Cache function wrapper
 * Wraps a function with caching logic
 */
export function withCache<T extends (...args: any[]) => any>(
  fn: T,
  options: CacheOptions = {},
): T {
  const ttl = options.ttl || 5 * 60 * 1000;

  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const cacheKey = options.key || generateCacheKey(fn.name, args);

    // Check cache first
    const cached = cacheManager.get<ReturnType<T>>(cacheKey);
    if (cached !== null) {
      return cached;
    }

    // Execute function
    const result = await fn(...args);

    // Cache the result
    cacheManager.set(cacheKey, result, ttl);

    return result;
  }) as T;
}

