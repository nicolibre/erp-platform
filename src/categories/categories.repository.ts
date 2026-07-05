import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DatabaseService } from "../database/database.service";
import { categories } from "../database/schema";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesRepository {
  constructor(
    private readonly database: DatabaseService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
  console.log("========== CREATE ==========");
  console.log("DTO:", createCategoryDto);

  const result = await this.database.client 
    .insert(categories)
    .values({
      companyId: createCategoryDto.companyId,
      code: createCategoryDto.code,
      name: createCategoryDto.name,
      description: createCategoryDto.description,
    })
    .returning();

    console.log("INSERT RESULT:", result);
    console.log("============================");

    return result[0];
  }

  async findAll() {
    return await this.database.client
      .select()
      .from(categories)
      .where(eq(categories.isActive, true));
  }

  async findOne(id: string) {
    const result = await this.database.client
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    return result[0] ?? null;
  }

  async update(
  id: string,
  updateCategoryDto: UpdateCategoryDto,
    ) {
    console.log("===== UPDATE =====");
    console.log("ID:", id);
    console.log("DTO:", updateCategoryDto);

    const result = await this.database.client
    .update(categories)
    .set({
      ...updateCategoryDto,
      updatedAt: new Date(),
    })
    .where(eq(categories.id, id))
    .returning();

  console.log("RESULT:", result);
  console.log("==================");

  return result[0] ?? null;
}

  async remove(id: string) {
  const result = await this.database.client
    .update(categories)
    .set({
      isActive: false,
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(categories.id, id))
    .returning();

    return result[0] ?? null;
  }
}