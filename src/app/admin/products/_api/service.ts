import { HttpAdminProductRepository } from './repository';
import type { AdminProductRepository } from './repository';

class AdminProductService {
  private repository: AdminProductRepository;

  constructor(repository: AdminProductRepository) {
    this.repository = repository;
  }

  getProducts() {
    return this.repository.getProducts();
  }

  getProductById(id: number | string) {
    return this.repository.getProductById(id);
  }

  createProduct(data: Parameters<AdminProductRepository['createProduct']>[0]) {
    return this.repository.createProduct(data);
  }

  updateProduct(id: number | string, data: Parameters<AdminProductRepository['updateProduct']>[1]) {
    return this.repository.updateProduct(id, data);
  }

  deleteProduct(id: number | string, softDelete: boolean = true) {
    return this.repository.deleteProduct(id, softDelete);
  }

  getCategories() {
    return this.repository.getCategories();
  }

  getColors() {
    return this.repository.getColors();
  }

  getSizes() {
    return this.repository.getSizes();
  }

  getTags() {
    return this.repository.getTags();
  }

  createTag(name: string) {
    return this.repository.createTag(name);
  }
}

// Create singleton instance
const adminProductRepository = new HttpAdminProductRepository();
export const adminProductService = new AdminProductService(adminProductRepository);
