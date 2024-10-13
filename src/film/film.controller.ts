import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('film')
@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Post()
  @ApiOperation({ summary: 'Create new film' })
  @ApiBody({
    description: 'Data required to create a new film',
    type: CreateFilmDto,
  })
  @ApiResponse({ status: 201, description: 'Film created successfully' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createFilmDto: CreateFilmDto) {
    try {
      const result = await this.filmService.create(createFilmDto);
      return {
        message: 'Film created successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get film by id' })
  @ApiResponse({ status: 200, description: 'Films data returned' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {
      const result = await this.filmService.findAll();
      return {
        data: result,
        message: 'Get all films successfully',
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get film by id' })
  @ApiParam({ name: 'id', description: 'The id of film' })
  @ApiResponse({ status: 200, description: 'Film details returned' })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.filmService.findOne(+id);
      return {
        data: result,
        message: 'Get film successfully',
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Delete a film by id' })
  @ApiParam({ name: 'id', description: 'The film id' })
  @ApiBody({ description: 'Updated film data', type: UpdateFilmDto })
  @ApiResponse({ status: 200, description: 'Film updated successfully' })
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    try {
      const result = await this.filmService.update(+id, updateFilmDto);
      return {
        data: result,
        message: 'Film udpated successfully',
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a film by id' })
  @ApiParam({ name: 'id', description: 'The film id' })
  @ApiResponse({ status: 200, description: 'Film deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      const result = await this.filmService.remove(+id);
      return {
        data: result,
        message: 'Film deleted successully',
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
}
