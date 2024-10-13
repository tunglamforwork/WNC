import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@ApiTags('actors')
@Controller('actors')
export class ActorsController {
  constructor(private readonly actorService: ActorsService) {}
  @Get()
  @ApiOperation({ summary: 'Get all actors' })
  @ApiResponse({ status: 200, description: 'All actors data returned' })
  @ApiResponse({ status: 404, description: 'No actors data found' })
  findAll() {
    return this.actorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get actor by id' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the actor' })
  @ApiResponse({ status: 200, description: 'Actors detaisl returned' })
  @ApiResponse({ status: 404, description: 'Actor not found' })
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new actor' })
  @ApiBody({
    description: 'Data requried to create a new actor',
    type: CreateActorDto,
  })
  @ApiResponse({ status: 201, description: 'Actor created successfully' })
  create(@Body() actor: CreateActorDto) {
    return this.actorService.create(actor);
  }

  @Put(':id')
  @Put(':id')
  @ApiOperation({ summary: 'Update an actor by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Actor ID' })
  @ApiBody({ description: 'Updated actor data', type: UpdateActorDto })
  @ApiResponse({ status: 200, description: 'ACtor updated successfully' })
  update(@Param('id') id: string, @Body() actor: UpdateActorDto) {
    return this.actorService.update(+id, actor);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an actor by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Actor ID' })
  @ApiResponse({ status: 200, description: 'Actor deleted successfully' })
  remove(@Param('id') id: string) {
    return this.actorService.remove(+id);
  }
}
