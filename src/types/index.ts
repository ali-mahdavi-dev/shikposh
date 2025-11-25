// Form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  count?: number;
  color?: string;
}

// Seller related types
export interface Seller {
  id: string;
  name: string;
  avatar: string;
  description: string;
  rating: number;
  totalProducts: number;
  joinDate: string;
  verified: boolean;
  categories: Category[];
}

export interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

// Product related types
export interface Product {
  id: string;
  name: string;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  features?: string[];
  colors: Record<string, { name: string; stock?: number; discount?: number }>;
  variants?: Record<string, ProductSize>;
  sizes: string[];
  specs?: Record<string, string>;
  category: string;
  tags?: string[];
  image?: string;
  price?: number;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface ProductVariant {
  name: string;
  images: string[];
  price: number;
  stock: number;
  discount?: number;
}

export interface ProductSize {
  name: string;
  size: Record<string, ProductVariant>;
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

// Post related types
export interface Post {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  publishedAt: string;
  description?: string;
  category?: string;
  likes?: number;
  comments?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  badge?: string;
  badges?: string[];
}
