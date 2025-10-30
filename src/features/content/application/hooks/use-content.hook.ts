import { useQuery } from '@tanstack/react-query';
import { ContentContainer } from '../../infrastructure/di/content.container';
import { Post } from '@/types';
import { PlaylistEntity } from '../../domain/repositories/content.repository';

const contentService = ContentContainer.getService();

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => contentService.getPosts(),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePost = (id: string) => {
  return useQuery<Post>({
    queryKey: ['posts', id],
    queryFn: () => contentService.getPost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedPosts = () => {
  return useQuery<Post[]>({
    queryKey: ['posts', 'featured'],
    queryFn: () => contentService.getFeaturedPosts(),
    staleTime: 10 * 60 * 1000,
  });
};

export const usePostsByCategory = (category: string) => {
  return useQuery<Post[]>({
    queryKey: ['posts', 'category', category],
    queryFn: () => contentService.getPostsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePlaylists = () => {
  return useQuery<PlaylistEntity[]>({
    queryKey: ['playlists'],
    queryFn: () => contentService.getPlaylists(),
    staleTime: 10 * 60 * 1000,
  });
};

export const usePlaylist = (id: string) => {
  return useQuery<PlaylistEntity>({
    queryKey: ['playlists', id],
    queryFn: () => contentService.getPlaylist(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};


