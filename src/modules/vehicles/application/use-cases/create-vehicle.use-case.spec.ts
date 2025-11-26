import { VehicleEntity } from "../../domain/entities/vehicle.entity";
import { IVehicleRepository } from "../../domain/repositories/vehicle.repository";
import { DuplicateVehicleException } from "../exceptions/duplicate-vehicle.exception";
import { CreateVehicleUseCase } from "./create-vehicle.use-case";


describe('CreateVehicleUseCase', () => {
  let useCase: CreateVehicleUseCase;
  let mockRepository: jest.Mocked<IVehicleRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      existsByLicensePlate: jest.fn(),
      existsByVin: jest.fn(),
    } as any;

    useCase = new CreateVehicleUseCase(mockRepository);
  });

  const validParams = {
    id: '123',
    licensePlate: 'ABC1D23',
    vin: '9BWZZZ377VT004251',
    renavam: '12345678900',
    model: 'Gol',
    make: 'Volkswagen',
    modelYear: 2020,
  };

  it('should create a vehicle successfully', async () => {
    // Arrange
    mockRepository.existsByLicensePlate.mockResolvedValue(false);
    mockRepository.existsByVin.mockResolvedValue(false);
    
    const savedVehicle = VehicleEntity.create(validParams);
    mockRepository.save.mockResolvedValue(savedVehicle);

    // Act
    const result = await useCase.execute(validParams);

    // Assert
    expect(result).toBe(savedVehicle);
    expect(mockRepository.existsByLicensePlate).toHaveBeenCalledWith(validParams.licensePlate);
    expect(mockRepository.existsByVin).toHaveBeenCalledWith(validParams.vin);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw DuplicateVehicleException when license plate already exists', async () => {
    // Arrange
    mockRepository.existsByLicensePlate.mockResolvedValue(true);

    // Act & Assert
    await expect(useCase.execute(validParams)).rejects.toThrow(DuplicateVehicleException);
    await expect(useCase.execute(validParams)).rejects.toThrow(
      `Vehicle with license plate ${validParams.licensePlate} already exists`
    );
    expect(mockRepository.existsByLicensePlate).toHaveBeenCalledWith(validParams.licensePlate);
    expect(mockRepository.existsByVin).not.toHaveBeenCalled();
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should throw DuplicateVehicleException when VIN already exists', async () => {
    // Arrange
    mockRepository.existsByLicensePlate.mockResolvedValue(false);
    mockRepository.existsByVin.mockResolvedValue(true);

    // Act & Assert
    await expect(useCase.execute(validParams)).rejects.toThrow(DuplicateVehicleException);
    await expect(useCase.execute(validParams)).rejects.toThrow(
      `Vehicle with VIN ${validParams.vin} already exists`
    );
    expect(mockRepository.existsByLicensePlate).toHaveBeenCalledWith(validParams.licensePlate);
    expect(mockRepository.existsByVin).toHaveBeenCalledWith(validParams.vin);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should throw error when vehicle entity creation fails', async () => {
    // Arrange
    mockRepository.existsByLicensePlate.mockResolvedValue(false);
    mockRepository.existsByVin.mockResolvedValue(false);

    const invalidParams = {
      ...validParams,
      licensePlate: '', // Invalid
    };

    // Act & Assert
    await expect(useCase.execute(invalidParams)).rejects.toThrow();
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});

