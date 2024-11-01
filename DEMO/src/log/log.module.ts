import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
import { LogInterceptor } from './log.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [LogController],
  providers: [LogService, LogInterceptor],
  exports: [LogService],
})
export class LogModule {}
