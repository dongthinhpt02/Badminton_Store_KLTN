import { db } from "../../../src/shared/common/neon";
import {
  conservations,
  messages,
} from "../../../src/shared/common/neon/schema";
import { ConservationStatus, IConservationRepository } from "../interface";
import { Conservation, Message } from "../model";
import { and, eq, gte, lte, sql, desc, isNull } from "drizzle-orm";

export class ConservationRepo implements IConservationRepository {
  async createConservation(userId: string): Promise<Conservation> {
    const result = await db
      .insert(conservations)
      .values({
        userId,
        status: ConservationStatus.WAITING,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async getConservationById(
    conservationId: string,
  ): Promise<Conservation | null> {
    const result = await db
      .select()
      .from(conservations)
      .where(eq(conservations.id, conservationId));
    return result[0] || null;
  }
  async getConservationByUserId(
    userId: string,
  ): Promise<Conservation[] | null> {
    const result = await db
      .select()
      .from(conservations)
      .where(eq(conservations.userId, userId));
    return result;
  }
  async getConservationByManagerId(
    managerId: string,
  ): Promise<Conservation[] | null> {
    const result = await db
      .select()
      .from(conservations)
      .where(eq(conservations.managerId, managerId));
    return result;
  }
  async getWaitingConservations(): Promise<Conservation[]> {
    const result = await db
      .select()
      .from(conservations)
      .where(isNull(conservations.managerId));
    return result as Conservation[];
  }
  async assignManager(
    conservationId: string,
    managerId: string,
  ): Promise<Conservation> {
    const result = await db
      .update(conservations)
      .set({
        managerId,
        status: ConservationStatus.CHATTING,
      })
      .where(
        and(
          eq(conservations.status, ConservationStatus.WAITING),
          eq(conservations.id, conservationId),
        ),
      )
      .returning();

    console.log("result:", result);

    return result[0];
  }
  async updateLastMessage(
    conservationId: string,
    content: string,
  ): Promise<void> {
    await db
      .update(conservations)
      .set({
        lastMessage: content,
        lastMessageAt: new Date(),
        updated_at: new Date(),
      })
      .where(eq(conservations.id, conservationId));
  }
  async closeConservation(conservationId: string): Promise<Conservation> {
    const result = await db
      .update(conservations)
      .set({ status: ConservationStatus.CLOSED, closed_at: new Date() })
      .where(and(eq(conservations.id, conservationId)))
      .returning();
    return result[0];
  }
  async createMessage(
    conservationId: string,
    senderId: string,
    senderRole: "user" | "manager",
    content: string,
  ): Promise<Message> {
    const result = await db
      .insert(messages)
      .values({
        conservationId,
        senderId,
        senderRole,
        content,
      })
      .returning();
    return result[0];
  }
  async getMessages(conservationId: string): Promise<Message[]> {
    const result = await db
      .select()
      .from(messages)
      .where(eq(messages.conservationId, conservationId))
      .orderBy(desc(messages.created_at));
    return result as Message[];
  }
  //Admin
  async getAllConservations(): Promise<Conservation[]> {
    const result = await db
      .select()
      .from(conservations)
      .orderBy(desc(conservations.created_at));
    return result as Conservation[];
  }
  async getAllWaitingConservations(): Promise<Conservation[]> {
    const result = await db
      .select()
      .from(conservations)
      .where(eq(conservations.status, ConservationStatus.WAITING))
      .orderBy(desc(conservations.created_at));
    return result as Conservation[];
  }
  async getAllChattingConservations(): Promise<Conservation[]> {
    const result = await db
      .select()
      .from(conservations)
      .where(eq(conservations.status, ConservationStatus.CHATTING))
      .orderBy(desc(conservations.created_at));
    return result as Conservation[];
  }
  async getAllClosedConservations(): Promise<Conservation[]> {
    const result = await db
      .select()
      .from(conservations)
      .where(eq(conservations.status, ConservationStatus.CLOSED))
      .orderBy(desc(conservations.created_at));
    return result as Conservation[];
  }
  async getConservationMessagesForAdmin(
    conservationId: string,
  ): Promise<Message[]> {
    const result = await db
      .select()
      .from(messages)
      .where(eq(messages.conservationId, conservationId))
      .orderBy(desc(messages.created_at));
    return result as Message[];
  }
}
