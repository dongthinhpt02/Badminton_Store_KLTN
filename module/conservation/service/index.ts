import { IConservationRepository, IConservationService } from "../interface";
import { ConversationGateway } from "../websocket/gateway";

export class ConservationService implements IConservationService {
  constructor(private conservationRepo: IConservationRepository) {}

  async createConversation(userId: string) {
    return this.conservationRepo.createConversation(userId);
  }
  async getConversationById(conversationId: string) {
    return this.conservationRepo.getConversationById(conversationId);
  }
  async getConversationByUserId(userId: string) {
    return this.conservationRepo.getConversationByUserId(userId);
  }
  async getConversationByManagerId(managerId: string) {
    return this.conservationRepo.getConversationByManagerId(managerId);
  }

  async assignManager(conversationId: string, managerId: string) {
    const data = await this.conservationRepo.assignManager(
      conversationId,
      managerId,
    );
    // ConversationGateway.publishMessage(conversationId, {
    //   type: "assigned_manager",
    //   data,
    // });
    // return this.conservationRepo.assignManager(conversationId, managerId);
    console.log("Assigned manager:", data);
    return data;
  }

  async closeConversation(conversationId: string) {
    return this.conservationRepo.closeConversation(conversationId);
  }
  async sendMessage(
    conversationId: string,
    senderId: string,
    senderRole: "user" | "manager",
    content: string,
  ) {
    const message = await this.conservationRepo.createMessage(
      conversationId,
      senderId,
      senderRole,
      content,
    );

    await this.conservationRepo.updateLastMessage(conversationId, content);

    ConversationGateway.publishMessage(conversationId, message);

    return message;
  }
  async getMessages(conversationId: string) {
    return this.conservationRepo.getMessages(conversationId);
  }
  async getWaitingConversations() {
    return this.conservationRepo.getWaitingConversations();
  }
  async getAllConversations() {
    return this.conservationRepo.getAllConversations();
  }
  async getAllWaitingConversations() {
    return this.conservationRepo.getAllWaitingConversations();
  }
  async getAllChattingConversations() {
    return this.conservationRepo.getAllChattingConversations();
  }
  async getAllClosedConversations() {
    return this.conservationRepo.getAllClosedConversations();
  }
  async getConversationMessagesForAdmin(conversationId: string) {
    return this.conservationRepo.getConversationMessagesForAdmin(
      conversationId,
    );
  }
}
