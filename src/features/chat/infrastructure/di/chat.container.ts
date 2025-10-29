import { ChatService } from '../../domain/services/chat.service';
import { JsonServerChatRepository } from '../repositories/json-server-chat.repository';

export class ChatContainer {
  private static chatRepository: JsonServerChatRepository;
  private static chatService: ChatService;

  static getChatRepository(): JsonServerChatRepository {
    if (!this.chatRepository) {
      this.chatRepository = new JsonServerChatRepository();
    }
    return this.chatRepository;
  }

  static getChatService(): ChatService {
    if (!this.chatService) {
      this.chatService = new ChatService(this.getChatRepository());
    }
    return this.chatService;
  }
}
