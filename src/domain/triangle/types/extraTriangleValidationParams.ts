import { ExtraSidesValidationParams } from '../values-objects/sides';

export interface ExtraTriangleValidationParams {
  nameValidation: {
    isUnique: boolean;
  };
  sidesValidation: ExtraSidesValidationParams;
}
