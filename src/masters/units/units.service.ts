import { Injectable } from "@nestjs/common";

import { BaseService } from "../../core/base";

import { units } from "../../database/schema";

import { UnitsRepository } from "./units.repository";
import { CreateUnitDto } from "./dto/create-unit.dto";
import { UpdateUnitDto } from "./dto/update-unit.dto";

@Injectable()
export class UnitsService extends BaseService<
  typeof units.$inferSelect,
  CreateUnitDto,
  UpdateUnitDto
> {
  constructor(
    repository: UnitsRepository,
  ) {
    super(repository);
  }
}