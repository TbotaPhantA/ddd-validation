import {
  HEIGHT_CANNOT_BE_NEGATIVE,
  UNKNOWN_HEIGHT_UNIT,
} from '../../../../../../../src/complicatedExample/domain/shared/value-objects/size/height/error-messages';
import { HeightUnitEnum } from '../../../../../../../src/complicatedExample/domain/shared/value-objects/size/height/height-unit.enum';
import { Height } from '../../../../../../../src/complicatedExample/domain/shared';

describe('Height', () => {
  describe('constructor', () => {
    const throwsTestCases = [
      {
        toString: () => '-100 cm - should throw an error',
        height: -100,
        unit: HeightUnitEnum.CM,
        errorMessage: HEIGHT_CANNOT_BE_NEGATIVE,
      },
      {
        toString: () => '100 bananas - should throw an error',
        height: 100,
        unit: 'bananas',
        errorMessage: UNKNOWN_HEIGHT_UNIT('bananas'),
      },
    ];

    test.each(throwsTestCases)('%s', ({ height, unit, errorMessage }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => new Height(height, unit)).toThrow(errorMessage);
    });
  });
});
