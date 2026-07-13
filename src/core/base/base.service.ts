import { NotFoundException } from "@nestjs/common";

import { Messages } from "../constants";
import type { IRepository } from "../interfaces";

export abstract class BaseService<
  TEntity,
  TCreateDto,
  TUpdateDto,
> {
  constructor(
    protected readonly repository: IRepository<
      TEntity,
      TCreateDto,
      TUpdateDto
    >,
  ) {}

  create(dto: TCreateDto): Promise<TEntity> {
    return this.repository.create(dto);
  }

  findAll(): Promise<TEntity[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<TEntity> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException(
        Messages.NOT_FOUND,
      );
    }

    return entity;
  }

  async update(
    id: string,
    dto: TUpdateDto,
  ): Promise<TEntity | null> {
    await this.findOne(id);

    return this.repository.update(id, dto);
  }

  async remove(
    id: string,
  ): Promise<TEntity | null> {
    await this.findOne(id);

    return this.repository.softDelete(id);
  }

  exists(id: string): Promise<boolean> {
    return this.repository.exists(id);
  }

  count(): Promise<number> {
    return this.repository.count();
  }
}