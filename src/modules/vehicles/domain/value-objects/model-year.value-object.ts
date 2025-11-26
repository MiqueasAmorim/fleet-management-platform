export class ModelYearValueObject {
    public readonly value: number;
    private static readonly MIN_YEAR = 1900;
    private static readonly MAX_YEAR = new Date().getFullYear() + 1;

    constructor(value: number) {
        if (!ModelYearValueObject.isValid(value)) {
            throw new Error(
                `Invalid model year. Expected a year between ${ModelYearValueObject.MIN_YEAR} and ${ModelYearValueObject.MAX_YEAR}`
            );
        }
        
        this.value = value;
    }

    private static isValid(value: number): boolean {
        return (
            typeof value === 'number' &&
            !isNaN(value) &&
            Number.isInteger(value) &&
            value >= ModelYearValueObject.MIN_YEAR &&
            value <= ModelYearValueObject.MAX_YEAR
        );
    }

    equals(other: ModelYearValueObject): boolean {
        return this.value === other.value;
    }
}

