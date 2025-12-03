import { ServerFetchAdapter, type ServerRequestConfig } from '../adapters/server-fetch.adapter';
import type { IHttpAdapter } from '../adapters/http.adapter';

/**
 * Server Base Repository
 * Abstract base class for server-side repositories with Next.js cache support
 * Extends BaseRepository functionality with cache tags and revalidation
 */
export abstract class ServerBaseRepository<T, ID = string> {
  protected httpAdapter: ServerFetchAdapter;
  protected basePath: string;

  constructor(httpAdapter?: IHttpAdapter, basePath: string = '') {
    // Use provided adapter or create a new ServerFetchAdapter
    this.httpAdapter = (httpAdapter as ServerFetchAdapter) || new ServerFetchAdapter();
    this.basePath = basePath;
  }

  /**
   * Find all entities
   * @param config - Optional server request configuration with cache tags
   */
  async findAll(config?: ServerRequestConfig): Promise<T[]> {
    const defaultConfig: ServerRequestConfig = {
      tags: [this.basePath],
      revalidate: 3600, // 1 hour default
      ...config,
    };
    return this.httpAdapter.get<T[]>(this.basePath, defaultConfig);
  }

  /**
   * Find entity by ID
   * @param id - Entity ID
   * @param config - Optional server request configuration with cache tags
   */
  async findById(id: ID, config?: ServerRequestConfig): Promise<T | null> {
    try {
      const defaultConfig: ServerRequestConfig = {
        tags: [this.basePath, String(id)],
        revalidate: 3600, // 1 hour default
        ...config,
      };
      return await this.httpAdapter.get<T>(`${this.basePath}/${id}`, defaultConfig);
    } catch (error) {
      // Return null if not found instead of throwing
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Get from custom endpoint
   * Helper method for custom endpoints that don't follow standard CRUD patterns
   * @param endpoint - Custom endpoint path (relative to basePath or absolute)
   * @param config - Optional server request configuration with cache tags
   */
  protected async getFromEndpoint<U = T>(
    endpoint: string,
    config?: ServerRequestConfig,
  ): Promise<U> {
    // If endpoint starts with /, treat as absolute path, otherwise relative to basePath
    const fullPath = endpoint.startsWith('/') ? endpoint : `${this.basePath}/${endpoint}`;
    const defaultConfig: ServerRequestConfig = {
      tags: [this.basePath],
      revalidate: 3600, // 1 hour default
      ...config,
    };
    return this.httpAdapter.get<U>(fullPath, defaultConfig);
  }

  /**
   * Post to custom endpoint
   * Helper method for custom endpoints
   * @param endpoint - Custom endpoint path (relative to basePath or absolute)
   * @param data - Data to post
   * @param config - Optional server request configuration with cache tags
   */
  protected async postToEndpoint<U = T>(
    endpoint: string,
    data?: unknown,
    config?: ServerRequestConfig,
  ): Promise<U> {
    // If endpoint starts with /, treat as absolute path, otherwise relative to basePath
    const fullPath = endpoint.startsWith('/') ? endpoint : `${this.basePath}/${endpoint}`;
    const defaultConfig: ServerRequestConfig = {
      tags: [this.basePath],
      ...config,
    };
    return this.httpAdapter.post<U>(fullPath, data, defaultConfig);
  }
}
