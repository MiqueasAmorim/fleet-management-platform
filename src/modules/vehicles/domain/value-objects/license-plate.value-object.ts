export class LicensePlateValueObject {
    public readonly value: string;
    private static readonly MERCOSUL_REGEX = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    private static readonly OLD_BR_REGEX = /^[A-Z]{3}[0-9]{4}$/;

    constructor(value: string) {
        if (!value) {
            throw new Error('License plate cannot be empty');
        }

        const normalized = value.toUpperCase().trim();
        if (!LicensePlateValueObject.isValid(normalized)) {
            throw new Error('Invalid license plate format. Expected AAA-1A23 or AAA1234');
        }
        this.value = normalized;
    }

    private static isValid(value: string): boolean {
        return (
            LicensePlateValueObject.MERCOSUL_REGEX.test(value) ||
            LicensePlateValueObject.OLD_BR_REGEX.test(value)
        );
    }

    equals(other: LicensePlateValueObject): boolean {
        return this.value === other.value;
    }
}

