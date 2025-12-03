/**
 * Cache Strategy Interface
 * All cache implementations must implement this interface
 */
export interface ICacheStrategy {
  /**
   * Get value from cache
   */
  get<T>(key: string): T | null;

  /**
   * Set value in cache
   */
  set<T>(key: string, value: T, ttl?: number): void;

  /**
   * Check if key exists in cache
   */
  has(key: string): boolean;

  /**
   * Delete value from cache
   */
  delete(key: string): boolean;

  /**
   * Clear all cache
   */
  clear(): void;

  /**
   * Get cache statistics
   */
  getStats(): {
    total: number;
    valid: number;
    expired: number;
  };
}
