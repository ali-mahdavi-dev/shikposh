export interface ProductVariant {
  price: number;
  stock: number;
  discount: number;
  images: string[];
}

export interface ProductColor {
  name: string;
  stock?: number;
  discount?: number;
}

export interface ProductSpecs {
  [key: string]: string;
}

export interface ProductEntity {
  id: string;
  name: string;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  colors: Record<string, ProductColor>;
  variants: Record<string, Record<string, ProductVariant>>;
  specs: ProductSpecs;
  category: string;
  tags: string[];
  image: string;
  price: number;
  originalPrice?: number;
  discount: number;
  isNew: boolean;
  isFeatured: boolean;
  sizes: string[];
  sellerId?: string;
}

export interface ProductSummary {
  id: string;
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
  colors: Record<string, ProductColor>;
  sizes: string[];
  brand: string;
  description: string;
  tags: string[];
}
