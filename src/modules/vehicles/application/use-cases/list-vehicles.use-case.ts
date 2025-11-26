import { Injectable, Inject } from '@nestjs/common';
import { VehicleEntity } from "../../domain/entities/vehicle.entity";
import type { IVehicleRepository } from "../../domain/repositories/vehicle.repository";

@Injectable()
export class ListVehiclesUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository
  ) {}

  async execute(): Promise<VehicleEntity[]> {
    const vehicles = await this.vehicleRepository.findAll();
    return vehicles || [];
  }
}