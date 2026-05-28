import { Order } from "../../order/model";
import { ICreatePaymentForm, IUpdatePayment, Payment } from "../model";

export interface IPaymentRepository {
  insert(form: ICreatePaymentForm): Promise<Payment>;
  update(id: string, form: IUpdatePayment): Promise<Payment | null>;
  delete(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
  findById(id: string): Promise<Payment | null>;
  findByIdAdmin(id: string): Promise<Payment | null>;
  findByName(name: string): Promise<Payment[] | null>;
  findByNameAdmin(name: string): Promise<Payment[] | null>;
  findAllPaymentActive(): Promise<Payment[]>;
  findAllPaymentInactive(): Promise<Payment[]>;
  findAllPayment(): Promise<Payment[]>;
  VNPayPayment(
    id: string,
    payload: {
      amount: number;
    },
  ): Promise<any>;
}
export interface IPaymentService {
  create(form: ICreatePaymentForm): Promise<Payment>;
  update(id: string, form: IUpdatePayment): Promise<Payment | null>;
  delete(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
  getById(id: string): Promise<Payment | null>;
  getByIdAdmin(id: string): Promise<Payment | null>;
  getByName(name: string): Promise<Payment[] | null>;
  getByNameAdmin(name: string): Promise<Payment[] | null>;
  getAllPaymentActive(): Promise<Payment[]>;
  getAllPaymentInactive(): Promise<Payment[]>;
  getAllPayment(): Promise<Payment[]>;
  VNPayPayment(
    id: string,
    payload: {
      amount: number;
    },
  ): Promise<any>;
  AfterVNPayPayment(
    userId: string,
    phonenumber: string,
    vnParams: any,
  ): Promise<Order>;
  CODPayment(id: string, phonenumber: string): Promise<Order>;
}
