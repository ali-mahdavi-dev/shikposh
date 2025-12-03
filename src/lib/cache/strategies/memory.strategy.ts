import type { ICacheStrategy } from './cache.strategy';

/**
 * Memory Cache Strategy
 * In-memory cache implementation (converted from CacheService)
 */
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

export class MemoryCacheStrategy implements ICacheStrategy {
  private cache = new Map<string, CacheItem<any>>();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    // Default 5 minutes
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);

    if (!item) {
      return false;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  getStats() {
    const now = Date.now();
    let expiredCount = 0;
    let validCount = 0;

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        expiredCount++;
        this.cache.delete(key);
      } else {
        validCount++;
      }
    }

    return {
      total: this.cache.size,
      valid: validCount,
      expired: expiredCount,
    };
  }

  /**
   * Clean expired items
   */
  cleanup(): void {
    const now = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}
