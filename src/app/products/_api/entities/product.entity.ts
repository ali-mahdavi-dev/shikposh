export interface ProductVariant {
  price: number;
  original_price: number;
  stock: number;
  discount: number;
  images: string[];
}

export interface ProductColor {
  id: number;
  name: string;
  hex: string;
}

export interface ProductCategory {
  id: number;
  name: string;
}

export interface ProductSpec {
  key: string;
  value: string;
}

export interface ProductEntity {
  id: string;
  seller_id: number;
  brand: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  categories: ProductCategory[];
  rating: number;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  colors: ProductColor[];
  tags: string[];
  features: string[];
  specs: ProductSpec[];
  variants: Record<string, Record<string, ProductVariant>>;
}

// Legacy ProductColor for backward compatibility
export interface LegacyProductColor {
  name: string;
  stock?: number;
  discount?: number;
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isNew: boolean;
  isFeatured: boolean;
  colors: Record<string, LegacyProductColor>;
  sizes: string[];
  brand: string;
  description: string;
  tags: string[];
}
