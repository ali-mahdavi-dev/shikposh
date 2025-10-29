export interface ReviewEntity {
  id: number;
  productId: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
}
