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
  @MaxLength(20)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}