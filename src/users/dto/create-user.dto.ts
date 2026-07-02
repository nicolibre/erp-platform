import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsUUID,
} from "class-validator";

export class CreateUserDto {
  @IsUUID()
  companyId: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsString()
  phone?: string;
}