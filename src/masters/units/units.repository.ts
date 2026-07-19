import { Injectable } from "@nestjs/common";
import { count, eq } from "drizzle-orm";

import { BaseRepository } from "../../core/base";
import type { IRepository } from "../../core/interfaces";

import { DatabaseService } from "../../database/database.service";
import { units } from "../../database/schema";

import { CreateUnitDto } from "./dto/create-unit.dto";
import { UpdateUnitDto } from "./dto/update-unit.dto";

@Injectable()
export class UnitsRepository
  extends BaseRepository<typeof units>
  implements IRepository<
    typeof units.$inferSelect,
    CreateUnitDto,
    UpdateUnitDto
  >
{
  constructor(database: DatabaseService) {
    super(database, units);
  }

  async create(createUnitDto: CreateUnitDto) {
    const result = await this.client
      .insert(this.table)
      .values({
        companyId: createUnitDto.companyId,
        code: createUnitDto.code,
        name: createUnitDto.name,
        symbol: createUnitDto.symbol,
        description: createUnitDto.description,
      })
      .returning();

    return result[0];
  }

  findAll() {
    return this.client
      .select()
      .from(this.table)
      .where(eq(units.isActive, true));
  }

  async findById(id: string) {
    const result = await this.client
      .select()
      .from(this.table)
      .where(eq(units.id, id));

    return result[0] ?? null;
  }

  async update(
    id: string,
    updateUnitDto: UpdateUnitDto,
  ) {
    const result = await this.client
      .update(this.table)
      .set({
        ...updateUnitDto,
        updatedAt: new Date(),
      })
      .where(eq(units.id, id))
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
      .where(eq(units.id, id))
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
      .where(eq(units.isActive, true));

    return Number(result[0].total);
  }
}