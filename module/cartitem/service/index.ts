import { ICartItemRepository, ICartItemService } from "../interface";
import { ICreateCartItemForm, IUpdateCartItemForm } from "../model";

export class CartItemService implements ICartItemService {
  constructor(private cartItemRepo: ICartItemRepository) {}
  async create(form: ICreateCartItemForm) {
    return await this.cartItemRepo.insert(form);
  }
  async update(id: string, form: IUpdateCartItemForm) {
    return await this.cartItemRepo.update(id, form);
  }
  async delete(id: string) {
    return await this.cartItemRepo.delete(id);
  }
  async getAllCartItemByUserId(userId: string) {
    return await this.cartItemRepo.findAllCartItemByUserId(userId);
  }
  async getCartItemById(id: string) {
    return await this.cartItemRepo.findCartItemById(id);
  }
  async tickCartItem(id: string) {
    return await this.cartItemRepo.tickCartItem(id);
  }
  async untickCartItem(id: string) {
    return await this.cartItemRepo.untickCartItem(id);
  }
}
