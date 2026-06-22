import { ISizeRepository, ISizeService } from "../interface";
import { ICreateSizeForm, IUpdateSizeForm, Size } from "../model";

export class SizeService implements ISizeService {
  constructor(private sizeRepo: ISizeRepository) {}
  async create(form: ICreateSizeForm): Promise<Size> {
    const newSize = await this.sizeRepo.insert(form);
    return newSize;
  }
  async update(id: string, form: IUpdateSizeForm): Promise<Size | null> {
    const updatedSize = await this.sizeRepo.update(id, form);
    return updatedSize;
  }
  async delete(id: string): Promise<boolean> {
    return await this.sizeRepo.delete(id);
  }
  async restore(id: string): Promise<boolean> {
    return await this.sizeRepo.restore(id);
  }
  async getById(id: string): Promise<Size | null> {
    return await this.sizeRepo.findById(id);
  }
  async getByIdAdmin(id: string): Promise<Size | null> {
    return await this.sizeRepo.findById(id);
  }
  async getByName(name: string): Promise<Size[] | null> {
    return await this.sizeRepo.findByName(name);
  }
  async getByNameAdmin(name: string): Promise<Size[] | null> {
    return await this.sizeRepo.findByNameAdmin(name);
  }
  async getAllActive(): Promise<Size[]> {
    return await this.sizeRepo.findAllActive();
  }
  async getAllInactive(): Promise<Size[]> {
    return await this.sizeRepo.findAllInactive();
  }
  async getAll(): Promise<Size[]> {
    return await this.sizeRepo.findAll();
  }
  async getSizeBySizeTypeId(sizeTypeId: string): Promise<Size[]> {
    return await this.sizeRepo.findSizeBySizeTypeId(sizeTypeId);
  }
  async getSizeBySizeTypeIdAdmin(sizeTypeId: string): Promise<Size[]> {
    return await this.sizeRepo.findSizeBySizeTypeIdAdmin(sizeTypeId);
  }
  async getSizeBySizeTypeName(sizeTypeName: string): Promise<Size[]> {
    return await this.sizeRepo.findSizeBySizeTypeName(sizeTypeName);
  }
  async getSizeBySizeTypeNameAdmin(sizeTypeName: string): Promise<Size[]> {
    return await this.sizeRepo.findSizeBySizeTypeNameAdmin(sizeTypeName);
  }
  async getSizeAndNameSizeType(): Promise<any[]> {
    return await this.sizeRepo.findSizeAddNameSizeType();
  }
}
