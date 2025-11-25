import { apiService } from '@/shared/services/api.service';

export interface WishlistResponse {
  product_ids: number[];
}

export interface ToggleWishlistResponse {
  success: boolean;
  added: boolean;
  message: string;
}

export interface SyncWishlistResponse {
  success: boolean;
  product_ids: number[];
}

export interface WishlistRepository {
  getWishlist(): Promise<WishlistResponse>;
  addToWishlist(productId: number): Promise<{ success: boolean; message: string }>;
  removeFromWishlist(productId: number): Promise<{ success: boolean; message: string }>;
  toggleWishlist(productId: number): Promise<ToggleWishlistResponse>;
  syncWishlist(productIds: number[]): Promise<SyncWishlistResponse>;
}

export class HttpWishlistRepository implements WishlistRepository {
  async getWishlist(): Promise<WishlistResponse> {
    return apiService.get<WishlistResponse>('/api/v1/wishlist');
  }

  async addToWishlist(productId: number): Promise<{ success: boolean; message: string }> {
    return apiService.post('/api/v1/wishlist', { product_id: productId });
  }

  async removeFromWishlist(productId: number): Promise<{ success: boolean; message: string }> {
    return apiService.delete(`/api/v1/wishlist/${productId}`);
  }

  async toggleWishlist(productId: number): Promise<ToggleWishlistResponse> {
    return apiService.post('/api/v1/wishlist/toggle', { product_id: productId });
  }

  async syncWishlist(productIds: number[]): Promise<SyncWishlistResponse> {
    return apiService.post('/api/v1/wishlist/sync', { product_ids: productIds });
  }
}

export const wishlistRepository = new HttpWishlistRepository();
