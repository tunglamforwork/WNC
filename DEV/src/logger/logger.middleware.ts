import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, query: queryParams, baseUrl: path } = req;

    const userAgent = req.get('user-agent') || '';

    // Log request
    this.logger.logRequest({
      type: 'REQUEST',
      method,
      path,
      userAgent,
      ip,
      queryParams,
      body: req.body,
    });

    // extracting response's body
    let body = {};
    const chunks = [];
    const oldEnd = res.end;
    res.end = (chunk) => {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      body = Buffer.concat(chunks).toString('utf8');
      return oldEnd.call(res, body);
    };

    // Log response
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.logResponse({
        type: 'RESPONSE',
        method,
        path,
        statusCode: statusCode,
        body,
      });
    });

    next();
  }
}
