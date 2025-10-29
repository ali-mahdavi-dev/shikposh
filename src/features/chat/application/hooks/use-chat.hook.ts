import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChatContainer } from '../../infrastructure/di/chat.container';
import { ChatUserEntity, ChatMessageEntity } from '../../domain/entities/chat-user.entity';

const chatService = ChatContainer.getChatService();

export const useChatUsers = () => {
  return useQuery<ChatUserEntity[]>({
    queryKey: ['chatUsers'],
    queryFn: () => chatService.getAllChatUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useChatUser = (id: string) => {
  return useQuery<ChatUserEntity>({
    queryKey: ['chatUsers', id],
    queryFn: () => chatService.getChatUserById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useChatMessages = (senderId: string, receiverId: string) => {
  return useQuery<ChatMessageEntity[]>({
    queryKey: ['chatMessages', senderId, receiverId],
    queryFn: () => chatService.getChatMessages(senderId, receiverId),
    enabled: !!senderId && !!receiverId,
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageData: Omit<ChatMessageEntity, 'id' | 'timestamp'>) =>
      chatService.sendMessage(messageData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chatMessages', variables.senderId, variables.receiverId],
      });
    },
    onError: (error) => {
      console.error('Failed to send message:', error);
    },
  });
};

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) => chatService.markMessageAsRead(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMessages'] });
    },
    onError: (error) => {
      console.error('Failed to mark message as read:', error);
    },
  });
};
