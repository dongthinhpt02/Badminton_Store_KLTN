import { db } from "../../../src/shared/common/neon";
import {
  cart,
  cartItems,
  orderDetails,
  orders,
  productItems,
  stores,
  users,
} from "../../../src/shared/common/neon/schema";
import { getDimensionForOrder } from "../../../src/shared/common/type";
import { ICartService } from "../../cart/interface";
import { Order, OrderStatus } from "../../order/model";
import { Status } from "../../store/model";
import { IPaymentRepository, IPaymentService } from "../interface";
import { ICreatePaymentForm, IUpdatePaymentForm, Payment } from "../model";
import { eq, and } from "drizzle-orm";
import { Status as CartItemStatus } from "../../cartitem/model";
import appConfig from "../../../src/shared/common/config";
import { IOrderDetailRepository } from "../../orderdetail/interface";
import { IOrderRepository } from "../../order/interface";

export class PaymentService implements IPaymentService {
  constructor(
    private readonly paymentRepo: IPaymentRepository,
    private readonly cartService: ICartService,
    private readonly orderDetailRepo: IOrderDetailRepository,
    private readonly orderRepo: IOrderRepository,
  ) {}
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
  async VNPayPayment(
    id: string,
    payload: {
      amount: number;
    },
  ): Promise<any> {
    return await this.paymentRepo.VNPayPayment(id, payload);
  }
  async AfterVNPayPayment(
    userId: string,
    phonenumber: string,
    vnpParams: any,
  ): Promise<Order> {
    // check user
    const foundUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (foundUser.length === 0) {
      throw new Error("User not found");
    }

    const user = foundUser[0];

    const cart1 = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .limit(1);

    if (cart1.length === 0) {
      throw new Error("Cart not found");
    }
    const foundCart = cart1[0];

    const store = await db
      .select()
      .from(stores)
      .where(eq(stores.status, Status.ACTIVE))
      .limit(1);

    if (store.length === 0) {
      throw new Error("Store not found");
    }

    const foundStore = store[0];

    console.log("Found user:", foundUser);
    console.log("Found cart:", foundCart);
    console.log("Found store:", foundStore);

    // check payment status
    if (vnpParams.vnp_TransactionStatus !== "00") {
      throw new Error("Transaction failed");
    }

    const calculatedCart = await this.cartService.calculateTotalFee(userId);

    const insertedOrder = await this.orderRepo.insertOrder({
      userId: user.id,
      fullname: user.fullname,
      totalQuantity: foundCart.totalQuantity,
      totalCart: foundCart.totalPrice,
      shippingFee: calculatedCart.shippingFee,
      totalCartOrder: calculatedCart.totalCartOrder,
      address: user.to_address as string,
      phonenumber: phonenumber,
      status: OrderStatus.PROCESSING,
      namePayment: "VNPAY",
      from_district_id: foundStore.from_district,
      from_ward_code: foundStore.from_ward,
      to_district_id: user.to_district as number,
      to_ward_code: user.to_ward as string,
      cod_amount: 0,
      created_at: new Date(),
    });

    console.log("Inserted order:", insertedOrder);

    // find tick cart items
    const tickItems = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, foundCart.id),
          eq(cartItems.status, CartItemStatus.TICK),
        ),
      );

    // insert order detail + update stock
    for (const item of tickItems) {
      await this.orderDetailRepo.insertOrderDetail({
        orderId: insertedOrder.id,
        productItemId: item.productItemId,
        nameProductItem: item.nameProductItem,
        price: item.price,
        pricePromotion: item.pricePromotion,
        quantity: item.quantity,
        imageProductItem: item.imageProductItem,
        totalPriceOrderDetail: item.totalPriceCartItem,
      });
      // trừ tồn kho
      const foundProductItem = await db
        .select()
        .from(productItems)
        .where(eq(productItems.id, item.productItemId))
        .limit(1);

      if (foundProductItem.length > 0) {
        const currentProductItem = foundProductItem[0];

        await db
          .update(productItems)
          .set({
            quantity: currentProductItem.quantity - item.quantity,
          })
          .where(eq(productItems.id, item.productItemId));
      }
    }

    // reset cart
    await db
      .update(cart)
      .set({
        totalPrice: 0,
        totalQuantity: 0,
      })
      .where(eq(cart.userId, userId));

    // delete tick items
    await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.cartId, foundCart.id),
          eq(cartItems.status, CartItemStatus.TICK),
        ),
      );
    return insertedOrder;
  }
  async CODPayment(userId: string, phonenumber: string): Promise<Order> {
    // =========================
    // USER
    // =========================
    const foundUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (foundUser.length === 0) {
      throw new Error("User not found");
    }

    const user = foundUser[0];

    // =========================
    // CART
    // =========================
    const foundCart = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .limit(1);

    if (foundCart.length === 0) {
      throw new Error("Cart not found");
    }

    const currentCart = foundCart[0];

    // =========================
    // STORE
    // =========================
    const foundStore = await db
      .select()
      .from(stores)
      .where(eq(stores.status, Status.ACTIVE))
      .limit(1);

    if (foundStore.length === 0) {
      throw new Error("Store not found");
    }

    const store = foundStore[0];

    // =========================
    // SHIPPING FEE
    // =========================
    const calculatedCart = await this.cartService.calculateTotalFee(userId);

    // =========================
    // CREATE ORDER
    // =========================
    const insertedOrder = await this.orderRepo.insertOrder({
      userId: user.id,
      fullname: user.fullname,
      totalQuantity: currentCart.totalQuantity,
      totalCart: currentCart.totalPrice,
      shippingFee: calculatedCart.shippingFee,
      totalCartOrder: calculatedCart.totalCartOrder,
      address: user.to_address as string,
      phonenumber: phonenumber,
      status: OrderStatus.PROCESSING,
      namePayment: "COD",
      from_district_id: store.from_district,
      from_ward_code: store.from_ward,
      to_district_id: user.to_district as number,
      to_ward_code: user.to_ward as string,
      cod_amount: calculatedCart.totalCartOrder,
      created_at: new Date(),
    });

    // =========================
    // CART ITEMS
    // =========================
    const tickItems = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, currentCart.id),
          eq(cartItems.status, CartItemStatus.TICK),
        ),
      );

    // =========================
    // INSERT ORDER DETAILS
    // =========================
    for (const item of tickItems) {
      await this.orderDetailRepo.insertOrderDetail({
        orderId: insertedOrder.id,
        productItemId: item.productItemId,
        nameProductItem: item.nameProductItem,
        price: item.price,
        pricePromotion: item.pricePromotion,
        quantity: item.quantity,
        imageProductItem: item.imageProductItem,
        totalPriceOrderDetail: item.totalPriceCartItem,
      });

      // update stock
      const foundProductItem = await db
        .select()
        .from(productItems)
        .where(eq(productItems.id, item.productItemId))
        .limit(1);

      if (foundProductItem.length > 0) {
        const currentProductItem = foundProductItem[0];

        await db
          .update(productItems)
          .set({
            quantity: currentProductItem.quantity - item.quantity,
          })
          .where(eq(productItems.id, item.productItemId));
      }
    }

    // =========================
    // RESET CART
    // =========================
    await db
      .update(cart)
      .set({
        totalPrice: 0,
        totalQuantity: 0,
      })
      .where(eq(cart.userId, userId));

    // =========================
    // DELETE TICK ITEMS
    // =========================
    await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.cartId, currentCart.id),
          eq(cartItems.status, CartItemStatus.TICK),
        ),
      );

    // =========================
    // GHN ITEMS
    // =========================
    return insertedOrder;
  }
}
