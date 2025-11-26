import { LicensePlateValueObject } from "./license-plate.value-object";

describe('LicensePlateValueObject', () => {
  it('should create a valid Mercosul plate', () => {
    const plate = new LicensePlateValueObject('ABC1D23');
    expect(plate.value).toBe('ABC1D23');
  });

  it('should throw an error when license plate is empty', () => {
    expect(() => new LicensePlateValueObject('')).toThrow('License plate cannot be empty');
  });

  it('should throw an error when license plate is null', () => {
    expect(() => new LicensePlateValueObject(null as any)).toThrow('License plate cannot be empty');
  });

  it('should throw an error when license plate is undefined', () => {
    expect(() => new LicensePlateValueObject(undefined as any)).toThrow('License plate cannot be empty');
  });

  it('should create a valid old Brazilian plate', () => {
    const plate = new LicensePlateValueObject('ABC1234');
    expect(plate.value).toBe('ABC1234');
  });

  it('should throw an error when plate is invalid', () => {
    expect(() => new LicensePlateValueObject('INVALID')).toThrow();
  });

  it('should normalize plate to uppercase', () => {
    const plate = new LicensePlateValueObject('abc1d23');
    expect(plate.value).toBe('ABC1D23');
  });
  it('should compare two plates by value', () => {
    const plate1 = new LicensePlateValueObject('ABC1D23');
    const plate2 = new LicensePlateValueObject('ABC1D23');
    expect(plate1.equals(plate2)).toBe(true);
  });
});

