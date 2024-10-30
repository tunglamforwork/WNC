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
          statusCode: context.switchToHttp().getResponse().statusCode,
          request: {
            body: JSON.stringify(request.body),
            query: request.query,
            params: request.params,
          },
          response,
          duration: Date.now() - startTime,
        });
      }),
      catchError((err) => {
        this.logService.log({
          method: request.method,
          endpoint: request.url,
          statusCode: context.switchToHttp().getResponse().statusCode,
          error: err,
          duration: Date.now() - startTime,
        });
        return throwError(() => err);
      }),
    );
  }
}
