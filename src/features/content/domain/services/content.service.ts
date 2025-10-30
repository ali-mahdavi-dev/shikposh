import { Post } from '@/types';
import { ContentRepository, PlaylistEntity } from '../repositories/content.repository';

export class ContentService {
  constructor(private contentRepository: ContentRepository) {}

  getPosts(): Promise<Post[]> {
    return this.contentRepository.getPosts();
  }

  getPost(id: string): Promise<Post> {
    return this.contentRepository.getPost(id);
  }

  getFeaturedPosts(): Promise<Post[]> {
    return this.contentRepository.getFeaturedPosts();
  }

  getPostsByCategory(category: string): Promise<Post[]> {
    return this.contentRepository.getPostsByCategory(category);
  }

  getPlaylists(): Promise<PlaylistEntity[]> {
    return this.contentRepository.getPlaylists();
  }

  getPlaylist(id: string): Promise<PlaylistEntity> {
    return this.contentRepository.getPlaylist(id);
  }
}


