import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async searchLogs(@Query('method') method?: string) {
    return await this.logService.searchLogs({
      method,
    });
  }
}
