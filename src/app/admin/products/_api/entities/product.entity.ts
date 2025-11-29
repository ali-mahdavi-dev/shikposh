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
  stock: number;
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

