import type { IRepository } from '../repositories/interfaces/repository.interface';
import type { ICacheStrategy } from '../../cache/strategies/cache.strategy';
import { MemoryCacheStrategy } from '../../cache/strategies/memory.strategy';

/**
 * Base Service
 * Abstract base class for services with common operations
 */
export abstract class BaseService<T, ID = string> {
  protected repository: IRepository<T, ID>;
  protected cache?: ICacheStrategy;
  protected cacheEnabled: boolean;

  constructor(repository: IRepository<T, ID>, cacheEnabled: boolean = true) {
    this.repository = repository;
    this.cacheEnabled = cacheEnabled;
    if (cacheEnabled) {
      this.cache = new MemoryCacheStrategy();
    }
  }

  /**
   * Find all entities
   */
  async findAll(useCache: boolean = true): Promise<T[]> {
    const cacheKey = `${this.getCachePrefix()}:all`;

    if (useCache && this.cacheEnabled && this.cache) {
      const cached = this.cache.get<T[]>(cacheKey);
      if (cached !== null) {
        return cached;
      }
    }

    const data = await this.repository.findAll();

    if (useCache && this.cacheEnabled && this.cache) {
      this.cache.set(cacheKey, data, 5 * 60 * 1000); // 5 minutes
    }

    return data;
  }

  /**
   * Find entity by ID
   */
  async findById(id: ID, useCache: boolean = true): Promise<T | null> {
    const cacheKey = `${this.getCachePrefix()}:${id}`;

    if (useCache && this.cacheEnabled && this.cache) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }
    }

    const data = await this.repository.findById(id);

    if (data && useCache && this.cacheEnabled && this.cache) {
      this.cache.set(cacheKey, data, 5 * 60 * 1000); // 5 minutes
    }

    return data;
  }

  /**
   * Create new entity
   */
  async create(data: Partial<T>): Promise<T> {
    const result = await this.repository.create(data);

    // Invalidate cache
    if (this.cacheEnabled && this.cache) {
      this.invalidateCache();
    }

    return result;
  }

  /**
   * Update entity
   */
  async update(id: ID, data: Partial<T>): Promise<T> {
    const result = await this.repository.update(id, data);

    // Invalidate cache
    if (this.cacheEnabled && this.cache) {
      this.invalidateCache();
      this.cache.delete(`${this.getCachePrefix()}:${id}`);
    }

    return result;
  }

  /**
   * Delete entity
   */
  async delete(id: ID): Promise<boolean> {
    const result = await this.repository.delete(id);

    // Invalidate cache
    if (this.cacheEnabled && this.cache) {
      this.invalidateCache();
      this.cache.delete(`${this.getCachePrefix()}:${id}`);
    }

    return result;
  }

  /**
   * Get cache prefix for this service
   * Override in subclasses to customize
   */
  protected getCachePrefix(): string {
    return this.constructor.name.toLowerCase();
  }

  /**
   * Invalidate all cache for this service
   */
  protected invalidateCache(): void {
    if (this.cache) {
      // Clear cache entries with this prefix
      // Note: This is a simplified implementation
      // In production, you might want a more sophisticated cache invalidation strategy
      const prefix = this.getCachePrefix();
      // For now, we'll just clear the "all" cache
      this.cache.delete(`${prefix}:all`);
    }
  }
}
