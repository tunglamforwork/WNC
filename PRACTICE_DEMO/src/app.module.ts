import { Module } from '@nestjs/common';
import { ActorsModule } from './actors/actors.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './database/database.module';
import { FilmModule } from './film/film.module';
import { LanguageModule } from './language/language.module';
import { LogModule } from './log/log.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogInterceptor } from './log/log.interceptor';

@Module({
  imports: [
    DatabaseModule,
    ActorsModule,
    FilmModule,
    CategoryModule,
    LanguageModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
})
export class AppModule {}
