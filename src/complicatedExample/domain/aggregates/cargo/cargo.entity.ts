import { Parameters } from './value-objects';
import { Id, Size } from '../../shared';

export class Cargo {
  id: Id;

  size: Size;

  // TODO: create location field

  parameters: Parameters;
}
