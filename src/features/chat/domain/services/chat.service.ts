import { ChatRepository } from '../repositories/chat.repository';
import { ChatUserEntity, ChatMessageEntity } from '../entities/chat-user.entity';

export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

  async getAllChatUsers(): Promise<ChatUserEntity[]> {
    return this.chatRepository.getAllChatUsers();
  }

  async getChatUserById(id: string): Promise<ChatUserEntity> {
    if (!id) {
      throw new Error('User ID is required');
    }
    return this.chatRepository.getChatUserById(id);
  }

  async getChatMessages(senderId: string, receiverId: string): Promise<ChatMessageEntity[]> {
    if (!senderId || !receiverId) {
      throw new Error('Both sender and receiver IDs are required');
    }
    return this.chatRepository.getChatMessages(senderId, receiverId);
  }

  async sendMessage(
    messageData: Omit<ChatMessageEntity, 'id' | 'timestamp'>,
  ): Promise<ChatMessageEntity> {
    if (!messageData.senderId || !messageData.receiverId) {
      throw new Error('Both sender and receiver IDs are required');
    }
    if (!messageData.message.trim()) {
      throw new Error('Message content is required');
    }

    return this.chatRepository.sendMessage(messageData);
  }

  async markMessageAsRead(messageId: string): Promise<ChatMessageEntity> {
    if (!messageId) {
      throw new Error('Message ID is required');
    }
    return this.chatRepository.markMessageAsRead(messageId);
  }
}
