import { Module } from '@nestjs/common';
import { ActorsController } from './actors/actors.controller';
import { ActorsModule } from './actors/actors.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FilmActorController } from './film_actor/film_actor.controller';
import { FilmActorService } from './film_actor/film_actor.service';

@Module({
  imports: [DatabaseModule, ActorsModule],
  controllers: [AppController, ActorsController, FilmActorController],
  providers: [AppService, FilmActorService],
})
export class AppModule {}