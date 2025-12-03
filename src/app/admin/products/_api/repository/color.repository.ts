import type { IHttpAdapter } from '@/lib/api/adapters/http.adapter';
import type { Color } from '../entities/product.entity';
import { inject, injectable } from 'tsyringe';
import { HTTP_ADAPTER_TOKEN } from '@/lib/di/tokens';

export interface AdminColorRepository {
  getColors(): Promise<Color[]>;
}

@injectable()
export class HttpAdminColorRepository implements AdminColorRepository {
  constructor(@inject(HTTP_ADAPTER_TOKEN) private httpAdapter: IHttpAdapter) {}

  async getColors(): Promise<Color[]> {
    return await this.httpAdapter.get<Color[]>('/api/v1/public/colors');
  }
}


