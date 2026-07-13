import { Injectable } from "@nestjs/common";

import { BaseService } from "../core/base";

import { brands } from "../database/schema";

import { BrandsRepository } from "./brands.repository";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Injectable()
export class BrandsService extends BaseService<
  typeof brands.$inferSelect,
  CreateBrandDto,
  UpdateBrandDto
> {
  constructor(
    repository: BrandsRepository,
  ) {
    super(repository);
  }
}