import { apiService } from '@/shared/services/api.service';
import type { CreateProductRequest, Category, Color, Size, Tag } from './entities/product.entity';

export interface AdminProductRepository {
  createProduct(data: CreateProductRequest): Promise<void>;
  getCategories(): Promise<Category[]>;
  getColors(): Promise<Color[]>;
  getSizes(): Promise<Size[]>;
  getTags(): Promise<Tag[]>;
  createTag(name: string): Promise<Tag>;
}

export class HttpAdminProductRepository implements AdminProductRepository {
  async createProduct(data: CreateProductRequest): Promise<void> {
    await apiService.post('/api/v1/admin/products', data);
  }

  async getCategories(): Promise<Category[]> {
    return apiService.get<Category[]>('/api/v1/public/categories');
  }

  async getColors(): Promise<Color[]> {
    return apiService.get<Color[]>('/api/v1/public/colors');
  }

  async getSizes(): Promise<Size[]> {
    return apiService.get<Size[]>('/api/v1/public/sizes');
  }

  async getTags(): Promise<Tag[]> {
    return apiService.get<Tag[]>('/api/v1/public/tags');
  }

  async createTag(name: string): Promise<Tag> {
    return apiService.post<Tag>('/api/v1/admin/tags', { name });
  }
}
