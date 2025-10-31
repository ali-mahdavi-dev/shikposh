export interface ReviewEntity {
  id: number;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
  notHelpful: number;
  verified?: boolean;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
}
