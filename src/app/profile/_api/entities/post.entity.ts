export interface Post {
  id: string;
  title: string;
  thumbnail?: string;
  content?: string;
  image: string;
  category?: string;
  author: string;
  publishedAt?: string;
  createdAt: string;
  views: number;
  likes?: number;
  comments?: number;
  tags?: string[];
  description?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  badge?: string;
  badges?: string[];
}
