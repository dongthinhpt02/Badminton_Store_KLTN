import { Conservation, Message } from "../model";

export enum ConservationStatus {
  WAITING = "waiting",
  CHATTING = "chatting",
  CLOSED = "closed",
}

export interface IConservationRepository {
  // User + Manager
  createConservation(userId: string): Promise<Conservation>;

  getConservationById(conservationId: string): Promise<Conservation | null>;

  getConservationByUserId(userId: string): Promise<Conservation[] | null>;

  getConservationByManagerId(managerId: string): Promise<Conservation[] | null>;

  getWaitingConservations(): Promise<Conservation[]>;

  assignManager(
    conservationId: string,
    managerId: string,
  ): Promise<Conservation>;

  closeConservation(conservationId: string): Promise<Conservation>;

  updateLastMessage(conservationId: string, content: string): Promise<void>;

  createMessage(
    conservationId: string,
    senderId: string,
    senderRole: "user" | "manager",
    content: string,
  ): Promise<Message>;

  getMessages(conservationId: string): Promise<Message[]>;

  // Admin
  getAllConservations(): Promise<Conservation[]>;

  getAllWaitingConservations(): Promise<Conservation[]>;

  getAllChattingConservations(): Promise<Conservation[]>;

  getAllClosedConservations(): Promise<Conservation[]>;

  getConservationMessagesForAdmin(conservationId: string): Promise<Message[]>;
}

export interface IConservationService {
  createConservation(userId: string): Promise<Conservation>;

  getConservationById(conservationId: string): Promise<Conservation | null>;

  getConservationByUserId(userId: string): Promise<Conservation[] | null>;

  getConservationByManagerId(managerId: string): Promise<Conservation[] | null>;

  getWaitingConservations(): Promise<Conservation[]>;

  assignManager(
    conservationId: string,
    managerId: string,
  ): Promise<Conservation>;

  closeConservation(conservationId: string): Promise<Conservation>;

  sendMessage(
    conservationId: string,
    senderId: string,
    senderRole: "user" | "manager",
    content: string,
  ): Promise<Message>;

  getMessages(conservationId: string): Promise<Message[]>;

  getWaitingConservations(): Promise<Conservation[]>;

  // Admin
  getAllConservations(): Promise<Conservation[]>;

  getAllWaitingConservations(): Promise<Conservation[]>;

  getAllChattingConservations(): Promise<Conservation[]>;

  getAllClosedConservations(): Promise<Conservation[]>;

  getConservationMessagesForAdmin(conservationId: string): Promise<Message[]>;
}
