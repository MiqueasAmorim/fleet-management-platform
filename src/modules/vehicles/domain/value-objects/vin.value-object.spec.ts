import { VinValueObject } from "./vin.value-object";

describe('VinValueObject', () => {
  it('should create a valid VIN', () => {
    const vin = new VinValueObject('9BWZZZ377VT004251');
    expect(vin.value).toBe('9BWZZZ377VT004251');
  });

  it('should create a valid VIN with letters and numbers', () => {
    const vin = new VinValueObject('1HGCM82633A123456');
    expect(vin.value).toBe('1HGCM82633A123456');
  });

  it('should normalize VIN to uppercase', () => {
    const vin = new VinValueObject('9bwzzz377vt004251');
    expect(vin.value).toBe('9BWZZZ377VT004251');
  });

  it('should trim whitespace from VIN', () => {
    const vin = new VinValueObject('  9BWZZZ377VT004251  ');
    expect(vin.value).toBe('9BWZZZ377VT004251');
  });

  it('should throw an error when VIN is empty', () => {
    expect(() => new VinValueObject('')).toThrow('VIN cannot be empty');
  });

  it('should throw an error when VIN is null', () => {
    expect(() => new VinValueObject(null as any)).toThrow('VIN cannot be empty');
  });

  it('should throw an error when VIN is undefined', () => {
    expect(() => new VinValueObject(undefined as any)).toThrow('VIN cannot be empty');
  });

  it('should throw an error when VIN has less than 17 characters', () => {
    expect(() => new VinValueObject('9BWZZZ377VT00425')).toThrow('Invalid VIN format');
  });

  it('should throw an error when VIN has more than 17 characters', () => {
    expect(() => new VinValueObject('9BWZZZ377VT0042511')).toThrow('Invalid VIN format');
  });

  it('should throw an error when VIN contains letter I', () => {
    expect(() => new VinValueObject('9BWZZZ377VT00425I')).toThrow('Invalid VIN format');
  });

  it('should throw an error when VIN contains letter O', () => {
    expect(() => new VinValueObject('9BWZZZ377VT00425O')).toThrow('Invalid VIN format');
  });

  it('should throw an error when VIN contains letter Q', () => {
    expect(() => new VinValueObject('9BWZZZ377VT00425Q')).toThrow('Invalid VIN format');
  });

  it('should throw an error when VIN contains special characters', () => {
    expect(() => new VinValueObject('9BW-ZZ377VT004251')).toThrow('Invalid VIN format');
  });

  it('should throw an error when VIN contains spaces', () => {
    expect(() => new VinValueObject('9BWZZZ377VT 04251')).toThrow('Invalid VIN format');
  });

  it('should compare two VINs by value', () => {
    const vin1 = new VinValueObject('9BWZZZ377VT004251');
    const vin2 = new VinValueObject('9BWZZZ377VT004251');
    expect(vin1.equals(vin2)).toBe(true);
  });

  it('should return false when comparing different VINs', () => {
    const vin1 = new VinValueObject('9BWZZZ377VT004251');
    const vin2 = new VinValueObject('1HGCM82633A123456');
    expect(vin1.equals(vin2)).toBe(false);
  });

  it('should accept valid VIN with all allowed characters', () => {
    const vin = new VinValueObject('ABCDEFGHJKLMNPRST');
    expect(vin.value).toBe('ABCDEFGHJKLMNPRST');
  });
});

