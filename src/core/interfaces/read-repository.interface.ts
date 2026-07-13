import { EntityId } from "../types";

export interface IReadRepository<TEntity> {
  findAll(): Promise<TEntity[]>;

  findById(id: EntityId): Promise<TEntity | null>;

  exists(id: EntityId): Promise<boolean>;

  count(): Promise<number>;
}