export class MakeValueObject {
    public readonly value: string;

    constructor(value: string) {
        if (!value) {
            throw new Error('Make cannot be empty');
        }

        const normalized = value.trim();
        
        if (!MakeValueObject.isValid(normalized)) {
            throw new Error('Invalid make. Make cannot be empty');
        }
        
        this.value = normalized;
    }

    private static isValid(value: string): boolean {
        return value.length > 0 && value.length <= 100;
    }

    equals(other: MakeValueObject): boolean {
        return this.value === other.value;
    }
}

