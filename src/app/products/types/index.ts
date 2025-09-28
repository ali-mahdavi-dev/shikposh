import { Product, ProductColor, RelatedProduct } from "@/types";


// Component props types
export interface ProductDetailProps {
  productId?: string;
}

export interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export interface ColorSelectorProps {
  colors: Record<string, ProductColor>;
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
  products: RelatedProduct[];
}


export interface SellerPageProps {
  sellerId?: string;
}

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}


// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}



// Filter types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price' | 'rating' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
}
