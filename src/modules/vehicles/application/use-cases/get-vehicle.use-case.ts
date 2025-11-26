import { Injectable, Inject } from '@nestjs/common';
import { VehicleEntity } from "../../domain/entities/vehicle.entity";
import type { IVehicleRepository } from "../../domain/repositories/vehicle.repository";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found.exception";

@Injectable()
export class GetVehicleUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository
  ) {}

  async execute(id: string): Promise<VehicleEntity> {
    if (!id) {
      throw new Error('Vehicle ID is required');
    }

    const vehicle = await this.vehicleRepository.findById(id);

    if (!vehicle) {
      throw new VehicleNotFoundException(`Vehicle with ID ${id} not found`);
    }
    
    return vehicle;
  }
}