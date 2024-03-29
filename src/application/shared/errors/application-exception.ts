import { HttpException } from '@nestjs/common';

export class ApplicationException extends HttpException {
  public readonly data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message, status);

    this.data = data;
  }
}
