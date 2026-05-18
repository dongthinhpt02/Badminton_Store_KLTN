import { IProductItemRepository, IProductItemService } from "../interface";
import {
  ICreateProductItemForm,
  IUpdateProductItemForm,
  ProductItem,
} from "../model";

export class ProductItemService implements IProductItemService {
  constructor(private productItemRepo: IProductItemRepository) {}
  async create(form: ICreateProductItemForm): Promise<ProductItem> {
    const newProductItem = await this.productItemRepo.insert(form);
    return newProductItem;
  }
  async update(
    id: string,
    form: IUpdateProductItemForm,
  ): Promise<ProductItem | null> {
    const updatedProductItem = await this.productItemRepo.update(id, form);
    return updatedProductItem;
  }
  async updateQuantity(
    id: string,
    quantity: number,
  ): Promise<ProductItem | null> {
    const updatedProductItem = await this.productItemRepo.updateQuantity(
      id,
      quantity,
    );
    return updatedProductItem;
  }
  async delete(id: string): Promise<boolean> {
    const deleteProductItem = await this.productItemRepo.delete(id);
    return deleteProductItem;
  }
  async restore(id: string): Promise<boolean> {
    const restoreProductItem = await this.productItemRepo.restore(id);
    return restoreProductItem;
  }
  async getById(id: string): Promise<ProductItem | null> {
    const productItem = await this.productItemRepo.findById(id);
    return productItem;
  }
  async getByIdAdmin(id: string): Promise<ProductItem | null> {
    const productItem = await this.productItemRepo.findByIdAdmin(id);
    return productItem;
  }
  async getByName(nameProductItem: string): Promise<ProductItem[] | null> {
    const productItem = await this.productItemRepo.findByName(nameProductItem);
    return productItem;
  }
  async getByNameAdmin(nameProductItem: string): Promise<ProductItem[] | null> {
    const productItem =
      await this.productItemRepo.findByNameAdmin(nameProductItem);
    return productItem;
  }
  async getAllProductItemActive(): Promise<ProductItem[]> {
    const productItem = await this.productItemRepo.findAllProductItemActive();
    return productItem;
  }
  async getAllProductItemInactive(): Promise<ProductItem[]> {
    const productItem = await this.productItemRepo.findAllProductItemInactive();
    return productItem;
  }
  async getAllProductItem(): Promise<ProductItem[]> {
    const productItem = await this.productItemRepo.findAllProductItem();
    return productItem;
  }
  async getAllProductItemByBrandId(
    brandId: string,
  ): Promise<ProductItem[] | null> {
    const productItem =
      await this.productItemRepo.findAllProductItemByBrandId(brandId);
    return productItem;
  }
  async getAllProductItemByCateId(
    cateId: string,
  ): Promise<ProductItem[] | null> {
    const productItem =
      await this.productItemRepo.findAllProductItemByCateId(cateId);
    return productItem;
  }
  async getAllProductItemByProductId(
    productId: string,
  ): Promise<ProductItem[] | null> {
    const productItem =
      await this.productItemRepo.findAllProductItemByProductId(productId);
    return productItem;
  }
  async getAllProductItemBySizeId(
    sizeId: string,
  ): Promise<ProductItem[] | null> {
    const productItem =
      await this.productItemRepo.findAllProductItemBySizeId(sizeId);
    return productItem;
  }
  async getAllProductItemByColorId(
    colorId: string,
  ): Promise<ProductItem[] | null> {
    const productItem =
      await this.productItemRepo.findAllProductItemByColorId(colorId);
    return productItem;
  }
  async addPromotionToProductItem(
    id: string,
    promotionId: string,
  ): Promise<ProductItem | null> {
    const productItem = await this.productItemRepo.addPromotionToProductItem(
      id,
      promotionId,
    );
    return productItem;
  }
  async deletePromotionFromProductItem(
    id: string,
  ): Promise<ProductItem | null> {
    const productItem =
      await this.productItemRepo.deletePromotionFromProductItem(id);
    return productItem;
  }
}
