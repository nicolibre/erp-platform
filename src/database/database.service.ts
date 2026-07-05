import { Injectable } from "@nestjs/common";
import { db } from "./database";

@Injectable()
export class DatabaseService {
  get client() {
    return db;
  }
}
