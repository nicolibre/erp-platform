import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class CreateUnitDto {
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

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  symbol: string;

  @IsOptional()
  @IsString()
  description?: string;
}