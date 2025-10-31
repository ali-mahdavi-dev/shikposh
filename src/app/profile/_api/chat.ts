import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/shared/services/api.service';

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export const useChatUsers = () => {
  return useQuery<ChatUser[]>({
    queryKey: ['chat-users'],
    queryFn: () => apiService.get<ChatUser[]>('/chat/users'),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
