import { HttpAdminProductRepository } from './repository';
import type { AdminProductRepository } from './repository';

class AdminProductService {
  private repository: AdminProductRepository;

  constructor(repository: AdminProductRepository) {
    this.repository = repository;
  }

  createProduct(data: Parameters<AdminProductRepository['createProduct']>[0]) {
    return this.repository.createProduct(data);
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

