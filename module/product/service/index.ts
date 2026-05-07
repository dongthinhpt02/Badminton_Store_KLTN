import { IProductRepository, IProductService } from "../interface";
import { ICreateProductForm, IUpdateProductForm, Product } from "../model";

export class ProductService implements IProductService {
  constructor(private productRepo: IProductRepository) {}
  async create(form: ICreateProductForm): Promise<Product> {
    const newProduct = await this.productRepo.insert(form);
    return newProduct;
  }
  async update(id: string, form: IUpdateProductForm): Promise<Product | null> {
    const updatedProduct = await this.productRepo.update(id, form);
    return updatedProduct;
  }
  async delete(id: string): Promise<boolean> {
    const deleteProduct = await this.productRepo.delete(id);
    return deleteProduct;
  }
  async restore(id: string): Promise<boolean> {
    const restoreProduct = await this.productRepo.restore(id);
    return restoreProduct;
  }
  async getById(id: string): Promise<Product | null> {
    const product = await this.productRepo.findById(id);
    return product;
  }
  async getByIdAdmin(id: string): Promise<Product | null> {
    const product = await this.productRepo.findByIdAdmin(id);
    return product;
  }
  async getByName(nameProduct: string): Promise<Product[] | null> {
    const products = await this.productRepo.findByName(nameProduct);
    return products;
  }
  async getByNameAdmin(nameProduct: string): Promise<Product[] | null> {
    const products = await this.productRepo.findByNameAdmin(nameProduct);
    return products;
  }
  async getAllProductActive(): Promise<Product[]> {
    const products = await this.productRepo.findAllProductActive();
    return products;
  }
  async getAllProductInactive(): Promise<Product[]> {
    const products = await this.productRepo.findAllProductInactive();
    return products;
  }
  async getAllProduct(): Promise<Product[]> {
    const products = await this.productRepo.findAllProduct();
    return products;
  }
}
