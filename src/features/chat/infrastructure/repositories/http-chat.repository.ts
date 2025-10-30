import { ChatRepository } from '../../domain/repositories/chat.repository';
import { ChatUserEntity, ChatMessageEntity } from '../../domain/entities/chat-user.entity';
import { apiService } from '@/shared/services/api.service';

export class HttpChatRepository implements ChatRepository {
  async getAllChatUsers(): Promise<ChatUserEntity[]> {
    return apiService.get<ChatUserEntity[]>('/chatUsers');
  }

  async getChatUserById(id: string): Promise<ChatUserEntity> {
    return apiService.get<ChatUserEntity>(`/chatUsers/${id}`);
  }

  async getChatMessages(senderId: string, receiverId: string): Promise<ChatMessageEntity[]> {
    return apiService.get<ChatMessageEntity[]>(`/messages`, { senderId, receiverId });
  }

  async sendMessage(
    messageData: Omit<ChatMessageEntity, 'id' | 'timestamp'>,
  ): Promise<ChatMessageEntity> {
    const newMessage = {
      ...messageData,
      timestamp: new Date().toISOString(),
    };
    return apiService.post<ChatMessageEntity>('/messages', newMessage);
  }

  async markMessageAsRead(messageId: string): Promise<ChatMessageEntity> {
    return apiService.patch<ChatMessageEntity>(`/messages/${messageId}`, { isRead: true });
  }
}


