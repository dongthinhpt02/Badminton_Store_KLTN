import { Conversation, Message } from "../model";

export enum ConversationStatus {
  WAITING = "waiting",
  CHATTING = "chatting",
  CLOSED = "closed",
}

export interface IConservationRepository {
  // User + Manager
  createConversation(userId: string): Promise<Conversation>;

  getConversationById(conversationId: string): Promise<Conversation | null>;

  getConversationByUserId(userId: string): Promise<Conversation[] | null>;

  getConversationByManagerId(managerId: string): Promise<Conversation[] | null>;

  getWaitingConversations(): Promise<Conversation[]>;

  assignManager(
    conversationId: string,
    managerId: string,
  ): Promise<Conversation>;

  closeConversation(conversationId: string): Promise<Conversation>;

  updateLastMessage(conversationId: string, content: string): Promise<void>;

  createMessage(
    conversationId: string,
    senderId: string,
    senderRole: "user" | "manager",
    content: string,
  ): Promise<Message>;

  getMessages(conversationId: string): Promise<Message[]>;

  // Admin
  getAllConversations(): Promise<Conversation[]>;

  getAllWaitingConversations(): Promise<Conversation[]>;

  getAllChattingConversations(): Promise<Conversation[]>;

  getAllClosedConversations(): Promise<Conversation[]>;

  getConversationMessagesForAdmin(conversationId: string): Promise<Message[]>;
}

export interface IConservationService {
  createConversation(userId: string): Promise<Conversation>;

  getConversationById(conversationId: string): Promise<Conversation | null>;

  getConversationByUserId(userId: string): Promise<Conversation[] | null>;

  getConversationByManagerId(managerId: string): Promise<Conversation[] | null>;

  getWaitingConversations(): Promise<Conversation[]>;

  assignManager(
    conversationId: string,
    managerId: string,
  ): Promise<Conversation>;

  closeConversation(conversationId: string): Promise<Conversation>;

  sendMessage(
    conversationId: string,
    senderId: string,
    senderRole: "user" | "manager",
    content: string,
  ): Promise<Message>;

  getMessages(conversationId: string): Promise<Message[]>;

  getWaitingConversations(): Promise<Conversation[]>;

  // Admin
  getAllConversations(): Promise<Conversation[]>;

  getAllWaitingConversations(): Promise<Conversation[]>;

  getAllChattingConversations(): Promise<Conversation[]>;

  getAllClosedConversations(): Promise<Conversation[]>;

  getConversationMessagesForAdmin(conversationId: string): Promise<Message[]>;
}
