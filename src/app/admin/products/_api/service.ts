import { AppError } from '@/lib/errors/base/app.error';
import {
  HttpAdminProductRepository,
  HttpAdminCategoryRepository,
  HttpAdminColorRepository,
  HttpAdminSizeRepository,
  HttpAdminTagRepository,
} from './repository';
import type {
  AdminProductRepository,
  AdminCategoryRepository,
  AdminColorRepository,
  AdminSizeRepository,
  AdminTagRepository,
} from './repository';
import type { AdminProduct } from './entities/product.entity';
import { BaseService } from '@/lib/api';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AdminProductService extends BaseService<AdminProduct, number | string> {
  constructor(
    @inject(HttpAdminProductRepository) private adminRepository: AdminProductRepository,
    @inject(HttpAdminCategoryRepository) private categoryRepository: AdminCategoryRepository,
    @inject(HttpAdminColorRepository) private colorRepository: AdminColorRepository,
    @inject(HttpAdminSizeRepository) private sizeRepository: AdminSizeRepository,
    @inject(HttpAdminTagRepository) private tagRepository: AdminTagRepository,
  ) {
    super(adminRepository);
  }

  // Override getAll to match interface
  // Note: If you don't override, it will automatically use repository.getAll()
  getProducts() {
    return this.findAll();
  }

  // Override getById to match interface
  // Note: If you don't override, it will automatically use repository.getById()
  getProductById(id: number | string) {
    return this.findById(id);
  }

  // Custom create with CreateProductRequest
  async createProduct(data: Parameters<AdminProductRepository['createProduct']>[0]) {
    return await this.adminRepository.createProduct(data);
  }

  // Custom update with Partial<CreateProductRequest>
  async updateProduct(
    id: number | string,
    data: Parameters<AdminProductRepository['updateProduct']>[1],
  ) {
    return await this.adminRepository.updateProduct(id, data);
  }

  // Custom delete with softDelete option
  async deleteProduct(id: number | string, softDelete: boolean = true) {
    if (!id) {
      throw AppError.validation('Product ID is required');
    }
    return await this.adminRepository.deleteProduct(id, softDelete);
  }

  getCategories() {
    return this.categoryRepository.getCategories();
  }

  getColors() {
    return this.colorRepository.getColors();
  }

  getSizes() {
    return this.sizeRepository.getSizes();
  }

  getTags() {
    return this.tagRepository.getTags();
  }

  createTag(name: string) {
    return this.tagRepository.createTag(name);
  }
}
