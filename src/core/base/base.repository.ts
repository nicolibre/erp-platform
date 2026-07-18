import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database/database.service";

@Injectable()
export abstract class BaseRepository<TTable> {
  constructor(
    protected readonly db: DatabaseService,
    protected readonly table: TTable,
  ) {}

  protected get client() {
    return this.db.client;
  }

  protected getTable(): TTable {
    return this.table;
  }
}