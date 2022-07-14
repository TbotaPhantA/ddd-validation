export class DomainError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, DomainError.prototype);
  }
}
