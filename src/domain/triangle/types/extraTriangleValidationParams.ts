import { ExtraSidesValidationParams } from '../values-objects/sides';

export interface ExtraTriangleValidationParams {
  nameData: {
    isUnique: boolean;
  };
  sidesData: ExtraSidesValidationParams;
}
