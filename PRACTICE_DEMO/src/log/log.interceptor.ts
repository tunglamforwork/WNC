import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LogService } from './log.service';
import { Request } from 'express';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const startTime = Date.now();

    return next.handle().pipe(
      tap((response) => {
        this.logService.log({
          method: request.method,
          endpoint: request.url,
          request: {
            body: request.body,
            query: request.query,
            params: request.params,
          },
          response,
          statusCode: context.switchToHttp().getResponse().statusCode,
          duration: Date.now() - startTime,
        });
      }),
      catchError((error) => {
        this.logService.log({
          method: request.method,
          endpoint: request.url,
          request: {
            body: request.body,
            query: request.query,
            params: request.params,
          },
          statusCode: error.status || 500,
          duration: Date.now() - startTime,
          error: error.message,
        });
        return throwError(() => error);
      }),
    );
  }
}
