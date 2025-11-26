import { VehicleEntity } from "../../domain/entities/vehicle.entity";
import { IVehicleRepository } from "../../domain/repositories/vehicle.repository";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found.exception";
import { GetVehicleUseCase } from "./get-vehicle.use-case";


describe('GetVehicleUseCase', () => {
  let useCase: GetVehicleUseCase;
  let mockRepository: jest.Mocked<IVehicleRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
    } as any;

    useCase = new GetVehicleUseCase(mockRepository);
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

  it('should return a vehicle when found', async () => {
    // Arrange
    const vehicle = VehicleEntity.create(validVehicleParams);
    mockRepository.findById.mockResolvedValue(vehicle);

    // Act
    const result = await useCase.execute('123');

    // Assert
    expect(result).toBe(vehicle);
    expect(mockRepository.findById).toHaveBeenCalledWith('123');
    expect(mockRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('should throw VehicleNotFoundException when vehicle is not found', async () => {
    // Arrange
    mockRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute('999')).rejects.toThrow(VehicleNotFoundException);
    await expect(useCase.execute('999')).rejects.toThrow(
      'Vehicle with ID 999 not found'
    );
    expect(mockRepository.findById).toHaveBeenCalledWith('999');
  });

  it('should throw error when ID is empty', async () => {
    // Act & Assert
    await expect(useCase.execute('')).rejects.toThrow('Vehicle ID is required');
    expect(mockRepository.findById).not.toHaveBeenCalled();
  });

  it('should throw error when ID is null', async () => {
    // Act & Assert
    await expect(useCase.execute(null as any)).rejects.toThrow('Vehicle ID is required');
    expect(mockRepository.findById).not.toHaveBeenCalled();
  });

  it('should throw error when ID is undefined', async () => {
    // Act & Assert
    await expect(useCase.execute(undefined as any)).rejects.toThrow('Vehicle ID is required');
    expect(mockRepository.findById).not.toHaveBeenCalled();
  });
});

