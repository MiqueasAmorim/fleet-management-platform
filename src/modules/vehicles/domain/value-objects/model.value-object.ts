export class ModelValueObject {
    public readonly value: string;

    constructor(value: string) {
        if (!value) {
            throw new Error('Model cannot be empty');
        }

        const normalized = value.trim();
        
        if (!ModelValueObject.isValid(normalized)) {
            throw new Error('Invalid model. Model cannot be empty');
        }
        
        this.value = normalized;
    }

    private static isValid(value: string): boolean {
        return value.length > 0 && value.length <= 100;
    }

    equals(other: ModelValueObject): boolean {
        return this.value === other.value;
    }
}

