import { ModelYearValueObject } from "./model-year.value-object";

describe('ModelYearValueObject', () => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 1;

  it('should create a valid model year', () => {
    const modelYear = new ModelYearValueObject(2020);
    expect(modelYear.value).toBe(2020);
  });

  it('should create a model year with minimum value', () => {
    const modelYear = new ModelYearValueObject(1900);
    expect(modelYear.value).toBe(1900);
  });

  it('should create a model year with maximum value', () => {
    const modelYear = new ModelYearValueObject(maxYear);
    expect(modelYear.value).toBe(maxYear);
  });

  it('should create a model year with current year', () => {
    const modelYear = new ModelYearValueObject(currentYear);
    expect(modelYear.value).toBe(currentYear);
  });

  it('should throw an error when model year is less than 1900', () => {
    expect(() => new ModelYearValueObject(1899)).toThrow('Invalid model year');
  });

  it('should throw an error when model year is greater than maximum', () => {
    expect(() => new ModelYearValueObject(maxYear + 1)).toThrow('Invalid model year');
  });

  it('should throw an error when model year is not a number', () => {
    expect(() => new ModelYearValueObject('2020' as any)).toThrow('Invalid model year');
  });

  it('should throw an error when model year is NaN', () => {
    expect(() => new ModelYearValueObject(NaN)).toThrow('Invalid model year');
  });

  it('should throw an error when model year is a float', () => {
    expect(() => new ModelYearValueObject(2020.5)).toThrow('Invalid model year');
  });

  it('should compare two model years by value', () => {
    const modelYear1 = new ModelYearValueObject(2020);
    const modelYear2 = new ModelYearValueObject(2020);
    expect(modelYear1.equals(modelYear2)).toBe(true);
  });

  it('should return false when comparing different model years', () => {
    const modelYear1 = new ModelYearValueObject(2020);
    const modelYear2 = new ModelYearValueObject(2021);
    expect(modelYear1.equals(modelYear2)).toBe(false);
  });
});

