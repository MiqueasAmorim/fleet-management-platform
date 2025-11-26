import { RenavamValueObject } from "./renavam.value-object";

describe('RenavamValueObject', () => {
  it('should create a valid RENAVAM', () => {
    const renavam = new RenavamValueObject('12345678901');
    expect(renavam.value).toBe('12345678901');
  });

  it('should trim whitespace from RENAVAM', () => {
    const renavam = new RenavamValueObject('  12345678901  ');
    expect(renavam.value).toBe('12345678901');
  });

  it('should throw an error when RENAVAM is empty', () => {
    expect(() => new RenavamValueObject('')).toThrow('RENAVAM cannot be empty');
  });

  it('should throw an error when RENAVAM is null', () => {
    expect(() => new RenavamValueObject(null as any)).toThrow('RENAVAM cannot be empty');
  });

  it('should throw an error when RENAVAM is undefined', () => {
    expect(() => new RenavamValueObject(undefined as any)).toThrow('RENAVAM cannot be empty');
  });

  it('should throw an error when RENAVAM has less than 11 digits', () => {
    expect(() => new RenavamValueObject('1234567890')).toThrow('Invalid RENAVAM format');
  });

  it('should throw an error when RENAVAM has more than 11 digits', () => {
    expect(() => new RenavamValueObject('123456789012')).toThrow('Invalid RENAVAM format');
  });

  it('should throw an error when RENAVAM contains letters', () => {
    expect(() => new RenavamValueObject('1234567890A')).toThrow('Invalid RENAVAM format');
  });

  it('should throw an error when RENAVAM contains special characters', () => {
    expect(() => new RenavamValueObject('123456789-1')).toThrow('Invalid RENAVAM format');
  });

  it('should compare two RENAVAMs by value', () => {
    const renavam1 = new RenavamValueObject('12345678901');
    const renavam2 = new RenavamValueObject('12345678901');
    expect(renavam1.equals(renavam2)).toBe(true);
  });

  it('should return false when comparing different RENAVAMs', () => {
    const renavam1 = new RenavamValueObject('12345678901');
    const renavam2 = new RenavamValueObject('98765432109');
    expect(renavam1.equals(renavam2)).toBe(false);
  });
});

