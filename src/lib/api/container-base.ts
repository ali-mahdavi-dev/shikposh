/**
 * Base Container Class for Dependency Injection
 * Provides a unified singleton pattern with lazy initialization
 */

export abstract class BaseContainer<TRepository, TService> {
  private repository: TRepository | null = null;
  private service: TService | null = null;

  /**
   * Get the repository instance (lazy initialization)
   */
  protected abstract createRepository(): TRepository;

  /**
   * Get the service instance (lazy initialization)
   */
  protected abstract createService(repository: TRepository): TService;

  /**
   * Get repository instance
   */
  getRepository(): TRepository {
    if (!this.repository) {
      this.repository = this.createRepository();
    }
    return this.repository;
  }

  /**
   * Get service instance
   */
  getService(): TService {
    if (!this.service) {
      this.service = this.createService(this.getRepository());
    }
    return this.service;
  }

  /**
   * Reset container (useful for testing)
   */
  reset(): void {
    this.repository = null;
    this.service = null;
  }
}

