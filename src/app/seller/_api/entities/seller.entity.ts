export interface SellerEntity {
  id: string;
  name: string;
  avatar: string;
  description: string;
  rating: number;
  totalProducts: number;
  joinDate: string;
  verified: boolean;
  totalSales: number;
  responseTime: string;
  location: string;
  categories: string[];
  socialMedia: {
    instagram?: string;
    telegram?: string;
    website?: string;
  };
  stats: {
    totalReviews: number;
    averageRating: number;
    totalOrders: number;
    completionRate: number;
  };
}

export interface SellerSummary {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalProducts: number;
  verified: boolean;
}
