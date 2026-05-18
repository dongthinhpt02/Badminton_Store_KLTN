import { ISupplierRepository, ISupplierService } from "../interface";
import { ICreateSupplierForm, IUpdateSupplierForm, Supplier } from "../model";

export class SupplierService implements ISupplierService {
  constructor(private supplierRepo: ISupplierRepository) {}

  async create(form: ICreateSupplierForm): Promise<Supplier> {
    const newSupplier = await this.supplierRepo.insert(form);
    return newSupplier;
  }

  async update(
    id: string,
    form: IUpdateSupplierForm,
  ): Promise<Supplier | null> {
    const updatedSupplier = await this.supplierRepo.update(id, form);
    return updatedSupplier;
  }
  async delete(id: string): Promise<boolean> {
    const deleteSupplier = await this.supplierRepo.delete(id);
    return deleteSupplier;
  }

  async restore(id: string): Promise<boolean> {
    const restoreSupplier = await this.supplierRepo.restore(id);
    return restoreSupplier;
  }
  async getById(id: string): Promise<Supplier | null> {
    const supplier = await this.supplierRepo.findById(id);
    return supplier;
  }
  async getByIdAdmin(id: string): Promise<Supplier | null> {
    const supplier = await this.supplierRepo.findByIdAdmin(id);
    return supplier;
  }
  async getByName(name: string): Promise<Supplier[] | null> {
    const supplier = await this.supplierRepo.findByName(name);
    return supplier;
  }
  async getByNameAdmin(name: string): Promise<Supplier[] | null> {
    const supplier = await this.supplierRepo.findByNameAdmin(name);
    return supplier;
  }
  async getAllActive(): Promise<Supplier[]> {
    const supplier = await this.supplierRepo.findAllActive();
    return supplier;
  }
  async getAllInactive(): Promise<Supplier[]> {
    const supplier = await this.supplierRepo.findAllInactive();
    return supplier;
  }
  async getAll(): Promise<Supplier[]> {
    const supplier = await this.supplierRepo.findAll();
    return supplier;
  }
}
