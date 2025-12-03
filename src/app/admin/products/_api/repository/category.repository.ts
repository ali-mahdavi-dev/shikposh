import type { IHttpAdapter } from '@/lib/api/adapters/http.adapter';
import type { Category } from '../entities/product.entity';
import { inject, injectable } from 'tsyringe';
import { HTTP_ADAPTER_TOKEN } from '@/lib/di/tokens';

export interface AdminCategoryRepository {
  getCategories(): Promise<Category[]>;
}

@injectable()
export class HttpAdminCategoryRepository implements AdminCategoryRepository {
  constructor(@inject(HTTP_ADAPTER_TOKEN) private httpAdapter: IHttpAdapter) {}

  async getCategories(): Promise<Category[]> {
    return await this.httpAdapter.get<Category[]>('/api/v1/public/categories');
  }
}
