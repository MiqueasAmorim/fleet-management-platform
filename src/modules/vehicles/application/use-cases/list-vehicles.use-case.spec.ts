import { ListVehiclesUseCase } from "./list-vehicles.use-case";
import { IVehicleRepository } from "../../domain/repositories/vehicle.repository";
import { VehicleEntity } from "../../domain/entities/vehicle.entity";

describe('ListVehiclesUseCase', () => {
  let useCase: ListVehiclesUseCase;
  let mockRepository: jest.Mocked<IVehicleRepository>;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
    } as any;

    useCase = new ListVehiclesUseCase(mockRepository);
  });

  const validVehicleParams = {
    id: '123',
    licensePlate: 'ABC1D23',
    vin: '9BWZZZ377VT004251',
    renavam: '12345678900',
    model: 'Gol',
    make: 'Volkswagen',
    modelYear: 2020,
  };

  it('should return a list of vehicles', async () => {
    // Arrange
    const vehicle1 = VehicleEntity.create(validVehicleParams);
    const vehicle2 = VehicleEntity.create({
      ...validVehicleParams,
      id: '456',
      licensePlate: 'XYZ9A87',
      vin: '1HGCM82633A123456',
    });
    const vehicles = [vehicle1, vehicle2];
    mockRepository.findAll.mockResolvedValue(vehicles);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual(vehicles);
    expect(result).toHaveLength(2);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no vehicles are found', async () => {
    // Arrange
    mockRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when repository returns null', async () => {
    // Arrange
    mockRepository.findAll.mockResolvedValue(null as any);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when repository returns undefined', async () => {
    // Arrange
    mockRepository.findAll.mockResolvedValue(undefined as any);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });
});

