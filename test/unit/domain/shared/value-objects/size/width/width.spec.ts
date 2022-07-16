import { WidthUnitEnum } from '../../../../../../../src/complicatedExample/domain/shared/value-objects/size/width/width-unit.enum';
import {
  UNKNOWN_WIDTH_UNIT,
  WIDTH_CANNOT_BE_NEGATIVE,
} from '../../../../../../../src/complicatedExample/domain/shared/value-objects/size/width/error-messages';
import { Width } from '../../../../../../../src/complicatedExample/domain/shared/value-objects/size/width/width';

describe('Width', () => {
  describe('constructor', () => {
    const throwsTestCases = [
      {
        toString: () => '-100 cm - should throw an error',
        width: -100,
        unit: WidthUnitEnum.CM,
        errorMessage: WIDTH_CANNOT_BE_NEGATIVE,
      },
      {
        toString: () => '100 bananas - should throw an error',
        width: 100,
        unit: 'bananas',
        errorMessage: UNKNOWN_WIDTH_UNIT('bananas'),
      },
    ];

    test.each(throwsTestCases)('%s', ({ width, unit, errorMessage }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => new Width(width, unit)).toThrow(errorMessage);
    });
  });
});
