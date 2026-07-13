import { Injectable } from "@nestjs/common";
import { count, eq } from "drizzle-orm";

import { DatabaseService } from "../database/database.service";
import { brands } from "../database/schema";

import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Injectable()
export class BrandsRepository {
  constructor(
    private readonly database: DatabaseService,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const result = await this.database.client
      .insert(brands)
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
    return this.database.client
      .select()
      .from(brands)
      .where(eq(brands.isActive, true));
  }

  async findById(id: string) {
    const result = await this.database.client
      .select()
      .from(brands)
      .where(eq(brands.id, id));

    return result[0] ?? null;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const result = await this.database.client
      .update(brands)
      .set({
        ...updateBrandDto,
        updatedAt: new Date(),
      })
      .where(eq(brands.id, id))
      .returning();

    return result[0] ?? null;
  }

  async softDelete(id: string) {
    const result = await this.database.client
      .update(brands)
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
    const result = await this.database.client
      .select({
        total: count(),
      })
      .from(brands)
      .where(eq(brands.isActive, true));

    return Number(result[0].total);
  }
}