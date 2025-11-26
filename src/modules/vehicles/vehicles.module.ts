import { Module } from '@nestjs/common';
import { VehicleController } from './infrastructure/http/controllers/vehicle.controller';
import { CreateVehicleUseCase } from './application/use-cases/create-vehicle.use-case';
import { GetVehicleUseCase } from './application/use-cases/get-vehicle.use-case';
import { ListVehiclesUseCase } from './application/use-cases/list-vehicles.use-case';
import { UpdateVehicleUseCase } from './application/use-cases/update-vehicle.use-case';
import { DeleteVehicleUseCase } from './application/use-cases/delete-vehicle.use-case';
import { FileVehicleRepository } from './infrastructure/persistence/repositories/file-vehicle.repository';

@Module({
  controllers: [VehicleController],
  providers: [
    {
      provide: 'IVehicleRepository',
      useClass: FileVehicleRepository,
    },
    CreateVehicleUseCase,
    GetVehicleUseCase,
    ListVehiclesUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
  ],
})
export class VehiclesModule {}

