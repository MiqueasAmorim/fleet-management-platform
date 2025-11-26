import { VehicleEntity } from '../../../domain/entities/vehicle.entity';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { VehicleResponseDto } from '../dto/vehicle-response.dto';
import { CreateVehicleParams } from '../../../domain/entities/vehicle.entity';
import { UpdateVehicleParams } from '../../../application/use-cases/update-vehicle.use-case';

export class VehicleMapper {
  static toResponseDto(vehicle: VehicleEntity): VehicleResponseDto {
    return {
      id: vehicle.id,
      licensePlate: vehicle.licensePlate.value,
      vin: vehicle.vin.value,
      renavam: vehicle.renavam.value,
      model: vehicle.model.value,
      make: vehicle.make.value,
      modelYear: vehicle.modelYear.value,
    };
  }

  static toCreateParams(
    dto: CreateVehicleDto,
    id: string,
  ): CreateVehicleParams {
    return {
      id,
      licensePlate: dto.licensePlate,
      vin: dto.vin,
      renavam: dto.renavam,
      model: dto.model,
      make: dto.make,
      modelYear: dto.modelYear,
    };
  }

  static toUpdateParams(dto: UpdateVehicleDto): UpdateVehicleParams {
    return {
      licensePlate: dto.licensePlate,
      vin: dto.vin,
      renavam: dto.renavam,
      model: dto.model,
      make: dto.make,
      modelYear: dto.modelYear,
    };
  }
}

