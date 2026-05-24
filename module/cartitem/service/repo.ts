import { and, eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import {
  cart,
  cartItems,
  productItems,
  users,
} from "../../../src/shared/common/neon/schema";
import { ICartItemRepository } from "../interface";
import {
  CartItem,
  ICreateCartItemForm,
  IUpdateCartItemForm,
  Status,
} from "../model";

export class CartItemRepo implements ICartItemRepository {
  async insert(form: ICreateCartItemForm): Promise<CartItem> {
    // tìm cart item đã tồn tại chưa
    const existingCartItem = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, form.cartId),
          eq(cartItems.productItemId, form.productItemId),
        ),
      )
      .limit(1);

    // đã tồn tại
    if (existingCartItem.length > 0) {
      const item = existingCartItem[0];

      // tìm product item
      const productInCartItem = await db
        .select()
        .from(productItems)
        .where(eq(productItems.id, form.productItemId))
        .limit(1);

      if (productInCartItem.length === 0) {
        throw new Error("Product item not found");
      }

      const product = productInCartItem[0];

      // quantity mới
      const newQuantity = item.quantity + form.quantity;

      // check stock
      if (newQuantity > product.quantity) {
        throw new Error("Quantity exceeds available stock");
      }

      // total
      const newTotalPriceCartItem = item.price * newQuantity;

      // update
      const updated = await db
        .update(cartItems)
        .set({
          quantity: newQuantity,
          totalPriceCartItem: newTotalPriceCartItem,
        })
        .where(eq(cartItems.id, item.id))
        .returning();

      return updated[0] as CartItem;
    }

    // tính total price
    let totalPrice = 0;

    if (form.pricePromotion != null) {
      totalPrice = form.pricePromotion * form.quantity;
    } else {
      totalPrice = form.price * form.quantity;
    }

    // insert mới
    const result = await db
      .insert(cartItems)
      .values({
        cartId: form.cartId,
        productItemId: form.productItemId,
        nameProductItem: form.nameProductItem,
        status: Status.UNTICK,
        price: form.price,
        pricePromotion: form.pricePromotion ?? null,
        quantity: form.quantity,
        imageProductItem: form.imageProductItem,
        totalPriceCartItem: totalPrice,
      })
      .returning();

    return result[0] as CartItem;
  }
  async update(
    id: string,
    form: IUpdateCartItemForm,
  ): Promise<CartItem | null> {
    if (form.quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }
    const findCartItem = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.id, id))
      .limit(1);
    if (findCartItem.length === 0) {
      return null;
    }
    if (findCartItem[0].pricePromotion == null) {
      const result = await db
        .update(cartItems)
        .set({
          quantity: form.quantity,
          totalPriceCartItem: form.quantity * findCartItem[0].price,
        })
        .where(eq(cartItems.id, id))
        .returning();
      return result[0] as CartItem;
    } else {
      const result = await db
        .update(cartItems)
        .set({
          quantity: form.quantity,
          totalPriceCartItem: form.quantity * findCartItem[0].pricePromotion,
        })
        .where(eq(cartItems.id, id))
        .returning();
      return result[0] as CartItem;
    }
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .delete(cartItems)
      .where(eq(cartItems.id, id))
      .returning();
    return result.length > 0;
  }
  async findAllCartItemByUserId(id: string): Promise<CartItem[] | null> {
    const result = await db
      .select({
        cartItem: cartItems,
      })
      .from(users)

      // user -> cart
      .innerJoin(cart, eq(users.id, cart.userId))

      // cart -> cartItem
      .innerJoin(cartItems, eq(cart.id, cartItems.cartId))

      .where(eq(users.id, id));

    const allCartItems = result.map((item) => item.cartItem);

    return allCartItems.length > 0 ? allCartItems : null;
  }
  async findCartItemById(id: string): Promise<CartItem | null> {
    const result = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.id, id))
      .limit(1);
    return (result[0] as CartItem) || null;
  }
  async tickCartItem(id: string): Promise<boolean> {
    const result = await db
      .update(cartItems)
      .set({ status: Status.TICK })
      .where(eq(cartItems.id, id))
      .returning();
    return result.length > 0;
  }
  async untickCartItem(id: string): Promise<boolean> {
    const result = await db
      .update(cartItems)
      .set({ status: Status.UNTICK })
      .where(eq(cartItems.id, id))
      .returning();
    return result.length > 0;
  }
}
