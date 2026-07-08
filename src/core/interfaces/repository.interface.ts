export interface IRepository<
  TEntity,
  TCreateDto,
  TUpdateDto,
> {
  findById(id: string): Promise<TEntity | null>;

  findAll(): Promise<TEntity[]>;

  create(dto: TCreateDto): Promise<TEntity>;

  update(
    id: string,
    dto: TUpdateDto,
  ): Promise<TEntity | null>;

  softDelete(id: string): Promise<TEntity | null>;

  restore(id: string): Promise<TEntity | null>;

  exists(id: string): Promise<boolean>;

  count(): Promise<number>;
}