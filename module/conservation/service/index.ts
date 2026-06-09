import { IConservationRepository, IConservationService } from "../interface";
import { ConservationGateway } from "../websocket/gateway";

export class ConservationService implements IConservationService {
  constructor(private conservationRepo: IConservationRepository) {}

  async createConservation(userId: string) {
    return this.conservationRepo.createConservation(userId);
  }
  async getConservationById(conservationId: string) {
    return this.conservationRepo.getConservationById(conservationId);
  }
  async getConservationByUserId(userId: string) {
    return this.conservationRepo.getConservationByUserId(userId);
  }
  async getConservationByManagerId(managerId: string) {
    return this.conservationRepo.getConservationByManagerId(managerId);
  }

  async assignManager(conservationId: string, managerId: string) {
    const data = await this.conservationRepo.assignManager(
      conservationId,
      managerId,
    );
    // ConservationGateway.publishMessage(conservationId, {
    //   type: "assigned_manager",
    //   data,
    // });
    // return this.conservationRepo.assignManager(conservationId, managerId);
    console.log("Assigned manager:", data);
    return data;
  }

  async closeConservation(conservationId: string) {
    return this.conservationRepo.closeConservation(conservationId);
  }
  async sendMessage(
    conservationId: string,
    senderId: string,
    senderRole: "user" | "manager",
    content: string,
  ) {
    const message = await this.conservationRepo.createMessage(
      conservationId,
      senderId,
      senderRole,
      content,
    );

    await this.conservationRepo.updateLastMessage(conservationId, content);

    ConservationGateway.publishMessage(conservationId, message);

    return message;
  }
  async getMessages(conservationId: string) {
    return this.conservationRepo.getMessages(conservationId);
  }
  async getWaitingConservations() {
    return this.conservationRepo.getWaitingConservations();
  }
  async getAllConservations() {
    return this.conservationRepo.getAllConservations();
  }
  async getAllWaitingConservations() {
    return this.conservationRepo.getAllWaitingConservations();
  }
  async getAllChattingConservations() {
    return this.conservationRepo.getAllChattingConservations();
  }
  async getAllClosedConservations() {
    return this.conservationRepo.getAllClosedConservations();
  }
  async getConservationMessagesForAdmin(conservationId: string) {
    return this.conservationRepo.getConservationMessagesForAdmin(
      conservationId,
    );
  }
}
