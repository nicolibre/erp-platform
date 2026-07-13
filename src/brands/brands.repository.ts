import { Injectable } from "@nestjs/common";
import { count, eq } from "drizzle-orm";

import { BaseRepository } from "../core/base";
import type { IRepository } from "../core/interfaces";

import { DatabaseService } from "../database/database.service";
import { brands } from "../database/schema";

import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Injectable()
export class BrandsRepository
  extends BaseRepository<typeof brands>
  implements IRepository<
    typeof brands.$inferSelect,
    CreateBrandDto,
    UpdateBrandDto
  >
{
  constructor(database: DatabaseService) {
    super(database, brands);
  }

  async create(createBrandDto: CreateBrandDto) {
    const result = await this.client
      .insert(this.table)
      .values({
        companyId: createBrandDto.companyId,
        code: createBrandDto.code,
        name: createBrandDto.name,
        description: createBrandDto.description,
      })
      .returning();

    return result[0];
  }

  findAll() {
    return this.client
      .select()
      .from(this.table)
      .where(eq(brands.isActive, true));
  }

  async findById(id: string) {
    const result = await this.client
      .select()
      .from(this.table)
      .where(eq(brands.id, id));

    return result[0] ?? null;
  }

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ) {
    const result = await this.client
      .update(this.table)
      .set({
        ...updateBrandDto,
        updatedAt: new Date(),
      })
      .where(eq(brands.id, id))
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
      .where(eq(brands.id, id))
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
      .where(eq(brands.isActive, true));

    return Number(result[0].total);
  }
}