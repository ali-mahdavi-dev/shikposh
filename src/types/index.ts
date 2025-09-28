// Form types
export interface ReviewFormData {
  rating: number;
  comment: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Review related types
export interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
}

export interface CommentBoxProps {
  productId?: string;
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
  features: string[];
  colors: Record<string, ProductColor>;
  sizes: string[];
  specs: Record<string, string>;
  category: string;
  tags: string[];
}



export interface ProductColor {
  name: string;
  images: string[];
  price: number;
  stock: number;
  discount?: number;
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

