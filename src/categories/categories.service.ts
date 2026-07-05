import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.create(
      createCategoryDto,
    );
  }

  async findAll() {
    return await this.categoriesRepository.findAll();
  }

  async findOne(id: string) {
    const category =
      await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException(
        "Categoría no encontrada.",
      );
    }

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category =
      await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException(
        "Categoría no encontrada.",
      );
    }

    return await this.categoriesRepository.update(
      id,
      updateCategoryDto,
    );
  }

  async remove(id: string) {
    return await this.categoriesRepository.remove(id);
  }
}
