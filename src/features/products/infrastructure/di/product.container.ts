import { ProductService } from '../../domain/services/product.service';
import { HttpProductRepository } from '../repositories/http-product.repository';

// Dependency Injection Container
export class ProductContainer {
  private static productRepository: HttpProductRepository;
  private static productService: ProductService;

  static getProductRepository(): HttpProductRepository {
    if (!this.productRepository) {
      this.productRepository = new HttpProductRepository();
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
