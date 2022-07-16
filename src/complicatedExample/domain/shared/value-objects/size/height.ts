export class Height {
  private readonly heightInCentimeters: number;

  constructor(heightInCentimeters: number) {
    this.heightInCentimeters = heightInCentimeters;
  }

  get centimeters() {
    return this.heightInCentimeters;
  }
}
