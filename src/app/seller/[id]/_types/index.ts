export interface SellerCategory {
  id: string;
  name: string;
  count: number;
}

export interface Seller {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  rating?: number;
  totalProducts?: number;
  joinDate?: string;
  verified?: boolean;
  categories?: SellerCategory[] | string[];
}
