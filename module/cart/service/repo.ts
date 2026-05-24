import { and, eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { ICartRepository } from "../interface";
import { Cart, CartWithItems } from "../model";
import { cart } from "../../../src/shared/common/neon/schema/cartSchema";
import { cartItems, users } from "../../../src/shared/common/neon/schema";
import { CartItem, Status } from "../../cartitem/model";
import appConfig from "../../../src/shared/common/config";
import { getDimensionForProduct } from "../../../src/shared/common/type";

export class CartRepo implements ICartRepository {
  async findById(id: string): Promise<CartWithItems | null> {
    // tìm cart
    const foundCart = await db
      .select()
      .from(cart)
      .where(eq(cart.id, id))
      .limit(1);

    if (foundCart.length === 0) {
      return null;
    }

    // tìm items của cart
    const items = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartId, id));

    return {
      ...foundCart[0],
      items: items as CartItem[],
    };
  }
  async findByUserId(userId: string): Promise<CartWithItems | null> {
    const result = await db
      .select({
        cartId: cart.id,
        userId: cart.userId,
        totalQuantity: cart.totalQuantity,
        totalPrice: cart.totalPrice,

        itemId: cartItems.id,
        productItemId: cartItems.productItemId,
        nameProductItem: cartItems.nameProductItem,
        status: cartItems.status,
        price: cartItems.price,
        pricePromotion: cartItems.pricePromotion,
        quantity: cartItems.quantity,
        imageProductItem: cartItems.imageProductItem,
        totalPriceCartItem: cartItems.totalPriceCartItem,
      })
      .from(cart)
      .leftJoin(cartItems, eq(cart.id, cartItems.cartId))
      .where(eq(cart.userId, userId));

    if (result.length === 0) {
      return null;
    }

    const firstRow = result[0];

    const items: CartItem[] = result
      .filter((row) => row.itemId !== null)
      .map((row) => ({
        id: row.itemId!,
        cartId: firstRow.cartId,
        productItemId: row.productItemId!,
        nameProductItem: row.nameProductItem!,
        status: row.status as any,
        price: row.price!,
        pricePromotion: row.pricePromotion,
        quantity: row.quantity!,
        imageProductItem: row.imageProductItem!,
        totalPriceCartItem: row.totalPriceCartItem!,
      }));

    return {
      id: firstRow.cartId,
      userId: firstRow.userId,
      totalQuantity: firstRow.totalQuantity,
      totalPrice: firstRow.totalPrice,
      items,
    };
  }
  async updateCartTotals(userId: string): Promise<Cart | null> {
    // tìm cart theo userId
    const findCart = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .limit(1);

    if (findCart.length === 0) {
      throw new Error("Cart not found");
    }

    const currentCart = findCart[0];

    // lấy cart items đang tick
    const items = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, currentCart.id),
          eq(cartItems.status, Status.TICK),
        ),
      );

    // tính tổng
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = items.reduce(
      (sum, item) => sum + item.totalPriceCartItem,
      0,
    );

    // update cart
    const updated = await db
      .update(cart)
      .set({
        totalQuantity,
        totalPrice,
      })
      .where(eq(cart.id, currentCart.id))
      .returning();

    return updated[0] ?? null;
  }
  async calculateAllItems(id: string): Promise<any> {
    // tìm cart theo userId
    const findCart = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, id))
      .limit(1);

    if (findCart.length === 0) {
      throw new Error("Cart not found");
    }

    const currentCart = findCart[0];

    // lấy cart items đang tick
    const cartItemsResult = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, currentCart.id),
          eq(cartItems.status, Status.TICK),
        ),
      );

    if (cartItemsResult.length === 0) {
      throw new Error("Cart items not found");
    }

    // map dimension
    const items = await Promise.all(
      cartItemsResult.map(async (item) => {
        const dim = await getDimensionForProduct(item.nameProductItem);

        return {
          name: item.nameProductItem,
          quantity: item.quantity,
          height: dim.height,
          length: dim.length,
          width: dim.width,
          weight: dim.weight,
        };
      }),
    );

    // tính dimension tổng
    const totalWeight = items.reduce(
      (sum, item) => sum + item.weight * item.quantity,
      0,
    );

    const totalLength = Math.max(...items.map((item) => item.length));

    const totalWidth = Math.max(...items.map((item) => item.width));

    const totalHeight = Math.max(...items.map((item) => item.height));

    // bảo hiểm
    const insuranceValue = currentCart.totalPrice / 10 || 0;

    return {
      service_id: Number(appConfig.GHN.serviceId),

      insurance_value: insuranceValue,

      coupon: "",

      weight: totalWeight,
      length: totalLength,
      width: totalWidth,
      height: totalHeight,

      items,
    };
  }
}
