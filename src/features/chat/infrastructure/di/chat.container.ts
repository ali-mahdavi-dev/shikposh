import { ChatService } from '../../domain/services/chat.service';
import { HttpChatRepository } from '../repositories/http-chat.repository';

export class ChatContainer {
  private static chatRepository: HttpChatRepository;
  private static chatService: ChatService;

  static getChatRepository(): HttpChatRepository {
    if (!this.chatRepository) {
      this.chatRepository = new HttpChatRepository();
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
