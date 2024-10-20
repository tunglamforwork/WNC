import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ActorsModule } from './actors/actors.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './database/database.module';
import { FilmModule } from './film/film.module';
import { LanguageModule } from './language/language.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    DatabaseModule,
    ActorsModule,
    FilmModule,
    CategoryModule,
    LanguageModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
