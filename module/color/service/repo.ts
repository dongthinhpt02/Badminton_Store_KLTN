import { and, eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { colors } from "../../../src/shared/common/neon/schema";
import { IColorRepository } from "../interface";
import { Color, ICreateColorForm, IUpdateColorForm, Status } from "../model";

export class ColorRepo implements IColorRepository {
  async insert(color: ICreateColorForm): Promise<Color> {
    const result = await db
      .insert(colors)
      .values({
        ...color,
        nameColor: color.nameColor.trim(),
        description: color.description?.trim() ?? null,
        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async update(id: string, form: IUpdateColorForm): Promise<Color | null> {
    const result = await db
      .update(colors)
      .set({
        ...form,
        nameColor: form.nameColor?.trim(),
        description: form.description?.trim(),
        updated_at: new Date(),
      })
      .where(eq(colors.id, id))
      .returning();
    return result[0] ?? null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(colors)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(colors.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(colors)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(colors.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<Color | null> {
    const result = await db
      .select()
      .from(colors)
      .where(and(eq(colors.id, id), eq(colors.status, Status.ACTIVE)))
      .limit(1);
    return result[0] ?? null;
  }
  async findByIdAdmin(id: string): Promise<Color | null> {
    const result = await db
      .select()
      .from(colors)
      .where(eq(colors.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findByName(name: string): Promise<Color[] | null> {
    const result = await db
      .select()
      .from(colors)
      .where(
        and(
          eq(colors.nameColor, name.trim()),
          eq(colors.status, Status.ACTIVE),
        ),
      );
    return result.length > 0 ? result : null;
  }
  async findByNameAdmin(name: string): Promise<Color[] | null> {
    const result = await db
      .select()
      .from(colors)
      .where(eq(colors.nameColor, name.trim()));
    return result.length > 0 ? result : null;
  }
  async findAllActive(): Promise<Color[]> {
    const result = await db
      .select()
      .from(colors)
      .where(eq(colors.status, Status.ACTIVE));
    return result;
  }
  async findAllInactive(): Promise<Color[]> {
    const result = await db
      .select()
      .from(colors)
      .where(eq(colors.status, Status.INACTIVE));
    return result;
  }
  async findAll(): Promise<Color[]> {
    const result = await db.select().from(colors);
    return result;
  }
}
