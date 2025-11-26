import { VehicleEntity } from "src/modules/vehicles/domain/entities/vehicle.entity";
import { IVehicleRepository } from "src/modules/vehicles/domain/repositories/vehicle.repository";

export class InMemoryVehicleRepository implements IVehicleRepository {
    private vehicles: VehicleEntity[] = [];

    save(vehicle: VehicleEntity): Promise<VehicleEntity> {
        const index = this.vehicles.findIndex(v => v.id === vehicle.id);
        if (index >= 0) {
            this.vehicles[index] = vehicle;
        } else {
            this.vehicles.push(vehicle);
        }
        return Promise.resolve(vehicle);
    }

    findById(id: string): Promise<VehicleEntity | null> {
        return Promise.resolve(this.vehicles.find(vehicle => vehicle.id === id) || null);
    }

    findAll(): Promise<VehicleEntity[]> {
        return Promise.resolve(this.vehicles);
    }

    existsByLicensePlate(licensePlate: string): Promise<boolean> {
        return Promise.resolve(this.vehicles.some(vehicle => vehicle.licensePlate.value === licensePlate));
    }

    existsByVin(vin: string): Promise<boolean> {
        return Promise.resolve(this.vehicles.some(vehicle => vehicle.vin.value === vin));
    }

    delete(id: string): Promise<void> {
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
        return Promise.resolve();
    }
}