import { Height } from './height/height';
import { Width } from './width/width';
import { invariants } from '../../utils/validation/invariants';
import { isLeft } from 'fp-ts/Either';
import { DomainError } from '../../errors/domainError';

export class Size {
  readonly height: Height;

  readonly width: Width;

  constructor(
    // TODO: accept objects which have the same structure as dto this parameter arrays are not very usable
    heightParams: ConstructorParameters<typeof Height>,
    widthParams: ConstructorParameters<typeof Width>,
  ) {
    const canCreate = Size.canCreate(heightParams, widthParams);

    if (isLeft(canCreate)) {
      throw new DomainError(canCreate.left.join(';\n'));
    }

    this.height = new Height(...heightParams);
    this.width = new Width(...widthParams);
  }

  public static canCreate(
    heightParams: ConstructorParameters<typeof Height>,
    widthParams: ConstructorParameters<typeof Width>,
  ) {
    return invariants(
      Height.canCreate(...heightParams),
      Width.canCreate(...widthParams),
    );
  }
}
