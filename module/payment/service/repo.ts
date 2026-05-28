import { eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import {
  cart,
  cartItems,
  orders,
  payments,
  stores,
  users,
} from "../../../src/shared/common/neon/schema";
import { IPaymentRepository } from "../interface";
import {
  ICreatePaymentForm,
  IUpdatePaymentForm,
  Payment,
  Status,
} from "../model";
import appConfig from "../../../src/shared/common/config";
import { formatDate, sortObject } from "../../../src/shared/utils/dateformat";
import { IUserRepository } from "../../user/interface";
import crypto from "crypto";
import qs from "qs";
import { v4 as uuidv4 } from "uuid";
import { Order, OrderStatus } from "../../order/model";

export class PaymentRepo implements IPaymentRepository {
  constructor(private readonly userRepo: IUserRepository) {}
  async insert(form: ICreatePaymentForm): Promise<Payment> {
    const result = await db
      .insert(payments)
      .values({
        ...form,
        namePayment: form.namePayment.trim(),
        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async update(id: string, form: IUpdatePaymentForm): Promise<Payment | null> {
    const result = await db
      .update(payments)
      .set({
        ...form,
        updated_at: new Date(),
      })
      .where(eq(payments.id, id))
      .returning();
    return result[0];
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(payments)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(payments)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<Payment | null> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.id, id))
      .limit(1);
    return result[0] || null;
  }
  async findByIdAdmin(id: string): Promise<Payment | null> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.id, id))
      .limit(1);
    return result[0] || null;
  }
  async findByName(name: string): Promise<Payment[] | null> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.namePayment, name.trim()));
    return result || null;
  }
  async findByNameAdmin(name: string): Promise<Payment[] | null> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.namePayment, name.trim()));
    return result || null;
  }
  async findAllPaymentActive(): Promise<Payment[]> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.status, Status.ACTIVE));
    return result;
  }
  async findAllPaymentInactive(): Promise<Payment[]> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.status, Status.INACTIVE));
    return result;
  }
  async findAllPayment(): Promise<Payment[]> {
    const result = await db.select().from(payments);
    return result;
  }
  // async VNPayPayment(
  //   userId: string,
  //   payload: {
  //     amount: number;
  //   },
  // ): Promise<string> {
  //   // =========================
  //   // FIND USER
  //   // =========================
  //   const user = await this.userRepo.findById(userId);

  //   if (!user) {
  //     throw new Error("User not found");
  //   }

  //   // =========================
  //   // VALIDATE AMOUNT
  //   // =========================
  //   if (
  //     typeof payload.amount !== "number" ||
  //     isNaN(payload.amount) ||
  //     payload.amount <= 0
  //   ) {
  //     throw new Error("Invalid amount");
  //   }

  //   // =========================
  //   // ORDER INFO
  //   // =========================
  //   const orderInfo = uuidv4();

  //   // =========================
  //   // BUILD BODY
  //   // =========================
  //   const body = {
  //     vnp_Version: "2.1.0",

  //     vnp_Command: "pay",

  //     vnp_TmnCode: appConfig.VNP.vnpTmnCode,

  //     // VNPAY yêu cầu nhân 100
  //     vnp_Amount: Math.round(Number(payload.amount) * 100),

  //     vnp_CreateDate: formatDate(new Date()),

  //     vnp_CurrCode: "VND",

  //     vnp_IpAddr: "127.0.0.1",

  //     vnp_Locale: "vn",

  //     vnp_OrderInfo: orderInfo,

  //     vnp_OrderType: "other",

  //     // mã giao dịch unique
  //     vnp_TxnRef: uuidv4(),

  //     // KHÔNG encodeURIComponent
  //     vnp_ReturnUrl: appConfig.VNP.vnpReturnUrl,

  //     // optional
  //     // vnp_ExpireDate: formatDate(
  //     //   new Date(
  //     //     Date.now() +
  //     //       15 * 60 * 1000,
  //     //   ),
  //     // ),
  //   };

  //   // =========================
  //   // SORT PARAMS
  //   // =========================
  //   const sortedParams = sortObject(body);

  //   // =========================
  //   // SIGN DATA
  //   // =========================
  //   const signData = qs.stringify(sortedParams, {
  //     encode: false,
  //   });

  //   // =========================
  //   // SECRET KEY
  //   // =========================
  //   const secretKey = appConfig.VNP.vnpHashSecret;

  //   if (!secretKey) {
  //     throw new Error("Missing VNPAY Hash Secret");
  //   }

  //   // =========================
  //   // CREATE SIGNATURE
  //   // =========================
  //   const hmac = crypto.createHmac("sha512", secretKey);

  //   const signature = hmac.update(signData, "utf-8").digest("hex");

  //   // =========================
  //   // ADD HASH
  //   // =========================
  //   sortedParams["vnp_SecureHash"] = signature;

  //   // =========================
  //   // FINAL URL
  //   // =========================
  //   const paymentUrl = `${appConfig.VNP.vnpUrl}?${qs.stringify(sortedParams, {
  //     encode: false,
  //   })}`;

  //   return paymentUrl;
  // }
  async VNPayPayment(
    userId: string,
    payload: {
      amount: number;
    },
  ): Promise<string> {
    // =========================
    // FIND USER
    // =========================
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // =========================
    // VALIDATE AMOUNT
    // =========================
    if (
      typeof payload.amount !== "number" ||
      isNaN(payload.amount) ||
      payload.amount <= 0
    ) {
      throw new Error("Invalid amount");
    }

    // =========================
    // CREATE PARAMS
    // =========================
    const params: Record<string, string> = {
      vnp_Version: "2.1.0",

      vnp_Command: "pay",

      vnp_TmnCode: appConfig.VNP.vnpTmnCode as string,

      // VNPAY yêu cầu x100
      vnp_Amount: String(Math.round(payload.amount * 100)),

      vnp_CreateDate: formatDate(new Date()),

      vnp_CurrCode: "VND",

      vnp_IpAddr: "127.0.0.1",

      vnp_Locale: "vn",

      vnp_OrderInfo: uuidv4(),

      vnp_OrderType: "other",

      vnp_ReturnUrl: appConfig.VNP.vnpReturnUrl as string,

      vnp_TxnRef: uuidv4(),
    };

    // =========================
    // SORT PARAMS
    // =========================
    const sortedParams = Object.fromEntries(
      Object.entries(params).sort(([key1], [key2]) => key1.localeCompare(key2)),
    );

    // =========================
    // QUERY STRING
    // =========================
    const signData = new URLSearchParams(sortedParams).toString();

    // =========================
    // CREATE HASH
    // =========================
    const hmac = crypto.createHmac(
      "sha512",
      appConfig.VNP.vnpHashSecret as string,
    );

    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    // =========================
    // FINAL URL
    // =========================
    const paymentUrl = `${appConfig.VNP.vnpUrl}?${signData}&vnp_SecureHash=${signed}`;

    console.log("SIGN DATA:");
    console.log(signData);

    console.log("SIGNATURE:");
    console.log(signed);

    console.log("PAYMENT URL:");
    console.log(paymentUrl);

    return paymentUrl;
  }
}
