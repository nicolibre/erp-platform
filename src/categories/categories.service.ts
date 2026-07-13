import { Injectable } from "@nestjs/common";

import { BaseService } from "../core/base";

import { categories } from "../database/schema";

import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService extends BaseService<
  typeof categories.$inferSelect,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(
    repository: CategoriesRepository,
  ) {
    super(repository);
  }
}