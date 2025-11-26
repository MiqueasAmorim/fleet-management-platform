export class RenavamValueObject {
    public readonly value: string;
    private static readonly RENAVAM_REGEX = /^\d{11}$/;

    constructor(value: string) {
        if (!value) {
            throw new Error('RENAVAM cannot be empty');
        }

        const normalized = value.trim();
        
        if (!RenavamValueObject.isValid(normalized)) {
            throw new Error('Invalid RENAVAM format. Expected 11 digits');
        }
        
        this.value = normalized;
    }

    private static isValid(value: string): boolean {
        return RenavamValueObject.RENAVAM_REGEX.test(value);
    }

    equals(other: RenavamValueObject): boolean {
        return this.value === other.value;
    }
}

