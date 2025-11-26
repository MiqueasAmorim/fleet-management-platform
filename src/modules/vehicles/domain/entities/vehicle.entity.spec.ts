import { VehicleEntity } from "./vehicle.entity";

describe('VehicleEntity', () => {
    it('should create a vehicle with valid properties', () => {
        const vehicle = VehicleEntity.create({
            id: "123",
            licensePlate: "ABC1D23",
            vin: "9BWZZZ377VT004251",
            renavam: "12345678901",
            model: "Gol",
            make: "Volkswagen",
            modelYear: 2020,
          });

        expect(vehicle).toBeDefined();
        expect(vehicle.id).toBe("123");
        expect(vehicle.licensePlate.value).toBe("ABC1D23");
        expect(vehicle.vin.value).toBe("9BWZZZ377VT004251");
        expect(vehicle.renavam.value).toBe("12345678901");
        expect(vehicle.model.value).toBe("Gol");
        expect(vehicle.make.value).toBe("Volkswagen");
        expect(vehicle.modelYear.value).toBe(2020);
    });
});