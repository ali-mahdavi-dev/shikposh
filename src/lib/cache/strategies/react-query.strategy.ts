import type { ICacheStrategy } from './cache.strategy';
import type { QueryClient } from '@tanstack/react-query';

/**
 * React Query Cache Strategy
 * Uses React Query's cache as the underlying storage
 */
export class ReactQueryCacheStrategy implements ICacheStrategy {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  get<T>(key: string): T | null {
    try {
      const data = this.queryClient.getQueryData<T>(this.parseKey(key));
      return data || null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T, ttl?: number): void {
    const queryKey = this.parseKey(key);
    this.queryClient.setQueryData(queryKey, value);

    // Set stale time if TTL is provided
    if (ttl) {
      this.queryClient.setQueryData(queryKey, value, {
        updatedAt: Date.now(),
      });
    }
  }

  has(key: string): boolean {
    const queryKey = this.parseKey(key);
    return this.queryClient.getQueryState(queryKey) !== undefined;
  }

  delete(key: string): boolean {
    try {
      this.queryClient.removeQueries({ queryKey: this.parseKey(key) });
      return true;
    } catch {
      return false;
    }
  }

  clear(): void {
    this.queryClient.clear();
  }

  getStats() {
    const cache = this.queryClient.getQueryCache();
    const queries = cache.getAll();
    const now = Date.now();

    let validCount = 0;
    let expiredCount = 0;

    queries.forEach((query) => {
      const dataUpdatedAt = query.state.dataUpdatedAt;
      const staleTime = (query.options as any).staleTime || 0;
      if (dataUpdatedAt && now - dataUpdatedAt > staleTime) {
        expiredCount++;
      } else {
        validCount++;
      }
    });

    return {
      total: queries.length,
      valid: validCount,
      expired: expiredCount,
    };
  }

  /**
   * Parse cache key to React Query key format
   */
  private parseKey(key: string): unknown[] {
    try {
      return JSON.parse(key);
    } catch {
      return [key];
    }
  }
}
