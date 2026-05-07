import {
  ICreatePromotionForm,
  IUpdatePromotionForm,
  Promotion,
} from "../model";

export interface IPromotionRepository {
  insert: (promotion: ICreatePromotionForm) => Promise<Promotion>;
  update: (id: string, form: IUpdatePromotionForm) => Promise<Promotion | null>;
  delete: (id: string) => Promise<boolean>;
  restore: (id: string) => Promise<boolean>;
  findById: (id: string) => Promise<Promotion | null>;
  findByIdAdmin: (id: string) => Promise<Promotion | null>;
  findByName: (namePromotion: string) => Promise<Promotion[] | null>;
  findByNameAdmin: (namePromotion: string) => Promise<Promotion[] | null>;
  findAllPromotionActive: () => Promise<Promotion[]>;
  findAllPromotionInactive: () => Promise<Promotion[]>;
  findAllPromotion: () => Promise<Promotion[]>;
}
export interface IPromotionService {
  create: (form: ICreatePromotionForm) => Promise<Promotion>;
  update: (id: string, form: IUpdatePromotionForm) => Promise<Promotion | null>;
  delete: (id: string) => Promise<boolean>;
  restore: (id: string) => Promise<boolean>;
  getById: (id: string) => Promise<Promotion | null>;
  getByIdAdmin: (id: string) => Promise<Promotion | null>;
  getByName: (namePromotion: string) => Promise<Promotion[] | null>;
  getByNameAdmin: (namePromotion: string) => Promise<Promotion[] | null>;
  getAllPromotionActive: () => Promise<Promotion[]>;
  getAllPromotionInactive: () => Promise<Promotion[]>;
  getAllPromotion: () => Promise<Promotion[]>;
}
