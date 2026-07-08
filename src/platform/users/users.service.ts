import { eq } from "drizzle-orm";
import { Injectable, ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { DatabaseService } from "../../database/database.service";
import { users } from "../../database/schema";

import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
  private readonly database: DatabaseService,
) {}

  async findByEmail(email: string) {
    const result = await this.database.client
      .select()
      .from(users)
      .where(eq(users.email, email));

    return result[0] ?? null;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException("El correo ya está registrado.");
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const result = await this.database.client
      .insert(users)
      .values({
        companyId: createUserDto.companyId,
        roleId: createUserDto.roleId,
        email: createUserDto.email,
        passwordHash,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        phone: createUserDto.phone,
      })
      .returning();

    const { passwordHash: _, ...user } = result[0];

    return user;
  }
}