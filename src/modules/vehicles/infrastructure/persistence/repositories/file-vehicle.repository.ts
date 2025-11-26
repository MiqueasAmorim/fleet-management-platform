import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { VehicleEntity } from 'src/modules/vehicles/domain/entities/vehicle.entity';
import { IVehicleRepository } from 'src/modules/vehicles/domain/repositories/vehicle.repository';

interface VehicleData {
  id: string;
  licensePlate: string;
  vin: string;
  renavam: string;
  model: string;
  make: string;
  modelYear: number;
}

@Injectable()
export class FileVehicleRepository implements IVehicleRepository {
  private readonly dataDir: string;
  private readonly filePath: string;

  constructor() {
    this.dataDir = join(process.cwd(), 'data');
    this.filePath = join(this.dataDir, 'vehicles.json');
  }

  private async ensureDataDirectory(): Promise<void> {
    try {
      await fs.access(this.dataDir);
    } catch {
      await fs.mkdir(this.dataDir, { recursive: true });
    }
  }

  private async readFile(): Promise<VehicleData[]> {
    try {
      await this.ensureDataDirectory();
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  private async writeFile(data: VehicleData[]): Promise<void> {
    await this.ensureDataDirectory();
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async save(vehicle: VehicleEntity): Promise<VehicleEntity> {
    const vehicles = await this.readFile();
    const vehicleData: VehicleData = {
      id: vehicle.id,
      licensePlate: vehicle.licensePlate.value,
      vin: vehicle.vin.value,
      renavam: vehicle.renavam.value,
      model: vehicle.model.value,
      make: vehicle.make.value,
      modelYear: vehicle.modelYear.value,
    };

    const existingIndex = vehicles.findIndex((v) => v.id === vehicle.id);
    if (existingIndex >= 0) {
      vehicles[existingIndex] = vehicleData;
    } else {
      vehicles.push(vehicleData);
    }

    await this.writeFile(vehicles);
    return vehicle;
  }

  async findById(id: string): Promise<VehicleEntity | null> {
    const vehicles = await this.readFile();
    const vehicleData = vehicles.find((v) => v.id === id);
    
    if (!vehicleData) {
      return null;
    }

    return VehicleEntity.create({
      id: vehicleData.id,
      licensePlate: vehicleData.licensePlate,
      vin: vehicleData.vin,
      renavam: vehicleData.renavam,
      model: vehicleData.model,
      make: vehicleData.make,
      modelYear: vehicleData.modelYear,
    });
  }

  async findAll(): Promise<VehicleEntity[]> {
    const vehicles = await this.readFile();
    return vehicles.map((vehicleData) =>
      VehicleEntity.create({
        id: vehicleData.id,
        licensePlate: vehicleData.licensePlate,
        vin: vehicleData.vin,
        renavam: vehicleData.renavam,
        model: vehicleData.model,
        make: vehicleData.make,
        modelYear: vehicleData.modelYear,
      }),
    );
  }

  async existsByLicensePlate(licensePlate: string): Promise<boolean> {
    const vehicles = await this.readFile();
    return vehicles.some((v) => v.licensePlate === licensePlate);
  }

  async existsByVin(vin: string): Promise<boolean> {
    const vehicles = await this.readFile();
    return vehicles.some((v) => v.vin === vin);
  }

  async delete(id: string): Promise<void> {
    const vehicles = await this.readFile();
    const filteredVehicles = vehicles.filter((v) => v.id !== id);
    await this.writeFile(filteredVehicles);
  }
}

