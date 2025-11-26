import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { CreateVehicleUseCase } from '../../../application/use-cases/create-vehicle.use-case';
import { GetVehicleUseCase } from '../../../application/use-cases/get-vehicle.use-case';
import { ListVehiclesUseCase } from '../../../application/use-cases/list-vehicles.use-case';
import { UpdateVehicleUseCase } from '../../../application/use-cases/update-vehicle.use-case';
import { DeleteVehicleUseCase } from '../../../application/use-cases/delete-vehicle.use-case';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { VehicleResponseDto } from '../dto/vehicle-response.dto';
import { VehicleMapper } from '../mappers/vehicle.mapper';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { randomUUID } from 'crypto';

@Controller('vehicles')
@UseFilters(HttpExceptionFilter)
export class VehicleController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly getVehicleUseCase: GetVehicleUseCase,
    private readonly listVehiclesUseCase: ListVehiclesUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleResponseDto> {
    const id = randomUUID();
    const params = VehicleMapper.toCreateParams(createVehicleDto, id);
    const vehicle = await this.createVehicleUseCase.execute(params);
    return VehicleMapper.toResponseDto(vehicle);
  }

  @Get()
  async findAll(): Promise<VehicleResponseDto[]> {
    const vehicles = await this.listVehiclesUseCase.execute();
    return vehicles.map((vehicle) => VehicleMapper.toResponseDto(vehicle));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VehicleResponseDto> {
    const vehicle = await this.getVehicleUseCase.execute(id);
    return VehicleMapper.toResponseDto(vehicle);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleResponseDto> {
    const params = VehicleMapper.toUpdateParams(updateVehicleDto);
    const vehicle = await this.updateVehicleUseCase.execute(id, params);
    return VehicleMapper.toResponseDto(vehicle);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteVehicleUseCase.execute(id);
  }
}

