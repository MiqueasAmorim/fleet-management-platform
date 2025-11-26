import { Injectable, Inject } from '@nestjs/common';
import type { IVehicleRepository } from '../../domain/repositories/vehicle.repository';
import { VehicleNotFoundException } from '../exceptions/vehicle-not-found.exception';
import { VehicleEntity } from '../../domain/entities/vehicle.entity';

@Injectable()
export class DeleteVehicleUseCase {
    constructor(
        @Inject('IVehicleRepository')
        private readonly vehicleRepository: IVehicleRepository
    ) {}

    async execute(id: string): Promise<void> {
        this.validateId(id);

        const existingVehicle = await this.findExistingVehicle(id);

        await this.vehicleRepository.delete(existingVehicle.id);
    }

    private validateId(id: string): void {
        if (!id) {
            throw new Error('Vehicle ID is required');
        }
    }

    private async findExistingVehicle(id: string): Promise<VehicleEntity> {
        const existingVehicle = await this.vehicleRepository.findById(id);

        if (!existingVehicle) {
            throw new VehicleNotFoundException(
                `Vehicle with ID ${id} not found`,
            );
        }

        return existingVehicle;
    }
}
