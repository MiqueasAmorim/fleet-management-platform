import { Module } from '@nestjs/common';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

@Module({
  imports: [
    VehiclesModule,
  ],
})
export class AppModule {}
