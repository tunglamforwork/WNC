import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Actor } from 'src/entities/actor.entity';
import { ActorsService } from './actors.service';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorService: ActorsService) {}
  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(+id);
  }

  @Post()
  create(@Body() actor: Partial<Actor>) {
    return this.actorService.create(actor);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() actor: Partial<Actor>) {
    return this.actorService.update(+id, actor);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorService.remove(+id);
  }
}
