import { and, eq, ilike } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import {
  brands,
  categories,
  productItems,
  products,
  promotions,
} from "../../../src/shared/common/neon/schema";
import { IProductItemRepository } from "../interface";
import {
  ICreateProductItemForm,
  IUpdateProductItemForm,
  ProductItem,
  Status,
} from "../model";
import { normalizeText } from "../../../src/shared/utils/normalize";

export class ProductItemRepo implements IProductItemRepository {
  async insert(form: ICreateProductItemForm): Promise<ProductItem> {
    const normalized = normalizeText(form.nameProductItem);
    const result = await db
      .insert(productItems)
      .values({
        ...form,
        nameProductItem: form.nameProductItem.trim(),
        normalizedNameProductItem: normalized,
        imageProductItem: form.imageProductItem ?? null,
        description: form.description?.trim() ?? null,
        quantity: 0,
        price: form.price,
        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async update(
    id: string,
    form: IUpdateProductItemForm,
  ): Promise<ProductItem | null> {
    const normalized = form.nameProductItem
      ? normalizeText(form.nameProductItem)
      : undefined;
    const result = await db
      .update(productItems)
      .set({
        ...form,
        nameProductItem: form.nameProductItem?.trim(),
        normalizedNameProductItem: normalized,
        imageProductItem: form.imageProductItem ?? null,
        description: form.description?.trim() ?? null,
        price: form.price,
        updated_at: new Date(),
      })
      .where(eq(productItems.id, id))
      .returning();
    return result[0] ?? null;
  }
  async updateQuantity(
    id: string,
    quantity: number,
  ): Promise<ProductItem | null> {
    const result = await db
      .update(productItems)
      .set({
        quantity,
      })
      .where(eq(productItems.id, id))
      .returning();

    if (result.length === 0) {
      throw new Error("Update quantity failed");
    }

    return result[0];
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(productItems)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(productItems.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(productItems)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(productItems.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<ProductItem | null> {
    const result = await db
      .select()
      .from(productItems)
      .where(
        and(eq(productItems.id, id), eq(productItems.status, Status.ACTIVE)),
      )

      .limit(1);
    return result[0] ?? null;
  }
  async findByIdAdmin(id: string): Promise<ProductItem | null> {
    const result = await db
      .select()
      .from(productItems)
      .where(eq(productItems.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findByName(nameProductItem: string): Promise<ProductItem[] | null> {
    const normalized = normalizeText(nameProductItem);

    const result = await db
      .select()
      .from(productItems)
      .where(
        and(
          ilike(productItems.normalizedNameProductItem, `%${normalized}%`),
          eq(productItems.status, "active"),
        ),
      );

    return result.length > 0 ? result : null;
  }
  async findByNameAdmin(
    nameProductItem: string,
  ): Promise<ProductItem[] | null> {
    const normalized = normalizeText(nameProductItem);

    const result = await db
      .select()
      .from(productItems)
      .where(ilike(productItems.normalizedNameProductItem, `%${normalized}%`));

    return result.length > 0 ? result : null;
  }
  async findAllProductItemActive(): Promise<ProductItem[]> {
    const result = await db
      .select()
      .from(productItems)
      .where(eq(productItems.status, Status.ACTIVE));
    return result;
  }
  async findAllProductItemInactive(): Promise<ProductItem[]> {
    const result = await db
      .select()
      .from(productItems)
      .where(eq(productItems.status, Status.INACTIVE));
    return result;
  }
  async findAllProductItem(): Promise<ProductItem[]> {
    const result = await db.select().from(productItems);
    return result;
  }
  async findAllProductItemByBrandId(
    brandId: string,
  ): Promise<ProductItem[] | null> {
    // check brand tồn tại + active
    const brand = await db
      .select()
      .from(brands)
      .where(and(eq(brands.id, brandId), eq(brands.status, "active")))
      .limit(1);

    if (brand.length === 0) {
      return null;
    }

    // join brand -> product -> productItem
    const result = await db
      .select({
        productItem: productItems,
      })
      .from(productItems)

      .innerJoin(products, eq(productItems.productId, products.id))

      .innerJoin(brands, eq(products.brandId, brands.id))

      .where(and(eq(brands.id, brandId), eq(productItems.status, "active")));

    const allItems = result.map((item) => item.productItem);

    return allItems.length > 0 ? allItems : null;
  }
  async findAllProductItemByCateId(
    cateId: string,
  ): Promise<ProductItem[] | null> {
    // check category tồn tại + active
    const cate = await db
      .select()
      .from(categories)
      .where(and(eq(categories.id, cateId), eq(categories.status, "active")))
      .limit(1);

    if (cate.length === 0) {
      return null;
    }

    // join category -> product -> productItem
    const result = await db
      .select({
        productItem: productItems,
      })
      .from(productItems)

      .innerJoin(products, eq(productItems.productId, products.id))

      .innerJoin(categories, eq(products.cateId, categories.id))

      .where(and(eq(categories.id, cateId), eq(productItems.status, "active")));

    const allItems = result.map((item) => item.productItem);

    return allItems.length > 0 ? allItems : null;
  }
  async findAllProductItemByProductId(
    productId: string,
  ): Promise<ProductItem[] | null> {
    const result = await db
      .select()
      .from(productItems)
      .where(
        and(
          eq(productItems.productId, productId),
          eq(productItems.status, "active"),
        ),
      );
    return result.length > 0 ? result : null;
  }
  async findAllProductItemBySizeId(
    sizeId: string,
  ): Promise<ProductItem[] | null> {
    const result = await db
      .select()
      .from(productItems)
      .where(
        and(eq(productItems.sizeId, sizeId), eq(productItems.status, "active")),
      );
    return result.length > 0 ? result : null;
  }
  async findAllProductItemByColorId(
    colorId: string,
  ): Promise<ProductItem[] | null> {
    const result = await db
      .select()
      .from(productItems)
      .where(
        and(
          eq(productItems.colorId, colorId),
          eq(productItems.status, "active"),
        ),
      );
    return result.length > 0 ? result : null;
  }
  async addPromotionToProductItem(
    id: string,
    promotionId: string,
  ): Promise<ProductItem | null> {
    // tìm product item
    const productItem = await db
      .select()
      .from(productItems)
      .where(and(eq(productItems.id, id), eq(productItems.status, "active")))
      .limit(1);

    if (productItem.length === 0) {
      return null;
    }

    // tìm promotion
    const promotion = await db
      .select()
      .from(promotions)
      .where(
        and(eq(promotions.id, promotionId), eq(promotions.status, "active")),
      )
      .limit(1);

    if (promotion.length === 0) {
      return null;
    }

    const item = productItem[0];
    const promo = promotion[0];

    // numeric postgres trả string 😵‍💫
    const price = Number(item.price);

    // ví dụ 0.1 = giảm 10%
    const valuePromotion = Number(promo.valuePromotion);

    // pricePromotion = price - value*price
    const finalPrice = price - valuePromotion * price;

    // update
    const result = await db
      .update(productItems)
      .set({
        promotionId: promo.id,
        pricePromotion: finalPrice,
        updated_at: new Date(),
      })
      .where(eq(productItems.id, id))
      .returning();

    return result[0] ?? null;
  }
  async deletePromotionFromProductItem(
    id: string,
  ): Promise<ProductItem | null> {
    // kiểm tra product item tồn tại
    const productItem = await db
      .select()
      .from(productItems)
      .where(and(eq(productItems.id, id), eq(productItems.status, "active")))
      .limit(1);

    if (productItem.length === 0) {
      return null;
    }

    // remove promotion
    const result = await db
      .update(productItems)
      .set({
        promotionId: null,
        pricePromotion: null,
        updated_at: new Date(),
      })
      .where(eq(productItems.id, id))
      .returning();

    return result[0] ?? null;
  }
}
