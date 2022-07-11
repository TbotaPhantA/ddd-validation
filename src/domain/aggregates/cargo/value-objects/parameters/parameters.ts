import { RequiredTemperature } from './required-temperature';
import { Weight } from '../../../../shared';

export class Parameters {
  isFragile: boolean;

  isExplosive: boolean;

  requiredTemperature: RequiredTemperature;

  isWaterproof: boolean;

  isEvaporative: boolean;

  weight: Weight;
}
