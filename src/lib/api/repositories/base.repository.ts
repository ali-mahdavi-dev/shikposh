import type { IRepository } from './interfaces/repository.interface';
import type { IHttpAdapter } from '../adapters/http.adapter';

/**
 * Base Repository
 * Abstract base class for repositories with common CRUD operations
 */
export abstract class BaseRepository<T, ID = string> implements IRepository<T, ID> {
  protected httpAdapter: IHttpAdapter;
  protected basePath: string;

  constructor(httpAdapter: IHttpAdapter, basePath: string) {
    this.httpAdapter = httpAdapter;
    this.basePath = basePath;
  }

  /**
   * Find all entities
   */
  async findAll(): Promise<T[]> {
    return this.httpAdapter.get<T[]>(this.basePath);
  }

  /**
   * Find entity by ID
   */
  async findById(id: ID): Promise<T | null> {
    try {
      return await this.httpAdapter.get<T>(`${this.basePath}/${id}`);
    } catch (error) {
      // Return null if not found instead of throwing
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Create new entity
   */
  async create(data: Partial<T>): Promise<T> {
    return this.httpAdapter.post<T>(this.basePath, data);
  }

  /**
   * Update entity
   */
  async update(id: ID, data: Partial<T>): Promise<T> {
    return this.httpAdapter.put<T>(`${this.basePath}/${id}`, data);
  }

  /**
   * Delete entity
   */
  async delete(id: ID): Promise<boolean> {
    try {
      await this.httpAdapter.delete<void>(`${this.basePath}/${id}`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Patch entity (partial update)
   */
  async patch(id: ID, data: Partial<T>): Promise<T> {
    return this.httpAdapter.patch<T>(`${this.basePath}/${id}`, data);
  }
}
