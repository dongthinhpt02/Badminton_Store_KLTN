import { db } from "../../../src/shared/common/neon";
import {
  conversations,
  messages,
} from "../../../src/shared/common/neon/schema";
import { ConversationStatus, IConservationRepository } from "../interface";
import { Conversation, Message } from "../model";
import { and, eq, gte, lte, sql, desc, isNull } from "drizzle-orm";

export class ConservationRepo implements IConservationRepository {
  async createConversation(userId: string): Promise<Conversation> {
    const result = await db
      .insert(conversations)
      .values({
        userId,
        status: ConversationStatus.WAITING,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async getConversationById(
    conversationId: string,
  ): Promise<Conversation | null> {
    const result = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, conversationId));
    return result[0] || null;
  }
  async getConversationByUserId(
    userId: string,
  ): Promise<Conversation[] | null> {
    const result = await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId));
    return result;
  }
  async getConversationByManagerId(
    managerId: string,
  ): Promise<Conversation[] | null> {
    const result = await db
      .select()
      .from(conversations)
      .where(eq(conversations.managerId, managerId));
    return result;
  }
  async getWaitingConversations(): Promise<Conversation[]> {
    const result = await db
      .select()
      .from(conversations)
      .where(isNull(conversations.managerId));
    return result as Conversation[];
  }
  async assignManager(
    conversationId: string,
    managerId: string,
  ): Promise<Conversation> {
    const result = await db
      .update(conversations)
      .set({
        managerId,
        status: ConversationStatus.CHATTING,
      })
      .where(
        and(
          eq(conversations.status, ConversationStatus.WAITING),
          eq(conversations.id, conversationId),
        ),
      )
      .returning();

    console.log("result:", result);

    return result[0];
  }
  async updateLastMessage(
    conversationId: string,
    content: string,
  ): Promise<void> {
    await db
      .update(conversations)
      .set({
        lastMessage: content,
        lastMessageAt: new Date(),
        updated_at: new Date(),
      })
      .where(eq(conversations.id, conversationId));
  }
  async closeConversation(conversationId: string): Promise<Conversation> {
    const result = await db
      .update(conversations)
      .set({ status: ConversationStatus.CLOSED, closed_at: new Date() })
      .where(
        and(
          eq(conversations.status, ConversationStatus.CHATTING),
          eq(conversations.id, conversationId),
        ),
      )
      .returning();
    return result[0];
  }
  async createMessage(
    conversationId: string,
    senderId: string,
    senderRole: "user" | "manager",
    content: string,
  ): Promise<Message> {
    const result = await db
      .insert(messages)
      .values({
        conversationId,
        senderId,
        senderRole,
        content,
      })
      .returning();
    return result[0];
  }
  async getMessages(conversationId: string): Promise<Message[]> {
    const result = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(desc(messages.created_at));
    return result as Message[];
  }
  //Admin
  async getAllConversations(): Promise<Conversation[]> {
    const result = await db
      .select()
      .from(conversations)
      .orderBy(desc(conversations.created_at));
    return result as Conversation[];
  }
  async getAllWaitingConversations(): Promise<Conversation[]> {
    const result = await db
      .select()
      .from(conversations)
      .where(eq(conversations.status, ConversationStatus.WAITING))
      .orderBy(desc(conversations.created_at));
    return result as Conversation[];
  }
  async getAllChattingConversations(): Promise<Conversation[]> {
    const result = await db
      .select()
      .from(conversations)
      .where(eq(conversations.status, ConversationStatus.CHATTING))
      .orderBy(desc(conversations.created_at));
    return result as Conversation[];
  }
  async getAllClosedConversations(): Promise<Conversation[]> {
    const result = await db
      .select()
      .from(conversations)
      .where(eq(conversations.status, ConversationStatus.CLOSED))
      .orderBy(desc(conversations.created_at));
    return result as Conversation[];
  }
  async getConversationMessagesForAdmin(
    conversationId: string,
  ): Promise<Message[]> {
    const result = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(desc(messages.created_at));
    return result as Message[];
  }
}
