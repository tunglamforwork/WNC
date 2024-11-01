import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
