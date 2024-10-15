import { Module } from '@nestjs/common';
import { ActorsModule } from './actors/actors.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FilmModule } from './film/film.module';

@Module({
  imports: [DatabaseModule, ActorsModule, FilmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
