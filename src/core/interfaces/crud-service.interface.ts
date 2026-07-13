export interface ICrudService<
  TEntity,
  TCreateDto,
  TUpdateDto,
> {
  create(dto: TCreateDto): Promise<TEntity>;

  findAll(): Promise<TEntity[]>;

  findOne(id: string): Promise<TEntity>;

  update(
    id: string,
    dto: TUpdateDto,
  ): Promise<TEntity>;

  remove(id: string): Promise<TEntity>;
}