import { db } from "./database";

export const DatabaseProvider = {
  provide: "DATABASE",
  useValue: db,
};