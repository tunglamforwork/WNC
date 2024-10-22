import { Module } from '@nestjs/common';
import { ActorsModule } from './actors/actors.module';
import { AppController } from './app.controller';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './database/database.module';
import { FilmModule } from './film/film.module';
import { LanguageModule } from './language/language.module';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    ActorsModule,
    FilmModule,
    CategoryModule,
    LanguageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
