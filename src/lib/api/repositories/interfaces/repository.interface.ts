/**
 * Base Repository Interface
 * Common repository operations
 */
export interface IRepository<T, ID = string> {
  /**
   * Find all entities
   */
  findAll(): Promise<T[]>;

  /**
   * Find entity by ID
   */
  findById(id: ID): Promise<T | null>;

  /**
   * Create new entity
   */
  create(data: Partial<T>): Promise<T>;

  /**
   * Update entity
   */
  update(id: ID, data: Partial<T>): Promise<T>;

  /**
   * Delete entity
   */
  delete(id: ID): Promise<boolean>;
}
