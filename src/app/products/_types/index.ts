// Component props types for products page
export interface ProductDetailProps {
  productId?: string;
}

export interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export interface ColorSelectorProps {
  colors: Record<string, { name: string; hex?: string }>;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
  min?: number;
}

export interface RelatedProductsProps {
  products: Array<{ id: string | number; name: string; image?: string; price: number }>;
}

export interface SellerPageProps {
  sellerId?: string;
}

export interface ProductGridProps {
  products: Array<{ id: string | number; name: string; image?: string; price: number }>;
  loading?: boolean;
}

// Import shared response types from api.service
export type { ApiResponse, PaginatedResponse } from '@/shared/services/api.service';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price' | 'rating' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
}
