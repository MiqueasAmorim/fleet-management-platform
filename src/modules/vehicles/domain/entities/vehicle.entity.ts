import { VinValueObject } from '../value-objects/vin.value-object';
import { LicensePlateValueObject } from '../value-objects/license-plate.value-object';
import { RenavamValueObject } from '../value-objects/renavam.value-object';
import { ModelValueObject } from '../value-objects/model.value-object';
import { MakeValueObject } from '../value-objects/make.value-object';
import { ModelYearValueObject } from '../value-objects/model-year.value-object';

export interface CreateVehicleParams {
    id: string;
    licensePlate: string;
    vin: string;
    renavam: string;
    model: string;
    make: string;
    modelYear: number;
}

export class VehicleEntity {
    private constructor(
        private readonly _id: string,
        private _licensePlate: LicensePlateValueObject,
        private _vin: VinValueObject,
        private _renavam: RenavamValueObject,
        private _model: ModelValueObject,
        private _make: MakeValueObject,
        private _modelYear: ModelYearValueObject,
    ) {
        this.validate();
    }

    static create(params: CreateVehicleParams): VehicleEntity {
        return new VehicleEntity(
            params.id,
            new LicensePlateValueObject(params.licensePlate),
            new VinValueObject(params.vin),
            new RenavamValueObject(params.renavam),
            new ModelValueObject(params.model),
            new MakeValueObject(params.make),
            new ModelYearValueObject(params.modelYear),
        );
    }

    private validate(): void {
        if (!this._id) throw new Error('Vehicle ID is required');
        if (!this._licensePlate) throw new Error('License plate is required');
        if (!this._vin) throw new Error('VIN is required');
        if (!this._renavam) throw new Error('RENAVAM is required');
        if (!this._model) throw new Error('Model is required');
        if (!this._make) throw new Error('Make is required');
        if (!this._modelYear) throw new Error('Model year is required');
    }

    get id(): string {
        return this._id;
    }

    get licensePlate(): LicensePlateValueObject {
        return this._licensePlate;
    }

    get vin(): VinValueObject {
        return this._vin;
    }

    get renavam(): RenavamValueObject {
        return this._renavam;
    }

    get model(): ModelValueObject {
        return this._model;
    }

    get make(): MakeValueObject {
        return this._make;
    }

    get modelYear(): ModelYearValueObject {
        return this._modelYear;
    }
}
