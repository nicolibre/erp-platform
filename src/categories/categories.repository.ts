import { Injectable } from "@nestjs/common";
import { count, eq } from "drizzle-orm";

import { BaseRepository } from "../core/base";
import type { IRepository } from "../core/interfaces";

import { DatabaseService } from "../database/database.service";
import { categories } from "../database/schema";

import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesRepository
  extends BaseRepository<typeof categories>
  implements IRepository<
    typeof categories.$inferSelect,
    CreateCategoryDto,
    UpdateCategoryDto
  >
{
  constructor(database: DatabaseService) {
    super(database, categories);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const result = await this.client
      .insert(this.table)
      .values({
        companyId: createCategoryDto.companyId,
        code: createCategoryDto.code,
        name: createCategoryDto.name,
        description: createCategoryDto.description,
      })
      .returning();

    return result[0];
  }

  findAll() {
    return this.client
      .select()
      .from(this.table)
      .where(eq(categories.isActive, true));
  }

  async findById(id: string) {
    const result = await this.client
      .select()
      .from(this.table)
      .where(eq(categories.id, id));

    return result[0] ?? null;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const result = await this.client
      .update(this.table)
      .set({
        ...updateCategoryDto,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();

    return result[0] ?? null;
  }

  async softDelete(id: string) {
    const result = await this.client
      .update(this.table)
      .set({
        isActive: false,
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();

    return result[0] ?? null;
  }

  async exists(id: string): Promise<boolean> {
    return (await this.findById(id)) !== null;
  }

  async count(): Promise<number> {
    const result = await this.client
      .select({
        total: count(),
      })
      .from(this.table)
      .where(eq(categories.isActive, true));

    return Number(result[0].total);
  }
}