import { IBrandRepository, IBrandService } from "../interface";
import { Brand, ICreateBrandForm, IUpdateBrandForm } from "../model";

export class BrandService implements IBrandService {
  constructor(private readonly brandRepo: IBrandRepository) {}
  async create(form: ICreateBrandForm): Promise<Brand> {
    const newBrand = await this.brandRepo.insert(form);
    return newBrand;
  }
  async update(id: string, form: IUpdateBrandForm): Promise<Brand | null> {
    const updateBrand = await this.brandRepo.update(id, form);
    return updateBrand;
  }
  async delete(id: string): Promise<boolean> {
    const deleteBrand = await this.brandRepo.delete(id);
    return deleteBrand;
  }
  async restore(id: string): Promise<boolean> {
    const restoreBrand = await this.brandRepo.restore(id);
    return restoreBrand;
  }
  async getById(id: string): Promise<Brand | null> {
    const cate = await this.brandRepo.findById(id);
    return cate;
  }
  async getByIdAdmin(id: string): Promise<Brand | null> {
    const cate = await this.brandRepo.findByIdAdmin(id);
    return cate;
  }
  async getByName(cateName: string): Promise<Brand[] | null> {
    const cates = await this.brandRepo.findByName(cateName);
    return cates;
  }
  async getByNameAdmin(cateName: string): Promise<Brand[] | null> {
    const cates = await this.brandRepo.findByNameAdmin(cateName);
    return cates;
  }
  async getAllBrandActive(): Promise<Brand[]> {
    const cates = await this.brandRepo.findAllBrandActive();
    return cates;
  }
  async getAllBrandInactive(): Promise<Brand[]> {
    const cates = await this.brandRepo.findAllBrandInactive();
    return cates;
  }
  async getAllBrand(): Promise<Brand[]> {
    const cates = await this.brandRepo.findAllBrand();
    return cates;
  }
}
