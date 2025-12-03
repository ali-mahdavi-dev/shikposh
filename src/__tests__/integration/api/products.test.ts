/**
 * Integration tests for Products API
 */

import { server } from '@/__tests__/mocks/server';
import { http, HttpResponse } from 'msw';
import { FetchAdapter } from '@/lib/api/adapters/fetch.adapter';

describe('Products API Integration', () => {
  let adapter: FetchAdapter;

  beforeEach(() => {
    adapter = new FetchAdapter('http://localhost:8000');
  });

  it('should fetch products', async () => {
    server.use(
      http.get('http://localhost:8000/api/v1/public/products', () => {
        return HttpResponse.json({
          success: true,
          data: [
            { id: '1', title: 'Product 1', slug: 'product-1' },
            { id: '2', title: 'Product 2', slug: 'product-2' },
          ],
        });
      }),
    );

    const products = await adapter.get<any[]>('/api/v1/public/products');
    expect(products).toHaveLength(2);
    expect(products[0].title).toBe('Product 1');
  });

  it('should handle API errors', async () => {
    server.use(
      http.get('http://localhost:8000/api/v1/public/products', () => {
        return HttpResponse.json({ success: false, error: { message: 'Not found' } }, { status: 404 });
      }),
    );

    await expect(adapter.get('/api/v1/public/products')).rejects.toThrow();
  });
});

