import { Injectable, Inject } from '@nestjs/common';
import { CreateVehicleParams, VehicleEntity } from "../../domain/entities/vehicle.entity";
import type { IVehicleRepository } from "../../domain/repositories/vehicle.repository";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found.exception";
import { DuplicateVehicleException } from "../exceptions/duplicate-vehicle.exception";

export interface UpdateVehicleParams {
  licensePlate?: string;
  vin?: string;
  renavam?: string;
  model?: string;
  make?: string;
  modelYear?: number;
}

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository
  ) {}

  async execute(id: string, params: UpdateVehicleParams): Promise<VehicleEntity> {
    this.validateId(id);

    const existingVehicle = await this.findExistingVehicle(id);
    await this.validateUniqueFields(params, existingVehicle);

    const updatedParams = this.buildUpdatedParams(params, existingVehicle);
    const updatedVehicle = VehicleEntity.create(updatedParams);

    return await this.vehicleRepository.save(updatedVehicle);
  }

  private validateId(id: string): void {
    if (!id) {
      throw new Error('Vehicle ID is required');
    }
  }

  private async findExistingVehicle(id: string): Promise<VehicleEntity> {
    const existingVehicle = await this.vehicleRepository.findById(id);

    if (!existingVehicle) {
      throw new VehicleNotFoundException(`Vehicle with ID ${id} not found`);
    }

    return existingVehicle;
  }

  private async validateUniqueFields(
    params: UpdateVehicleParams,
    existingVehicle: VehicleEntity
  ): Promise<void> {
    await this.validateLicensePlateUniqueness(params, existingVehicle);
    await this.validateVinUniqueness(params, existingVehicle);
  }

  private async validateLicensePlateUniqueness(
    params: UpdateVehicleParams,
    existingVehicle: VehicleEntity
  ): Promise<void> {
    const isLicensePlateChanged =
      params.licensePlate &&
      params.licensePlate !== existingVehicle.licensePlate.value;

    if (!isLicensePlateChanged) {
      return;
    }

    const existsByLicensePlate = await this.vehicleRepository.existsByLicensePlate(
      params.licensePlate!
    );

    if (existsByLicensePlate) {
      throw new DuplicateVehicleException(
        `Vehicle with license plate ${params.licensePlate} already exists`
      );
    }
  }

  private async validateVinUniqueness(
    params: UpdateVehicleParams,
    existingVehicle: VehicleEntity
  ): Promise<void> {
    const isVinChanged = params.vin && params.vin !== existingVehicle.vin.value;

    if (!isVinChanged) {
      return;
    }

    const existsByVin = await this.vehicleRepository.existsByVin(params.vin!);

    if (existsByVin) {
      throw new DuplicateVehicleException(
        `Vehicle with VIN ${params.vin} already exists`
      );
    }
  }

  private buildUpdatedParams(
    params: UpdateVehicleParams,
    existingVehicle: VehicleEntity
  ): CreateVehicleParams {
    return {
      id: existingVehicle.id,
      licensePlate: params.licensePlate ?? existingVehicle.licensePlate.value,
      vin: params.vin ?? existingVehicle.vin.value,
      renavam: params.renavam ?? existingVehicle.renavam.value,
      model: params.model ?? existingVehicle.model.value,
      make: params.make ?? existingVehicle.make.value,
      modelYear: params.modelYear ?? existingVehicle.modelYear.value,
    };
  }
}

