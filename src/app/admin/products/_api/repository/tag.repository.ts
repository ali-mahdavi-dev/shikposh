import type { IHttpAdapter } from '@/lib/api/adapters/http.adapter';
import type { Tag } from '../entities/product.entity';
import { inject, injectable } from 'tsyringe';
import { HTTP_ADAPTER_TOKEN } from '@/lib/di/tokens';

export interface AdminTagRepository {
  getTags(): Promise<Tag[]>;
  createTag(name: string): Promise<Tag>;
}

@injectable()
export class HttpAdminTagRepository implements AdminTagRepository {
  constructor(@inject(HTTP_ADAPTER_TOKEN) private httpAdapter: IHttpAdapter) {}

  async getTags(): Promise<Tag[]> {
    return await this.httpAdapter.get<Tag[]>('/api/v1/public/tags');
  }

  async createTag(name: string): Promise<Tag> {
    return await this.httpAdapter.post<Tag>('/api/v1/admin/tags', { name });
  }
}
