import { ICateRepository, ICateService } from "../interface";
import { Cate, ICreateCateForm, IUpdateCateForm } from "../model";

export class CategoryService implements ICateService {
  constructor(private readonly categoryRepo: ICateRepository) {}
  async create(form: ICreateCateForm): Promise<Cate> {
    const newCate = await this.categoryRepo.insert(form);
    return newCate;
  }
  async update(id: string, form: IUpdateCateForm): Promise<Cate | null> {
    const updateCate = await this.categoryRepo.update(id, form);
    return updateCate;
  }
  async delete(id: string): Promise<boolean> {
    const deleteCate = await this.categoryRepo.delete(id);
    return deleteCate;
  }
  async restore(id: string): Promise<boolean> {
    const restoreCate = await this.categoryRepo.restore(id);
    return restoreCate;
  }
  async getById(id: string): Promise<Cate | null> {
    const cate = await this.categoryRepo.findById(id);
    return cate;
  }
  async getByIdAdmin(id: string): Promise<Cate | null> {
    const cate = await this.categoryRepo.findByIdAdmin(id);
    return cate;
  }
  async getByName(cateName: string): Promise<Cate[] | null> {
    const cates = await this.categoryRepo.findByName(cateName);
    return cates;
  }
  async getByNameAdmin(cateName: string): Promise<Cate[] | null> {
    const cates = await this.categoryRepo.findByNameAdmin(cateName);
    return cates;
  }
  async getAllCateActive(): Promise<Cate[]> {
    const cates = await this.categoryRepo.findAllCateActive();
    return cates;
  }
  async getAllCateInactive(): Promise<Cate[]> {
    const cates = await this.categoryRepo.findAllCateInactive();
    return cates;
  }
  async getAllCate(): Promise<Cate[]> {
    const cates = await this.categoryRepo.findAllCate();
    return cates;
  }
}
