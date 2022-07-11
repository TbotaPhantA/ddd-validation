export class Weight {
  private readonly weightInKilograms: number;

  constructor(weightInCentimeters: number) {
    this.weightInKilograms = weightInCentimeters;
  }

  get kilograms() {
    return this.weightInKilograms;
  }
}
