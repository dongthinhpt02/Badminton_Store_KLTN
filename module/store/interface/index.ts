import { ICreateStoreForm, IUpdateStoreForm, Store } from "../model";

export interface IStoreRepository {
  insert: (form: ICreateStoreForm) => Promise<Store>;
  update: (id: string, form: IUpdateStoreForm) => Promise<Store | null>;
  active: (id: string) => Promise<boolean>;
  findByIdAdmin: (id: string) => Promise<Store | null>;
  findInactiveByAdmin: () => Promise<Store[] | null>;
  findActiveByAdmin: () => Promise<Store | null>;
  findAll: () => Promise<Store[]>;
}

export interface IStoreService {
  create: (form: ICreateStoreForm) => Promise<Store>;
  update: (id: string, form: IUpdateStoreForm) => Promise<Store | null>;
  active: (id: string) => Promise<boolean>;
  getByIdAdmin: (id: string) => Promise<Store | null>;
  getInactiveByAdmin: () => Promise<Store[] | null>;
  getActiveByAdmin: () => Promise<Store | null>;
  getAll: () => Promise<Store[]>;
}
