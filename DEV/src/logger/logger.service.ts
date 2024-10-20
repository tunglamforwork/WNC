import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as cron from 'node-cron';
import { Log } from 'src/entities/log.entity';
import { Between, LessThan, Repository } from 'typeorm';

interface LogRequest {
  type: 'REQUEST';
  method: string;
  path: string;
  userAgent: string;
  ip: string;
  queryParams: any;
  body: any;
}

interface LogResponse {
  type: 'RESPONSE';
  method: string;
  path: string;
  statusCode: number;
  body: any;
}

@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);
  private readonly logRetentionDays = 30;

  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {
    this.setupLogRotation();
  }

  private setupLogRotation() {
    cron.schedule('0 0 * * *', async () => {
      try {
        const retentionDate = new Date();
        retentionDate.setDate(retentionDate.getDate() - this.logRetentionDays);

        // Delete logs older than retentionDate
        const result = await this.logRepository.delete({
          timestamp: LessThan(retentionDate),
        });

        this.logger.log(`Deleted ${result.affected} old log entries.`);
      } catch (error) {
        this.logger.error(`Failed to delete old log entries: ${error.message}`);
      }

      this.logger.log('Log rotation scheduled');
    });
  }

  async logRequest({
    type,
    method,
    path,
    userAgent,
    ip,
    queryParams,
    body,
  }: LogRequest) {
    const logMessage = {
      method,
      path,
      userAgent,
      ip,
      queryParams,
      body,
    };
    await this.log(type, logMessage, path);
  }

  async logResponse({ type, method, path, statusCode, body }: LogResponse) {
    const logMessage = {
      method,
      path,
      body,
    };
    await this.log(type, logMessage, path, statusCode);
  }

  private async log(
    type: 'REQUEST' | 'RESPONSE',
    message: any,
    path: string,
    statusCode?: number,
  ) {
    const logEntry = this.logRepository.create({
      type,
      timestamp: new Date(),
      status_code: statusCode,
      data: message,
      path,
    });

    try {
      await this.logRepository.save(logEntry);
      this.logger.log(`Logged ${type} entry: ${JSON.stringify(message)}`);
    } catch (error) {
      this.logger.error(`Failed to log entry to database: ${error.message}`);
    }
  }

  async searchLogs(criteria: Partial<Log>): Promise<Log[]> {
    return this.logRepository.find({ where: criteria });
  }

  async getLogsBetweenDates(startDate: Date, endDate: Date): Promise<Log[]> {
    return this.logRepository.find({
      where: {
        timestamp: Between(startDate, endDate),
      },
    });
  }
}
