import { eq } from "drizzle-orm";
import { Inject, Injectable, ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { db } from "../database/database";
import { users } from "../database/schema";

import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject("DATABASE")
    private readonly database: typeof db,
  ) {}

  async findByEmail(email: string) {
    const result = await this.database
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

    const result = await this.database
      .insert(users)
      .values({
        companyId: createUserDto.companyId,
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