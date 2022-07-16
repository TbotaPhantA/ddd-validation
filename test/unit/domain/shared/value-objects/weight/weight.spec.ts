import { Weight } from '../../../../../../src/complicatedExample/domain/shared';
import {
  UNKNOWN_WEIGHT_UNIT,
  WEIGHT_CANNOT_BE_NEGATIVE,
} from '../../../../../../src/complicatedExample/domain/shared/value-objects/weight/error-messages';
import { WeightUnitEnum } from '../../../../../../src/complicatedExample/domain/shared/value-objects/weight/enums/weight-unit.enum';

describe('Weight', () => {
  describe('constructor', () => {
    const notThrowsTestCases = [
      {
        toString: () => '50 kilograms - should create without error',
        weight: 50,
        unit: WeightUnitEnum.KG,
      },
    ];

    it.each(notThrowsTestCases)('%s', ({ weight, unit }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => new Weight(weight, unit)).not.toThrow();
    });

    const throwsTestCases = [
      {
        toString: () => '50 bananas - should throw and error',
        weight: 50,
        unit: 'bananas',
        errorMessage: UNKNOWN_WEIGHT_UNIT('bananas'),
      },
      {
        toString: () => '-1 kilograms - should throw and error',
        weight: -1,
        unit: WeightUnitEnum.KG,
        errorMessage: WEIGHT_CANNOT_BE_NEGATIVE,
      },
    ];

    it.each(throwsTestCases)('%s', ({ weight, unit, errorMessage }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => new Weight(weight, unit)).toThrow(errorMessage);
    });
  });
});
