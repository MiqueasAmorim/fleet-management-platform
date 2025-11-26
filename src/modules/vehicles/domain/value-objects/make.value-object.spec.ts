import { MakeValueObject } from "./make.value-object";

describe('MakeValueObject', () => {
  it('should create a valid make', () => {
    const make = new MakeValueObject('Volkswagen');
    expect(make.value).toBe('Volkswagen');
  });

  it('should trim whitespace from make', () => {
    const make = new MakeValueObject('  Volkswagen  ');
    expect(make.value).toBe('Volkswagen');
  });

  it('should create a make with long name', () => {
    const make = new MakeValueObject('A'.repeat(100));
    expect(make.value).toBe('A'.repeat(100));
  });

  it('should throw an error when make is empty', () => {
    expect(() => new MakeValueObject('')).toThrow('Make cannot be empty');
  });

  it('should throw an error when make is null', () => {
    expect(() => new MakeValueObject(null as any)).toThrow('Make cannot be empty');
  });

  it('should throw an error when make is undefined', () => {
    expect(() => new MakeValueObject(undefined as any)).toThrow('Make cannot be empty');
  });

  it('should throw an error when make is only whitespace', () => {
    expect(() => new MakeValueObject('   ')).toThrow('Invalid make');
  });

  it('should throw an error when make exceeds maximum length', () => {
    expect(() => new MakeValueObject('A'.repeat(101))).toThrow('Invalid make');
  });

  it('should compare two makes by value', () => {
    const make1 = new MakeValueObject('Volkswagen');
    const make2 = new MakeValueObject('Volkswagen');
    expect(make1.equals(make2)).toBe(true);
  });

  it('should return false when comparing different makes', () => {
    const make1 = new MakeValueObject('Volkswagen');
    const make2 = new MakeValueObject('Ford');
    expect(make1.equals(make2)).toBe(false);
  });
});

