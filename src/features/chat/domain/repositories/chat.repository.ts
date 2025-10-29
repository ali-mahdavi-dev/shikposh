import { ChatUserEntity, ChatMessageEntity } from '../entities/chat-user.entity';

export interface ChatRepository {
  getAllChatUsers(): Promise<ChatUserEntity[]>;
  getChatUserById(id: string): Promise<ChatUserEntity>;
  getChatMessages(senderId: string, receiverId: string): Promise<ChatMessageEntity[]>;
  sendMessage(message: Omit<ChatMessageEntity, 'id' | 'timestamp'>): Promise<ChatMessageEntity>;
  markMessageAsRead(messageId: string): Promise<ChatMessageEntity>;
}
