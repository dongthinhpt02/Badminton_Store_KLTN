import { ISizeTypeRepository, ISizeTypeService } from "../interface";
import { ICreateSizeTypeForm, IUpdateSizeTypeForm, SizeType } from "../model";

export class SizeTypeService implements ISizeTypeService {
  constructor(private sizetypeRepo: ISizeTypeRepository) {}
  async create(form: ICreateSizeTypeForm): Promise<SizeType> {
    const newSizeType = await this.sizetypeRepo.insert(form);
    return newSizeType;
  }
  async update(
    id: string,
    form: IUpdateSizeTypeForm,
  ): Promise<SizeType | null> {
    const newSizeType = await this.sizetypeRepo.update(id, form);
    return newSizeType;
  }
  async delete(id: string): Promise<boolean> {
    const deleteSizeType = await this.sizetypeRepo.delete(id);
    return deleteSizeType;
  }
  async restore(id: string): Promise<boolean> {
    const restoreSizeType = await this.sizetypeRepo.restore(id);
    return restoreSizeType;
  }
  async getById(id: string): Promise<SizeType | null> {
    const sizeType = await this.sizetypeRepo.findById(id);
    return sizeType;
  }
  async getByIdAdmin(id: string): Promise<SizeType | null> {
    const sizeType = await this.sizetypeRepo.findByIdAdmin(id);
    return sizeType;
  }
  async getByName(name: string): Promise<SizeType[] | null> {
    const sizeTypes = await this.sizetypeRepo.findByName(name);
    return sizeTypes;
  }
  async getByNameAdmin(name: string): Promise<SizeType[] | null> {
    const sizeTypes = await this.sizetypeRepo.findByNameAdmin(name);
    return sizeTypes;
  }
  async getAllActive(): Promise<SizeType[]> {
    const sizeTypes = await this.sizetypeRepo.findAllActive();
    return sizeTypes;
  }
  async getAllInactive(): Promise<SizeType[]> {
    const sizeTypes = await this.sizetypeRepo.findAllInactive();
    return sizeTypes;
  }
  async getAll(): Promise<SizeType[]> {
    const sizeTypes = await this.sizetypeRepo.findAll();
    return sizeTypes;
  }
}
