import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        "Correo o contraseña incorrectos.",
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException(
        "Correo o contraseña incorrectos.",
      );
    }

    const payload = {
      sub: user.id,
      companyId: user.companyId,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        companyId: user.companyId,
      },
    };
  }
}
