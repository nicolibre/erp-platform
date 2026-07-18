import { ConflictException } from "@nestjs/common";

export class DuplicateRecordException
  extends ConflictException {

  constructor(entity: string) {
    super(`${entity} ya existe.`);
  }

}