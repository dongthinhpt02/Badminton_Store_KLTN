import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { imports } from "../../../src/shared/common/neon/schema";
import { IImportRepository } from "../interface";
import { ICreateImportForm, Import } from "../model";

export class ImportRepo implements IImportRepository {
  async insert(form: ICreateImportForm): Promise<Import> {
    const result = await db
      .insert(imports)
      .values({
        supplierId: form.supplierId,
        importDate: new Date(),
        title: form.title.trim(),
        description: form.description?.trim() ?? null,
      })
      .returning();

    return result[0];
  }
  async findById(id: string): Promise<Import | null> {
    const result = await db
      .select()
      .from(imports)
      .where(eq(imports.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findAll(): Promise<Import[]> {
    const result = await db.select().from(imports);
    return result;
  }
  async findByTitle(title: string): Promise<Import[] | null> {
    const result = await db
      .select()
      .from(imports)
      .where(eq(imports.title, title.trim()));
    return result.length > 0 ? result : null;
  }
  async findByTimeRange(start: string, end: string): Promise<Import[] | null> {
    const startDate = new Date(`${start}T00:00:00.000Z`);
    const endDate = new Date(`${end}T23:59:59.999Z`);

    const result = await db
      .select()
      .from(imports)
      .where(
        and(
          gte(imports.importDate, startDate),
          lte(imports.importDate, endDate),
        ),
      );

    return result.length > 0 ? result : null;
  }
  async findBySupplierId(id: string): Promise<Import[] | null> {
    const result = await db
      .select()
      .from(imports)
      .where(eq(imports.supplierId, id));
    return result.length > 0 ? result : null;
  }
}
