export class VinValueObject {
    public readonly value: string;
    private static readonly VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/;

    constructor(value: string) {
        if (!value) {
            throw new Error('VIN cannot be empty');
        }

        const normalized = value.toUpperCase().trim();
        
        if (!VinValueObject.isValid(normalized)) {
            throw new Error('Invalid VIN format. Expected 17 alphanumeric characters (excluding I, O, Q)');
        }
        
        this.value = normalized;
    }

    private static isValid(value: string): boolean {
        return VinValueObject.VIN_REGEX.test(value);
    }

    equals(other: VinValueObject): boolean {
        return this.value === other.value;
    }
}

