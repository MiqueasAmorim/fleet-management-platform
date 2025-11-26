import { IsString, IsOptional, Length, IsInt, Min, Max } from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  @IsOptional()
  @Length(7, 10)
  licensePlate?: string;

  @IsString()
  @IsOptional()
  @Length(17, 17)
  vin?: string;

  @IsString()
  @IsOptional()
  @Length(9, 11)
  renavam?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  model?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  make?: string;

  @IsInt()
  @IsOptional()
  @Min(1900)
  @Max(2100)
  modelYear?: number;
}

