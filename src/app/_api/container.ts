import { BaseContainer } from '@/lib/api/container-base';
import { ServerFetchAdapter } from '@/lib/api/adapters/server-fetch.adapter';
import { HomeService } from './service';
import { HttpHomeRepository, type HomeRepository } from './repository';

/**
 * Home Container
 * Dependency Injection container for home page API layer
 * Follows enterprise architecture pattern with Adapter injection
 */
export class HomeContainer extends BaseContainer<HomeRepository, HomeService> {
  private httpAdapter: ServerFetchAdapter;

  constructor() {
    super();
    // Create ServerFetchAdapter instance for server-side requests with Next.js cache support
    this.httpAdapter = new ServerFetchAdapter();
  }

  protected createRepository(): HomeRepository {
    // Inject ServerFetchAdapter into repository
    return new HttpHomeRepository(this.httpAdapter);
  }

  protected createService(repository: HomeRepository): HomeService {
    return new HomeService(repository);
  }
}

// Export singleton instance
export const homeContainer = new HomeContainer();
