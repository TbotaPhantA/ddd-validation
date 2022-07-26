import { HttpException, HttpStatus } from '@nestjs/common';
import { Fail, FailResult } from '@derbent-ninjas/invariant-composer';
import { CANNOT_CREATE } from './constants';
import { display } from '../../../domain/shared/utils/display';

export class CannotCreateException extends HttpException {
  public readonly info: FailResult;

  constructor(canCreate: Fail, entityName: string) {
    super(CANNOT_CREATE(entityName), HttpStatus.BAD_REQUEST);

    this.info = display(canCreate);
  }
}
