import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from 'src/entities/actor.entity';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
