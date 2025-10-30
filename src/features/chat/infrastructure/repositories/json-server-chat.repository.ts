import { ChatRepository } from '../../domain/repositories/chat.repository';
import { ChatUserEntity, ChatMessageEntity } from '../../domain/entities/chat-user.entity';
import { getApiBaseUrl } from '../../../../shared/config/env';

const API_BASE_URL = getApiBaseUrl();

export class JsonServerChatRepository implements ChatRepository {
  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw new Error(
        `Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  private async postData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      throw new Error(
        `Failed to post data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  private async patchData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error patching data to ${endpoint}:`, error);
      throw new Error(
        `Failed to patch data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async getAllChatUsers(): Promise<ChatUserEntity[]> {
    return this.fetchData<ChatUserEntity[]>('/chatUsers');
  }

  async getChatUserById(id: string): Promise<ChatUserEntity> {
    return this.fetchData<ChatUserEntity>(`/chatUsers/${id}`);
  }

  async getChatMessages(senderId: string, receiverId: string): Promise<ChatMessageEntity[]> {
    return this.fetchData<ChatMessageEntity[]>(
      `/messages?senderId=${senderId}&receiverId=${receiverId}`,
    );
  }

  async sendMessage(
    messageData: Omit<ChatMessageEntity, 'id' | 'timestamp'>,
  ): Promise<ChatMessageEntity> {
    const newMessage = {
      ...messageData,
      timestamp: new Date().toISOString(),
    };

    return this.postData<ChatMessageEntity>('/messages', newMessage);
  }

  async markMessageAsRead(messageId: string): Promise<ChatMessageEntity> {
    return this.patchData<ChatMessageEntity>(`/messages/${messageId}`, {
      isRead: true,
    });
  }
}
