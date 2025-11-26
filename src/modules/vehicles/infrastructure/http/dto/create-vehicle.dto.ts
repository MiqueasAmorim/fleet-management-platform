import { IsString, IsNotEmpty, Length, IsInt, Min, Max } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @Length(7, 10)
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  @Length(17, 17)
  vin: string;

  @IsString()
  @IsNotEmpty()
  @Length(9, 11)
  renavam: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  model: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  make: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  modelYear: number;
}

