import { DeleteVehicleUseCase } from "./delete-vehicle.use-case";
import { IVehicleRepository } from "../../domain/repositories/vehicle.repository";
import { VehicleEntity } from "../../domain/entities/vehicle.entity";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found.exception";

describe('DeleteVehicleUseCase', () => {
  let useCase: DeleteVehicleUseCase;
  let mockRepository: jest.Mocked<IVehicleRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new DeleteVehicleUseCase(mockRepository);
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

  it('should delete a vehicle successfully', async () => {
    // Arrange
    const vehicle = VehicleEntity.create(validVehicleParams);
    mockRepository.findById.mockResolvedValue(vehicle);
    mockRepository.delete.mockResolvedValue(undefined);

    // Act
    await useCase.execute('123');

    // Assert
    expect(mockRepository.findById).toHaveBeenCalledWith('123');
    expect(mockRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockRepository.delete).toHaveBeenCalledWith('123');
    expect(mockRepository.delete).toHaveBeenCalledTimes(1);
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
    expect(mockRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw error when ID is empty', async () => {
    // Act & Assert
    await expect(useCase.execute('')).rejects.toThrow('Vehicle ID is required');
    expect(mockRepository.findById).not.toHaveBeenCalled();
    expect(mockRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw error when ID is null', async () => {
    // Act & Assert
    await expect(useCase.execute(null as any)).rejects.toThrow('Vehicle ID is required');
    expect(mockRepository.findById).not.toHaveBeenCalled();
    expect(mockRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw error when ID is undefined', async () => {
    // Act & Assert
    await expect(useCase.execute(undefined as any)).rejects.toThrow('Vehicle ID is required');
    expect(mockRepository.findById).not.toHaveBeenCalled();
    expect(mockRepository.delete).not.toHaveBeenCalled();
  });
});

