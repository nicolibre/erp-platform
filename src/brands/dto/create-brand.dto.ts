import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class CreateBrandDto {
  @IsUUID()
  companyId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}