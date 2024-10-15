import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof BadRequestException) {
      const exceptionResponse: any = exception.getResponse();
      const validationErrors = exceptionResponse.message;

      response.status(status).json({
        statusCode: status,
        message: 'Validation failed',
        errors: validationErrors,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
