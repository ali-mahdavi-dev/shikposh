import { ProductService } from '../../domain/services/product.service';
import { JsonServerProductRepository } from '../repositories/json-server-product.repository';

// Dependency Injection Container
export class ProductContainer {
  private static productRepository: JsonServerProductRepository;
  private static productService: ProductService;

  static getProductRepository(): JsonServerProductRepository {
    if (!this.productRepository) {
      this.productRepository = new JsonServerProductRepository();
    }
    return this.productRepository;
  }

  static getProductService(): ProductService {
    if (!this.productService) {
      this.productService = new ProductService(this.getProductRepository());
    }
    return this.productService;
  }
}
