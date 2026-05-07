import { IColorRepository, IColorService } from "../interface";
import { Color, ICreateColorForm, IUpdateColorForm } from "../model";

export class ColorService implements IColorService {
  constructor(private colorRepo: IColorRepository) {}
  async create(form: ICreateColorForm): Promise<Color> {
    const newColor = await this.colorRepo.insert(form);
    return newColor;
  }
  async update(id: string, form: IUpdateColorForm): Promise<Color | null> {
    const updatedColor = await this.colorRepo.update(id, form);
    return updatedColor;
  }
  async delete(id: string): Promise<boolean> {
    const deleteColor = await this.colorRepo.delete(id);
    return deleteColor;
  }
  async restore(id: string): Promise<boolean> {
    const restoreColor = await this.colorRepo.restore(id);
    return restoreColor;
  }
  async getById(id: string): Promise<Color | null> {
    const color = await this.colorRepo.findById(id);
    return color;
  }
  async getByIdAdmin(id: string): Promise<Color | null> {
    const color = await this.colorRepo.findByIdAdmin(id);
    return color;
  }
  async getByName(name: string): Promise<Color[] | null> {
    const colors = await this.colorRepo.findByName(name);
    return colors;
  }
  async getByNameAdmin(name: string): Promise<Color[] | null> {
    const colors = await this.colorRepo.findByNameAdmin(name);
    return colors;
  }
  async getAllActive(): Promise<Color[]> {
    const colors = await this.colorRepo.findAllActive();
    return colors;
  }
  async getAllInactive(): Promise<Color[]> {
    const colors = await this.colorRepo.findAllInactive();
    return colors;
  }
  async getAll(): Promise<Color[]> {
    const colors = await this.colorRepo.findAll();
    return colors;
  }
}
