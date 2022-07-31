import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApplicationException } from '../errors/application-exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    if (exception instanceof ApplicationException) {
      AllExceptionFilter.catchApplicationException(exception, host);
    } else if (exception instanceof HttpException) {
      AllExceptionFilter.catchHttpException(exception, host);
    } else {
      AllExceptionFilter.catchInternalServerError(exception);
    }
  }

  private static catchApplicationException(
    exception: ApplicationException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timeStamp: new Date().toISOString(),
      data: exception.data,
      path: request.url,
    });
  }

  private static catchHttpException(
    exception: HttpException,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private static catchInternalServerError(error: any): void {
    console.error(error);
    throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
  }
}
