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

export interface ProductSize {
  id: number;
  name: string;
}

export interface ProductVariant {
  // Nested structure: { "colorId": { "sizeId": { "stock": number } } }
  [colorId: string]: {
    [sizeId: string]: {
      stock: number;
    };
  };
}

export interface ProductEntity {
  id: number | string;
  seller_id: number;
  brand: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  categories: ProductCategory[];
  discount: number;
  stock: number;
  original_price: number;
  price: number;
  rating: number;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  variant: ProductVariant;
  tags: string[];
  features: string[];
  specs: ProductSpec[];
  images: Record<string, string[]>; // Key is color id as string, value is array of image URLs
}

// Legacy ProductColor for backward compatibility
export interface LegacyProductColor {
  name: string;
  stock?: number;
  discount?: number;
}

export interface ProductSummary {
  id: string | number;
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
