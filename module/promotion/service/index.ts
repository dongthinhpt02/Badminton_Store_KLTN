import { IPromotionRepository, IPromotionService } from "../interface";
import {
  ICreatePromotionForm,
  IUpdatePromotionForm,
  Promotion,
} from "../model";

export class PromotionService implements IPromotionService {
  constructor(private promotionRepo: IPromotionRepository) {}
  async create(form: ICreatePromotionForm): Promise<Promotion> {
    const newPromotion = await this.promotionRepo.insert(form);
    return newPromotion;
  }
  async update(
    id: string,
    form: IUpdatePromotionForm,
  ): Promise<Promotion | null> {
    const updatedPromotion = await this.promotionRepo.update(id, form);

    return updatedPromotion;
  }
  async delete(id: string): Promise<boolean> {
    const deletePromotion = await this.promotionRepo.delete(id);
    return deletePromotion;
  }
  async restore(id: string): Promise<boolean> {
    const restorePromotion = await this.promotionRepo.restore(id);
    return restorePromotion;
  }
  async getById(id: string): Promise<Promotion | null> {
    const promotion = await this.promotionRepo.findById(id);
    if (!promotion) {
      return null;
    }
    return { ...promotion, valuePromotion: promotion.valuePromotion * 100 }; //promotion;
  }
  async getByIdAdmin(id: string): Promise<Promotion | null> {
    const promotion = await this.promotionRepo.findByIdAdmin(id);

    return promotion;
  }
  async getByName(namePromotion: string): Promise<Promotion[] | null> {
    const promotions = await this.promotionRepo.findByName(namePromotion);
    return promotions;
  }
  async getByNameAdmin(namePromotion: string): Promise<Promotion[] | null> {
    const promotions = await this.promotionRepo.findByNameAdmin(namePromotion);
    return promotions;
  }
  async getAllPromotionActive(): Promise<Promotion[]> {
    const promotions = await this.promotionRepo.findAllPromotionActive();
    return promotions;
  }
  async getAllPromotionInactive(): Promise<Promotion[]> {
    const promotions = await this.promotionRepo.findAllPromotionInactive();
    return promotions;
  }
  async getAllPromotion(): Promise<Promotion[]> {
    const promotions = await this.promotionRepo.findAllPromotion();
    return promotions;
  }
}
