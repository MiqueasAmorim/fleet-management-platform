import { UpdateVehicleUseCase } from "./update-vehicle.use-case";
import { IVehicleRepository } from "../../domain/repositories/vehicle.repository";
import { VehicleEntity } from "../../domain/entities/vehicle.entity";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found.exception";
import { DuplicateVehicleException } from "../exceptions/duplicate-vehicle.exception";

describe('UpdateVehicleUseCase', () => {
  let useCase: UpdateVehicleUseCase;
  let mockRepository: jest.Mocked<IVehicleRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      existsByLicensePlate: jest.fn(),
      existsByVin: jest.fn(),
    } as any;

    useCase = new UpdateVehicleUseCase(mockRepository);
  });

  const existingVehicleParams = {
    id: '123',
    licensePlate: 'ABC1D23',
    vin: '9BWZZZ377VT004251',
    renavam: '12345678900',
    model: 'Gol',
    make: 'Volkswagen',
    modelYear: 2020,
  };

  it('should update a vehicle successfully', async () => {
    // Arrange
    const existingVehicle = VehicleEntity.create(existingVehicleParams);
    mockRepository.findById.mockResolvedValue(existingVehicle);
    mockRepository.existsByLicensePlate.mockResolvedValue(false);
    mockRepository.existsByVin.mockResolvedValue(false);

    const updateParams = {
      model: 'Polo',
      modelYear: 2021,
    };

    const updatedVehicle = VehicleEntity.create({
      ...existingVehicleParams,
      ...updateParams,
    });
    mockRepository.save.mockResolvedValue(updatedVehicle);

    // Act
    const result = await useCase.execute('123', updateParams);

    // Assert
    expect(result).toBe(updatedVehicle);
    expect(mockRepository.findById).toHaveBeenCalledWith('123');
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should update only provided fields and keep others unchanged', async () => {
    // Arrange
    const existingVehicle = VehicleEntity.create(existingVehicleParams);
    mockRepository.findById.mockResolvedValue(existingVehicle);
    mockRepository.existsByLicensePlate.mockResolvedValue(false);
    mockRepository.existsByVin.mockResolvedValue(false);

    const updateParams = {
      model: 'Polo',
    };

    const updatedVehicle = VehicleEntity.create({
      ...existingVehicleParams,
      model: 'Polo',
    });
    mockRepository.save.mockResolvedValue(updatedVehicle);

    // Act
    const result = await useCase.execute('123', updateParams);

    // Assert
    expect(result.id).toBe(existingVehicleParams.id);
    expect(result.licensePlate.value).toBe(existingVehicleParams.licensePlate);
    expect(result.vin.value).toBe(existingVehicleParams.vin);
    expect(result.renavam.value).toBe(existingVehicleParams.renavam);
    expect(result.model.value).toBe('Polo');
    expect(result.make.value).toBe(existingVehicleParams.make);
    expect(result.modelYear.value).toBe(existingVehicleParams.modelYear);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw VehicleNotFoundException when vehicle does not exist', async () => {
    // Arrange
    mockRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute('999', { model: 'Polo' })).rejects.toThrow(
      VehicleNotFoundException
    );
    await expect(useCase.execute('999', { model: 'Polo' })).rejects.toThrow(
      'Vehicle with ID 999 not found'
    );
    expect(mockRepository.findById).toHaveBeenCalledWith('999');
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should throw error when ID is empty', async () => {
    // Act & Assert
    await expect(useCase.execute('', { model: 'Polo' })).rejects.toThrow(
      'Vehicle ID is required'
    );
    expect(mockRepository.findById).not.toHaveBeenCalled();
  });

  it('should throw DuplicateVehicleException when license plate already exists', async () => {
    // Arrange
    const existingVehicle = VehicleEntity.create(existingVehicleParams);
    mockRepository.findById.mockResolvedValue(existingVehicle);
    mockRepository.existsByLicensePlate.mockResolvedValue(true);

    const updateParams = {
      licensePlate: 'XYZ9A87',
    };

    // Act & Assert
    await expect(useCase.execute('123', updateParams)).rejects.toThrow(
      DuplicateVehicleException
    );
    await expect(useCase.execute('123', updateParams)).rejects.toThrow(
      'Vehicle with license plate XYZ9A87 already exists'
    );
    expect(mockRepository.existsByLicensePlate).toHaveBeenCalledWith('XYZ9A87');
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should throw DuplicateVehicleException when VIN already exists', async () => {
    // Arrange
    const existingVehicle = VehicleEntity.create(existingVehicleParams);
    mockRepository.findById.mockResolvedValue(existingVehicle);
    mockRepository.existsByLicensePlate.mockResolvedValue(false);
    mockRepository.existsByVin.mockResolvedValue(true);

    const updateParams = {
      vin: '1HGCM82633A123456',
    };

    // Act & Assert
    await expect(useCase.execute('123', updateParams)).rejects.toThrow(
      DuplicateVehicleException
    );
    await expect(useCase.execute('123', updateParams)).rejects.toThrow(
      'Vehicle with VIN 1HGCM82633A123456 already exists'
    );
    expect(mockRepository.existsByVin).toHaveBeenCalledWith('1HGCM82633A123456');
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should not check duplicates when license plate is not changed', async () => {
    // Arrange
    const existingVehicle = VehicleEntity.create(existingVehicleParams);
    mockRepository.findById.mockResolvedValue(existingVehicle);
    mockRepository.existsByVin.mockResolvedValue(false);

    const updateParams = {
      model: 'Polo',
      licensePlate: existingVehicleParams.licensePlate,
    };

    const updatedVehicle = VehicleEntity.create({
      ...existingVehicleParams,
      model: 'Polo',
    });
    mockRepository.save.mockResolvedValue(updatedVehicle);

    // Act
    await useCase.execute('123', updateParams);

    // Assert
    expect(mockRepository.existsByLicensePlate).not.toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should not check duplicates when VIN is not changed', async () => {
    // Arrange
    const existingVehicle = VehicleEntity.create(existingVehicleParams);
    mockRepository.findById.mockResolvedValue(existingVehicle);
    mockRepository.existsByLicensePlate.mockResolvedValue(false);

    const updateParams = {
      model: 'Polo',
      vin: existingVehicleParams.vin,
    };

    const updatedVehicle = VehicleEntity.create({
      ...existingVehicleParams,
      model: 'Polo',
    });
    mockRepository.save.mockResolvedValue(updatedVehicle);

    // Act
    await useCase.execute('123', updateParams);

    // Assert
    expect(mockRepository.existsByVin).not.toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw error when updated data is invalid', async () => {
    // Arrange
    const existingVehicle = VehicleEntity.create(existingVehicleParams);
    mockRepository.findById.mockResolvedValue(existingVehicle);

    const updateParams = {
      licensePlate: '',
    };

    // Act & Assert
    await expect(useCase.execute('123', updateParams)).rejects.toThrow();
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});

