import { Injectable, Inject } from '@nestjs/common';
import { CreateVehicleParams, VehicleEntity } from "../../domain/entities/vehicle.entity";
import type { IVehicleRepository } from "../../domain/repositories/vehicle.repository";
import { DuplicateVehicleException } from "../exceptions/duplicate-vehicle.exception";

@Injectable()
export class CreateVehicleUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository
  ) {}

  async execute(params: CreateVehicleParams): Promise<VehicleEntity> {
    await this.validateUniqueness(params);

    const vehicle = VehicleEntity.create(params);

    return await this.vehicleRepository.save(vehicle);
  }

  private async validateUniqueness(params: CreateVehicleParams): Promise<void> {
    await this.validateLicensePlateUniqueness(params.licensePlate);
    await this.validateVinUniqueness(params.vin);
  }

  private async validateLicensePlateUniqueness(licensePlate: string): Promise<void> {
    const exists = await this.vehicleRepository.existsByLicensePlate(licensePlate);
    
    if (exists) {
      throw new DuplicateVehicleException(
        `Vehicle with license plate ${licensePlate} already exists`
      );
    }
  }

  private async validateVinUniqueness(vin: string): Promise<void> {
    const exists = await this.vehicleRepository.existsByVin(vin);
    
    if (exists) {
      throw new DuplicateVehicleException(
        `Vehicle with VIN ${vin} already exists`
      );
    }
  }
}