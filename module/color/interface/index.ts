import { Color, ICreateColorForm, IUpdateColorForm } from "../model";

export interface IColorRepository {
  insert: (sizeType: ICreateColorForm) => Promise<Color>;
  update: (id: string, form: IUpdateColorForm) => Promise<Color | null>;
  delete: (id: string) => Promise<boolean>;
  restore: (id: string) => Promise<boolean>;
  findById: (id: string) => Promise<Color | null>;
  findByIdAdmin: (id: string) => Promise<Color | null>;
  findByName: (name: string) => Promise<Color[] | null>;
  findByNameAdmin: (name: string) => Promise<Color[] | null>;
  findAllActive: () => Promise<Color[]>;
  findAllInactive: () => Promise<Color[]>;
  findAll: () => Promise<Color[]>;
}
export interface IColorService {
  create: (form: ICreateColorForm) => Promise<Color>;
  update: (id: string, form: IUpdateColorForm) => Promise<Color | null>;
  delete: (id: string) => Promise<boolean>;
  restore: (id: string) => Promise<boolean>;
  getById: (id: string) => Promise<Color | null>;
  getByIdAdmin: (id: string) => Promise<Color | null>;
  getByName: (name: string) => Promise<Color[] | null>;
  getByNameAdmin: (name: string) => Promise<Color[] | null>;
  getAllActive: () => Promise<Color[]>;
  getAllInactive: () => Promise<Color[]>;
  getAll: () => Promise<Color[]>;
}
