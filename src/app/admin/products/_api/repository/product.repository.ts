import type { IHttpAdapter } from '@/lib/api/adapters/http.adapter';
import { BaseRepository } from '@/lib/api/repositories/base.repository';
import type { IRepository } from '@/lib/api/repositories/interfaces/repository.interface';
import type { CreateProductRequest, AdminProduct } from '../entities/product.entity';
import { inject, injectable } from 'tsyringe';
import { HTTP_ADAPTER_TOKEN } from '@/lib/di/tokens';

export interface AdminProductRepository extends IRepository<AdminProduct, number | string> {
  createProduct(data: CreateProductRequest): Promise<void>;
  updateProduct(id: number | string, data: Partial<CreateProductRequest>): Promise<void>;
  deleteProduct(id: number | string, softDelete?: boolean): Promise<void>;
}

@injectable()
export class HttpAdminProductRepository
  extends BaseRepository<AdminProduct, number | string>
  implements AdminProductRepository
{
  constructor(@inject(HTTP_ADAPTER_TOKEN) httpAdapter: IHttpAdapter) {
    super(httpAdapter, '/api/v1/admin/products');
  }

  async createProduct(data: CreateProductRequest): Promise<void> {
    await this.httpAdapter.post(this.basePath, data);
  }

  async updateProduct(id: number | string, data: Partial<CreateProductRequest>): Promise<void> {
    await this.httpAdapter.put(`${this.basePath}/${id}`, data);
  }

  async deleteProduct(id: number | string, softDelete: boolean = true): Promise<void> {
    const endpoint = softDelete
      ? `${this.basePath}/${id}?soft_delete=true`
      : `${this.basePath}/${id}`;
    await this.httpAdapter.delete(endpoint);
  }
}
