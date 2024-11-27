import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/entities/film.entity';
import { FilmActor } from 'src/entities/film_actor.entity';
import { FilmCategory } from 'src/entities/film_category.entity';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film, FilmActor, FilmCategory])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
