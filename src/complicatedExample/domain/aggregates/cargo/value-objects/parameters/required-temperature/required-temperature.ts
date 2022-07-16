import { Temperature } from '../../../../../shared';

export class RequiredTemperature {
  readonly minTemperature: Temperature;

  readonly maxTemperature: Temperature;

  constructor(minTemperature: Temperature, maxTemperature: Temperature) {
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
  }
}
