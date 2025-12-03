import type { ICacheStrategy } from '../../../cache/strategies/cache.strategy';

/**
 * Caching Strategy Interface
 * Strategies for caching service results
 */
export interface ICachingStrategy {
  /**
   * Get cached value
   */
  get<T>(key: string): T | null;

  /**
   * Set cached value
   */
  set<T>(key: string, value: T, ttl?: number): void;

  /**
   * Invalidate cache
   */
  invalidate(key: string): void;

  /**
   * Invalidate all cache
   */
  invalidateAll(): void;
}

/**
 * Default Caching Strategy
 * Uses the cache manager
 */
export class DefaultCachingStrategy implements ICachingStrategy {
  private cache: ICacheStrategy;

  constructor(cache: ICacheStrategy) {
    this.cache = cache;
  }

  get<T>(key: string): T | null {
    return this.cache.get<T>(key);
  }

  set<T>(key: string, value: T, ttl?: number): void {
    this.cache.set(key, value, ttl);
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  invalidateAll(): void {
    this.cache.clear();
  }
}

