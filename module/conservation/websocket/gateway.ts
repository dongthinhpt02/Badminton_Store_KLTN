import { publishConservation } from ".";

export class ConservationGateway {
  static publishMessage(conservationId: string, message: any) {
    publishConservation(conservationId, {
      type: "new_message",
      data: message,
    });
  }
}
