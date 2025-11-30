// Admin Product API entities

export interface CreateProductRequest {
  seller_id?: number;
  title: string;
  slug: string;
  brand: string;
  description?: string;
  short_description?: string;
  thumbnail: string;
  categories: number[]; // Category IDs
  discount: number;
  stock?: number; // Optional - use variants instead
  origin_price?: number;
  price: number;
  is_new: boolean;
  is_featured: boolean;
  colors?: number[]; // Color IDs
  sizes?: number[]; // Size IDs
  variants?: ProductVariantInput[];
  tags?: string[];
  features?: string[];
  specs?: ProductSpecInput[];
  images?: ProductImageInput[];
}

export interface ProductVariantInput {
  color_id: number;
  size_id: number;
  stock: number;
}

export interface ProductSpecInput {
  key: string;
  value: string;
  order?: number;
}

export interface ProductImageInput {
  color_id: number;
  urls: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id?: number;
}

export interface Color {
  id: number;
  name: string;
  slug: string;
  hex: string;
}

export interface Size {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

// Product entity for admin (matches backend ToMap structure)
export interface AdminProduct {
  id: number | string;
  seller_id: number;
  brand: string;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  thumbnail: string;
  categories: Array<{ id: number; name: string; slug: string }>;
  discount: number;
  stock: number;
  price: number;
  orgin_price?: number; // Note: backend uses "orgin_price" (typo)
  rating: number;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  colors: Array<{ id: number; name: string; hex: string }>;
  sizes: Array<{ id: number; name: string }>;
  variant: Record<string, Record<string, { stock: number }>>;
  tags: string[];
  features: string[];
  specs: Array<{ key: string; value: string; order?: number }>;
  images: Record<string, string[]>; // color_id -> urls[]
}
