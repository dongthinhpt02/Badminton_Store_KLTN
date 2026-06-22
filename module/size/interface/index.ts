import { ICreateSizeForm, IUpdateSizeForm, Size } from "../model";

export interface ISizeRepository {
  insert: (sizeType: ICreateSizeForm) => Promise<Size>;
  update: (id: string, form: IUpdateSizeForm) => Promise<Size | null>;
  delete: (id: string) => Promise<boolean>;
  restore: (id: string) => Promise<boolean>;
  findById: (id: string) => Promise<Size | null>;
  findByIdAdmin: (id: string) => Promise<Size | null>;
  findByName: (name: string) => Promise<Size[] | null>;
  findByNameAdmin: (name: string) => Promise<Size[] | null>;
  findAllActive: () => Promise<Size[]>;
  findAllInactive: () => Promise<Size[]>;
  findAll: () => Promise<Size[]>;
  findSizeBySizeTypeId: (sizeTypeId: string) => Promise<Size[]>;
  findSizeBySizeTypeIdAdmin: (sizeTypeId: string) => Promise<Size[]>;
  findSizeBySizeTypeName: (sizeTypeName: string) => Promise<Size[]>;
  findSizeBySizeTypeNameAdmin: (sizeTypeName: string) => Promise<Size[]>;
  findSizeAddNameSizeType: () => Promise<any[]>;
}
export interface ISizeService {
  create: (form: ICreateSizeForm) => Promise<Size>;
  update: (id: string, form: IUpdateSizeForm) => Promise<Size | null>;
  delete: (id: string) => Promise<boolean>;
  restore: (id: string) => Promise<boolean>;
  getById: (id: string) => Promise<Size | null>;
  getByIdAdmin: (id: string) => Promise<Size | null>;
  getByName: (name: string) => Promise<Size[] | null>;
  getByNameAdmin: (name: string) => Promise<Size[] | null>;
  getAllActive: () => Promise<Size[]>;
  getAllInactive: () => Promise<Size[]>;
  getAll: () => Promise<Size[]>;
  getSizeBySizeTypeId: (sizeTypeId: string) => Promise<Size[]>;
  getSizeBySizeTypeIdAdmin: (sizeTypeId: string) => Promise<Size[]>;
  getSizeBySizeTypeName: (sizeTypeName: string) => Promise<Size[]>;
  getSizeBySizeTypeNameAdmin: (sizeTypeName: string) => Promise<Size[]>;
  getSizeAndNameSizeType: () => Promise<any[]>;
}
