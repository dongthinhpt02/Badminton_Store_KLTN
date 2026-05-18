import { IImportRepository, IImportService } from "../interface";
import { ICreateImportForm, Import } from "../model";

export class ImportService implements IImportService {
  constructor(private readonly importRepo: IImportRepository) {}
  async create(form: ICreateImportForm): Promise<Import> {
    const newImport = await this.importRepo.insert(form);
    return newImport;
  }
  async getById(id: string): Promise<Import | null> {
    return await this.importRepo.findById(id);
  }
  async getAll(): Promise<Import[]> {
    return await this.importRepo.findAll();
  }
  async getByTitle(title: string): Promise<Import[] | null> {
    return await this.importRepo.findByTitle(title);
  }
  async getByTimeRange(start: string, end: string): Promise<Import[] | null> {
    return await this.importRepo.findByTimeRange(start, end);
  }
  async getBySupplierId(id: string): Promise<Import[] | null> {
    return await this.importRepo.findBySupplierId(id);
  }
}
