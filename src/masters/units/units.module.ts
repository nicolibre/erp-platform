import { Module } from "@nestjs/common";

console.log(">>> UnitsModule cargado");

import { UnitsController } from "./units.controller";
import { UnitsRepository } from "./units.repository";
import { UnitsService } from "./units.service";

@Module({
  controllers: [UnitsController],
  providers: [
    UnitsService,
    UnitsRepository,
  ],
})
export class UnitsModule {}