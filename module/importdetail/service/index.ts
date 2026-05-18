import { IImportDetailRepository, IImportDetailService } from "../inteface";
import { ICreateImportDetailForm, ImportDetail } from "../model";

export class ImportDetailService implements IImportDetailService {
  constructor(private readonly importDetailRepo: IImportDetailRepository) {}

  async create(form: ICreateImportDetailForm): Promise<ImportDetail> {
    return this.importDetailRepo.insert(form);
  }

  async getById(id: string): Promise<ImportDetail | null> {
    return this.importDetailRepo.findById(id);
  }

  async getAll(): Promise<ImportDetail[]> {
    return this.importDetailRepo.findAll();
  }

  async getByImportId(importId: string): Promise<ImportDetail[] | null> {
    return this.importDetailRepo.findByImportId(importId);
  }

  async getByProductItemId(
    productItemId: string,
  ): Promise<ImportDetail[] | null> {
    return this.importDetailRepo.findByProductItemId(productItemId);
  }
}
