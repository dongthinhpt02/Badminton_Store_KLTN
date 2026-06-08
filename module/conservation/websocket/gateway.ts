import { publishConversation } from ".";

export class ConversationGateway {
  static publishMessage(conversationId: string, message: any) {
    publishConversation(conversationId, {
      type: "new_message",
      data: message,
    });
  }
}
