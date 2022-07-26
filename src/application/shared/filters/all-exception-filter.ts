import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CannotCreateException } from '../errors/cannotCreateException';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    if (exception instanceof HttpException) {
      this.catchHttpException(exception, host);
    } else {
      this.catchInternalServerError(exception, host);
    }
  }

  private catchHttpException(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof CannotCreateException) {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        timeStamp: new Date().toISOString(),
        info: exception.info,
        path: request.url,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        timeStamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }

  private catchInternalServerError(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
