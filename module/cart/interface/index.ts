import { CartItem } from "../../cartitem/model";
import { Cart, CartWithItems, IUpdateCartForm } from "../model";

export interface ICartRepository {
  findById: (id: string) => Promise<CartWithItems | null>;
  findByUserId: (userId: string) => Promise<CartWithItems | null>;
  //   update(id: string, form: IUpdateCartForm): Promise<Cart>;
  updateCartTotals(userId: string): Promise<Cart | null>;
  calculateAllItems(id: string): Promise<any>;
}

export interface ICartService {
  getCartById: (id: string) => Promise<CartWithItems | null>;
  getCartByUserId: (userId: string) => Promise<CartWithItems | null>;
  //   updateCart: (id: string, form: IUpdateCartForm) => Promise<Cart>;
  updateCartTotals: (cartId: string) => Promise<Cart | null>;
  calculateTotalFee(userId: string): Promise<any>;
}
