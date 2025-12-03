import type { IHttpAdapter } from '@/lib/api/adapters/http.adapter';
import type { Size } from '../entities/product.entity';
import { inject, injectable } from 'tsyringe';
import { HTTP_ADAPTER_TOKEN } from '@/lib/di/tokens';

export interface AdminSizeRepository {
  getSizes(): Promise<Size[]>;
}

@injectable()
export class HttpAdminSizeRepository implements AdminSizeRepository {
  constructor(@inject(HTTP_ADAPTER_TOKEN) private httpAdapter: IHttpAdapter) {}

  async getSizes(): Promise<Size[]> {
    return await this.httpAdapter.get<Size[]>('/api/v1/public/sizes');
  }
}


