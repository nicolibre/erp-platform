import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { CurrentUser } from "./current-user.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(
      loginDto.email,
      loginDto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@CurrentUser() user: any) {
    return user;
  }
}
