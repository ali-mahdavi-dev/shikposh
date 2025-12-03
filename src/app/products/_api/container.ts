import { BaseContainer } from '@/lib/api/container-base';
import { ServerFetchAdapter } from '@/lib/api/adapters/server-fetch.adapter';
import { ProductService } from './service';
import { HttpProductRepository, type ProductRepository } from './repository';

/**
 * Product Container
 * Dependency Injection container for products API layer
 * Follows enterprise architecture pattern with Adapter injection
 */
export class ProductContainer extends BaseContainer<ProductRepository, ProductService> {
  private httpAdapter: ServerFetchAdapter;

  constructor() {
    super();
    // Create ServerFetchAdapter instance for server-side requests with Next.js cache support
    this.httpAdapter = new ServerFetchAdapter();
  }

  protected createRepository(): ProductRepository {
    // Inject ServerFetchAdapter into repository
    return new HttpProductRepository(this.httpAdapter);
  }

  protected createService(repository: ProductRepository): ProductService {
    return new ProductService(repository);
  }
}

// Export singleton instance
export const productContainer = new ProductContainer();
