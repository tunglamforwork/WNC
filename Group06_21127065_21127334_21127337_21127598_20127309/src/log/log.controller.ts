import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  // search logs
  @Get()
  async searchLogs(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('method') method?: string,
    @Query('endpoint') endpoint?: string,
    @Query('statusCode') statusCode?: number,
    @Query('hasError') hasError?: boolean,
  ) {
    return this.logService.searchLogs({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: startDate ? new Date(endDate) : undefined,
      method,
      endpoint,
      statusCode,
      hasError,
    });
  }
}
