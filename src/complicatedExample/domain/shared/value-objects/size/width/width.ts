export class Width {
  private readonly widthInCentimeters: number;

  constructor(widthInCentimeters: number) {
    this.widthInCentimeters = widthInCentimeters;
  }

  get centimeters() {
    return this.widthInCentimeters;
  }
}
