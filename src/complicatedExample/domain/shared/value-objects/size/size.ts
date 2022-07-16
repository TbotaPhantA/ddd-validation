import { Height } from './height';
import { Width } from './width';

export class Size {
  readonly height: Height;

  readonly width: Width;

  constructor(height: Height, width: Width) {
    this.height = height;
    this.width = width;
  }
}
