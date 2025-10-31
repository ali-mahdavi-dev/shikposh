export interface WishlistProduct {
  id: string;
  name: string;
  image?: string;
  price: number;
  colors?: Record<string, any>;
  sizes?: string[];
}
