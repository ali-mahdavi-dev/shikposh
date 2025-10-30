import { apiService } from '@/shared/services/api.service';
import { Post } from '@/types';
import { ContentRepository, PlaylistEntity } from '../../domain/repositories/content.repository';

export class HttpContentRepository implements ContentRepository {
  getPosts(): Promise<Post[]> {
    return apiService.get<Post[]>('/posts');
  }

  getPost(id: string): Promise<Post> {
    return apiService.get<Post>(`/posts/${id}`);
  }

  getFeaturedPosts(): Promise<Post[]> {
    return apiService.get<Post[]>('/posts?isFeatured=true');
  }

  getPostsByCategory(category: string): Promise<Post[]> {
    if (category === 'all') {
      return this.getPosts();
    }
    return apiService.get<Post[]>(`/posts?category=${encodeURIComponent(category)}`);
  }

  getPlaylists(): Promise<PlaylistEntity[]> {
    return apiService.get<PlaylistEntity[]>('/playlists');
  }

  getPlaylist(id: string): Promise<PlaylistEntity> {
    return apiService.get<PlaylistEntity>(`/playlists/${id}`);
  }
}


