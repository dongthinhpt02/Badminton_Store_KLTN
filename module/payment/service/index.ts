import { IPaymentRepository, IPaymentService } from "../interface";
import { ICreatePaymentForm, IUpdatePaymentForm, Payment } from "../model";

export class PaymentService implements IPaymentService {
  constructor(private paymentRepo: IPaymentRepository) {}
  async create(form: ICreatePaymentForm): Promise<Payment> {
    return await this.paymentRepo.insert(form);
  }
  async update(id: string, form: IUpdatePaymentForm): Promise<Payment | null> {
    return await this.paymentRepo.update(id, form);
  }
  async delete(id: string): Promise<boolean> {
    return await this.paymentRepo.delete(id);
  }
  async restore(id: string): Promise<boolean> {
    return await this.paymentRepo.restore(id);
  }
  async getById(id: string): Promise<Payment | null> {
    return await this.paymentRepo.findById(id);
  }
  async getByIdAdmin(id: string): Promise<Payment | null> {
    return await this.paymentRepo.findByIdAdmin(id);
  }
  async getByName(name: string): Promise<Payment[] | null> {
    return await this.paymentRepo.findByName(name);
  }
  async getByNameAdmin(name: string): Promise<Payment[] | null> {
    return await this.paymentRepo.findByNameAdmin(name);
  }
  async getAllPaymentActive(): Promise<Payment[]> {
    return await this.paymentRepo.findAllPaymentActive();
  }
  async getAllPaymentInactive(): Promise<Payment[]> {
    return await this.paymentRepo.findAllPaymentInactive();
  }
  async getAllPayment(): Promise<Payment[]> {
    return await this.paymentRepo.findAllPayment();
  }
}
