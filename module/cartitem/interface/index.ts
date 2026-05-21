import {
  CartItem,
  ICreateCartItemForm,
  IUpdateCartItemForm,
  IUpdateCartItem,
} from "../model";

export interface ICartItemRepository {
  insert: (form: ICreateCartItemForm) => Promise<CartItem>;
  update: (id: string, form: IUpdateCartItemForm) => Promise<CartItem | null>;
  delete: (id: string) => Promise<boolean>;
  findAllCartItemByUserId: (id: string) => Promise<CartItem[] | null>;
  findCartItemById: (id: string) => Promise<CartItem | null>;
  tickCartItem: (id: string) => Promise<boolean>;
  untickCartItem: (id: string) => Promise<boolean>;
}
export interface ICartItemService {
  create: (form: ICreateCartItemForm) => Promise<CartItem>;
  update: (id: string, form: IUpdateCartItemForm) => Promise<CartItem | null>;
  delete: (id: string) => Promise<boolean>;
  getAllCartItemByUserId: (id: string) => Promise<CartItem[] | null>;
  getCartItemById: (id: string) => Promise<CartItem | null>;
  tickCartItem: (id: string) => Promise<boolean>;
  untickCartItem: (id: string) => Promise<boolean>;
}
