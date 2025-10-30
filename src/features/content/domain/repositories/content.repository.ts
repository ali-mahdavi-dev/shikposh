import { Post } from '@/types';

export interface PlaylistEntity {
  id: string;
  title: string;
  thumbnail: string;
  itemCount: number;
  views: number;
  description?: string;
}

export interface ContentRepository {
  getPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post>;
  getFeaturedPosts(): Promise<Post[]>;
  getPostsByCategory(category: string): Promise<Post[]>;

  getPlaylists(): Promise<PlaylistEntity[]>;
  getPlaylist(id: string): Promise<PlaylistEntity>;
}


