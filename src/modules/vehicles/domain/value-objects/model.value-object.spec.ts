import { ModelValueObject } from "./model.value-object";

describe('ModelValueObject', () => {
  it('should create a valid model', () => {
    const model = new ModelValueObject('Gol');
    expect(model.value).toBe('Gol');
  });

  it('should trim whitespace from model', () => {
    const model = new ModelValueObject('  Gol  ');
    expect(model.value).toBe('Gol');
  });

  it('should create a model with long name', () => {
    const model = new ModelValueObject('A'.repeat(100));
    expect(model.value).toBe('A'.repeat(100));
  });

  it('should throw an error when model is empty', () => {
    expect(() => new ModelValueObject('')).toThrow('Model cannot be empty');
  });

  it('should throw an error when model is null', () => {
    expect(() => new ModelValueObject(null as any)).toThrow('Model cannot be empty');
  });

  it('should throw an error when model is undefined', () => {
    expect(() => new ModelValueObject(undefined as any)).toThrow('Model cannot be empty');
  });

  it('should throw an error when model is only whitespace', () => {
    expect(() => new ModelValueObject('   ')).toThrow('Invalid model');
  });

  it('should throw an error when model exceeds maximum length', () => {
    expect(() => new ModelValueObject('A'.repeat(101))).toThrow('Invalid model');
  });

  it('should compare two models by value', () => {
    const model1 = new ModelValueObject('Gol');
    const model2 = new ModelValueObject('Gol');
    expect(model1.equals(model2)).toBe(true);
  });

  it('should return false when comparing different models', () => {
    const model1 = new ModelValueObject('Gol');
    const model2 = new ModelValueObject('Polo');
    expect(model1.equals(model2)).toBe(false);
  });
});

