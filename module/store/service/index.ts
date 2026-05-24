import { IStoreRepository, IStoreService } from "../interface";
import { ICreateStoreForm, IUpdateStoreForm, Store } from "../model";

export class StoreService implements IStoreService {
  constructor(private storeRepo: IStoreRepository) {}
  async create(form: ICreateStoreForm): Promise<Store> {
    return await this.storeRepo.insert(form);
  }
  async update(id: string, form: IUpdateStoreForm): Promise<Store | null> {
    return await this.storeRepo.update(id, form);
  }
  async active(id: string): Promise<boolean> {
    return await this.storeRepo.active(id);
  }
  async getByIdAdmin(id: string): Promise<Store | null> {
    return await this.storeRepo.findByIdAdmin(id);
  }
  async getInactiveByAdmin(): Promise<Store[] | null> {
    return await this.storeRepo.findInactiveByAdmin();
  }
  async getActiveByAdmin(): Promise<Store | null> {
    return await this.storeRepo.findActiveByAdmin();
  }
  async getAll(): Promise<Store[]> {
    return await this.storeRepo.findAll();
  }
}
