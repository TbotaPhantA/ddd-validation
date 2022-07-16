import { RequiredTemperature } from './required-temperature/required-temperature';
import { Weight } from '../../../../shared';

export class Parameters {
  readonly isFragile: boolean;

  readonly isExplosive: boolean;

  readonly requiredTemperature: RequiredTemperature;

  readonly isWaterproof: boolean;

  readonly isEvaporative: boolean;

  readonly weight: Weight;
}
