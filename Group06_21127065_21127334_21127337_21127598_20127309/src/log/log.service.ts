import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
import { Repository } from 'typeorm';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LogService {
  private logger: winston.Logger;

  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),

        new DailyRotateFile({
          filename: 'logs/app-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),

        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20mb',
          maxFiles: '30d',
          level: 'error',
        }),
      ],
    });
  }

  async log(data: {
    method: string;
    endpoint: string;
    request?: any;
    response?: any;
    statusCode: number;
    duration: number;
    error?: string;
  }) {
    const sanitizedData = {
      ...data,
      request: data.request ? JSON.stringify(data.request) : null,
      response: data.response ? JSON.stringify(data.response) : null,
    };
    await this.logRepository.save(sanitizedData);
    const logMethod = data.statusCode >= 400 ? 'error' : 'info';
    this.logger[logMethod]({
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  async searchLogs(filters: {
    startDate?: Date;
    endDate?: Date;
    method?: string;
    endpoint?: string;
    statusCode?: number;
    hasError?: boolean;
  }) {
    const query = this.logRepository.createQueryBuilder('logs');
    if (filters.startDate && filters.endDate) {
      query.andWhere('logs.timestamp BETWEEN :startDate and :endDate', {
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
    }

    if (filters.method) {
      query.andWhere('logs.method = :method', { method: filters.method });
    }

    if (filters.endpoint) {
      query.andWhere('logs.endpoint LIKE :endpoint', {
        endpoint: `%${filters.endpoint}%`,
      });
    }

    if (filters.statusCode) {
      query.andWhere('logs.statusCode = :statusCode', {
        statusCode: filters.statusCode,
      });
    }

    if (filters.hasError) {
      query.andWhere('logs.error IS NOT NULL');
    }

    return query.orderBy('logs.timestamp', 'DESC').getMany();
  }
}
