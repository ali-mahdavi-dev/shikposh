import { apiService } from '@/shared/services/api.service';
import type {
  CreateProductRequest,
  Category,
  Color,
  Size,
  Tag,
  AdminProduct,
} from './entities/product.entity';

export interface AdminProductRepository {
  getProducts(): Promise<AdminProduct[]>;
  getProductById(id: number | string): Promise<AdminProduct>;
  createProduct(data: CreateProductRequest): Promise<void>;
  updateProduct(id: number | string, data: Partial<CreateProductRequest>): Promise<void>;
  deleteProduct(id: number | string, softDelete?: boolean): Promise<void>;
  getCategories(): Promise<Category[]>;
  getColors(): Promise<Color[]>;
  getSizes(): Promise<Size[]>;
  getTags(): Promise<Tag[]>;
  createTag(name: string): Promise<Tag>;
}

export class HttpAdminProductRepository implements AdminProductRepository {
  async getProducts(): Promise<AdminProduct[]> {
    return apiService.get<AdminProduct[]>('/api/v1/admin/products');
  }

  async getProductById(id: number | string): Promise<AdminProduct> {
    return apiService.get<AdminProduct>(`/api/v1/public/products/${id}`);
  }

  async createProduct(data: CreateProductRequest): Promise<void> {
    await apiService.post('/api/v1/admin/products', data);
  }

  async updateProduct(id: number | string, data: Partial<CreateProductRequest>): Promise<void> {
    await apiService.put(`/api/v1/admin/products/${id}`, data);
  }

  async deleteProduct(id: number | string, softDelete: boolean = true): Promise<void> {
    await apiService.delete(`/api/v1/admin/products/${id}?soft_delete=${softDelete}`);
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
