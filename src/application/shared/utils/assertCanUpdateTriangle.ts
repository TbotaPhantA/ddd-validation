import {
  display,
  Invariant,
  isFail,
  path,
} from '@derbent-ninjas/invariant-composer';
import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../errors/application-exception';
import { CANNOT_UPDATE_TRIANGLE } from '../errors/constants';

export const assertCanUpdateTriangle = (canUpdate: Invariant): void => {
  path('triangle', canUpdate);

  if (isFail(canUpdate)) {
    throw new ApplicationException(
      CANNOT_UPDATE_TRIANGLE,
      HttpStatus.BAD_REQUEST,
      {
        ...display(canUpdate),
      },
    );
  }
}