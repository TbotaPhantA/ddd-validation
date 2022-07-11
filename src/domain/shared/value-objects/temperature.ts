export class Temperature {
  private readonly temperatureInCelsius: number;

  constructor(temperatureCelsius: number) {
    this.temperatureInCelsius = temperatureCelsius;
  }

  get celsius() {
    return this.temperatureInCelsius;
  }
}
