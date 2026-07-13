import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Messages } from "../constants";

import type { IReadRepository } from "../interfaces/read-repository.interface";

import { EntityId } from "../types";

@Injectable()
export abstract class BaseReadService<TEntity> {

  constructor(
    protected readonly repository: IReadRepository<TEntity>,
  ) {}

  async findAll(): Promise<TEntity[]> {
    return this.repository.findAll();
  }

  async findById(
    id: EntityId,
  ): Promise<TEntity> {

    const entity =
      await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException(
        Messages.NOT_FOUND,
      );
    }

    return entity;
  }

  async exists(
    id: EntityId,
  ): Promise<boolean> {

    return this.repository.exists(id);

  }

  async count(): Promise<number> {

    return this.repository.count();

  }

}