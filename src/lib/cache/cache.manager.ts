import type { ICacheStrategy } from './strategies/cache.strategy';
import { MemoryCacheStrategy } from './strategies/memory.strategy';
import { IndexedDBCacheStrategySync } from './strategies/indexeddb.strategy';

/**
 * Cache Manager
 * Manages cache strategies and provides a unified interface
 */
export class CacheManager {
  private strategy: ICacheStrategy;
  private strategyType: 'memory' | 'indexeddb' | 'react-query';

  constructor(strategyType: 'memory' | 'indexeddb' | 'react-query' = 'memory') {
    this.strategyType = strategyType;
    this.strategy = this.createStrategy(strategyType);
  }

  /**
   * Create cache strategy based on type
   */
  private createStrategy(type: 'memory' | 'indexeddb' | 'react-query'): ICacheStrategy {
    switch (type) {
      case 'memory':
        return new MemoryCacheStrategy();
      case 'indexeddb':
        return new IndexedDBCacheStrategySync();
      case 'react-query':
        // React Query strategy requires QueryClient, so we fallback to memory
        console.warn('React Query strategy requires QueryClient. Falling back to memory cache.');
        return new MemoryCacheStrategy();
      default:
        return new MemoryCacheStrategy();
    }
  }

  /**
   * Set cache strategy
   */
  setStrategy(strategy: ICacheStrategy): void {
    this.strategy = strategy;
  }

  /**
   * Get current strategy
   */
  getStrategy(): ICacheStrategy {
    return this.strategy;
  }

  /**
   * Get value from cache
   */
  get<T>(key: string): T | null {
    return this.strategy.get<T>(key);
  }

  /**
   * Set value in cache
   */
  set<T>(key: string, value: T, ttl?: number): void {
    this.strategy.set(key, value, ttl);
  }

  /**
   * Check if key exists
   */
  has(key: string): boolean {
    return this.strategy.has(key);
  }

  /**
   * Delete value from cache
   */
  delete(key: string): boolean {
    return this.strategy.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.strategy.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return this.strategy.getStats();
  }
}

/**
 * Default cache manager instance
 */
export const cacheManager = new CacheManager('memory');

