export class DuplicateVehicleException extends Error {
  constructor(message: string) {
    super(message);
    this.name = DuplicateVehicleException.name;
  }
}

