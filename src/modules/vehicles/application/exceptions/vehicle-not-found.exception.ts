export class VehicleNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = VehicleNotFoundException.name;
  }
}

