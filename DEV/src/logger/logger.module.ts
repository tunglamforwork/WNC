import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
