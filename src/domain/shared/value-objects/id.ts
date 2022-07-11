import { v4 as generateUUIDV4 } from 'uuid';

export class Id {
  readonly id: string;

  constructor() {
    this.id = generateUUIDV4();
  }
}
