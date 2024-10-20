import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from './logger.service';

@Controller('logger')
@ApiTags('logs')
export class LoggerController {
  constructor(private readonly logger: LoggerService) {}

  @Get('search')
  async searchLogs(
    @Query('type') type?: 'REQUEST' | 'RESPONSE',
    @Query('method') method?: string,
    @Query('url') url?: string,
    @Query('statusCode') statusCode?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const searchCriteria: any = {};

    if (type) searchCriteria.type = type;
    if (method) searchCriteria.method = method;
    if (url) searchCriteria.url = url;
    if (statusCode)
      searchCriteria.status_code = parseInt(statusCode.toString(), 10);

    let results;

    if (startDate && endDate) {
      results = await this.logger.getLogsBetweenDates(
        new Date(startDate),
        new Date(endDate),
      );
    } else {
      results = await this.logger.searchLogs(searchCriteria);
    }

    return results;
  }
}
