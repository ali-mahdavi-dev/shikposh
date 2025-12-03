/**
 * Legacy CacheService - now uses MemoryCacheStrategy
 * @deprecated Use cacheManager from @/lib/cache directly
 */
import { MemoryCacheStrategy } from '@/lib/cache/strategies/memory.strategy';

export class CacheService {
  private strategy: MemoryCacheStrategy;

  constructor() {
    this.strategy = new MemoryCacheStrategy(100);
    // Auto cleanup every 5 minutes
    setInterval(
      () => {
        this.strategy.cleanup();
      },
      5 * 60 * 1000,
    );
  }

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.strategy.set(key, data, ttl);
  }

  get<T>(key: string): T | null {
    return this.strategy.get<T>(key);
  }

  has(key: string): boolean {
    return this.strategy.has(key);
  }

  delete(key: string): boolean {
    return this.strategy.delete(key);
  }

  clear(): void {
    this.strategy.clear();
  }

  getStats() {
    return this.strategy.getStats();
  }

  cleanup(): void {
    this.strategy.cleanup();
  }
}

// Singleton instance for backward compatibility
export const cacheService = new CacheService();
