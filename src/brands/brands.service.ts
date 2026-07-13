import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Messages } from "../core/constants";

import { BrandsRepository } from "./brands.repository";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Injectable()
export class BrandsService {
  constructor(
    private readonly brandsRepository: BrandsRepository,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    return this.brandsRepository.create(createBrandDto);
  }

  findAll() {
    return this.brandsRepository.findAll();
  }

  async findOne(id: string) {
    const brand = await this.brandsRepository.findById(id);

    if (!brand) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }

    return brand;
  }

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ) {
    const brand = await this.brandsRepository.findById(id);

    if (!brand) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }

    return this.brandsRepository.update(
      id,
      updateBrandDto,
    );
  }

  async remove(id: string) {
    const brand = await this.brandsRepository.findById(id);

    if (!brand) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }

    return this.brandsRepository.softDelete(id);
  }
}