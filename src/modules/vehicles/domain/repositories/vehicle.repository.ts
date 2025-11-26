import { VehicleEntity } from "../entities/vehicle.entity";

export interface IVehicleRepository {
  save(vehicle: VehicleEntity): Promise<VehicleEntity>;
  findById(id: string): Promise<VehicleEntity | null>;
  findAll(): Promise<VehicleEntity[]>;
  existsByLicensePlate(licensePlate: string): Promise<boolean>;
  existsByVin(vin: string): Promise<boolean>;
  delete(id: string): Promise<void>;
}