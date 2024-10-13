import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {
      const result = await this.actorService.findAll();
      return {
        message: 'Get all actors successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get actor by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the actor' })
  @ApiResponse({ status: 200, description: 'Actor details returned' })
  @ApiResponse({ status: 404, description: 'Actor not found' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.actorService.findOne(+id);
      return {
        message: 'Get actor successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new actor' })
  @ApiBody({
    description: 'Data required to create a new actor',
    type: CreateActorDto,
  })
  @ApiResponse({ status: 201, description: 'Actor created successfully' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() actor: CreateActorDto) {
    try {
      const result = await this.actorService.create(actor);
      return {
        message: 'Actor created successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an actor by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Actor ID' })
  @ApiBody({ description: 'Updated actor data', type: UpdateActorDto })
  @ApiResponse({ status: 200, description: 'Actor updated successfully' })
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() actor: UpdateActorDto) {
    try {
      const result = await this.actorService.update(+id, actor);
      return {
        message: 'Actor updated successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an actor by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Actor ID' })
  @ApiResponse({ status: 200, description: 'Actor deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      const result = await this.actorService.remove(+id);
      return {
        message: 'Actor deleted successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
}
