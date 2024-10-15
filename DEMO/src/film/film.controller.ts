import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FilmService } from './film.service';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new film' })
  @ApiBody({
    description: 'Required fields to create a new film',
    type: CreateFilmDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Film created successfully',
  })
  create(@Body() createFilmDto: CreateFilmDto) {
    try {
      const result = this.filmService.create(createFilmDto);

      return {
        data: result,
        message: 'Film created successfully',
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get film details' })
  @ApiParam({ name: 'id', description: 'ID of film' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Film details returned' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Film details not found',
  })
  findOne(@Param('id') id: string) {
    try {
      const result = this.filmService.findOne(+id);
      return {
        data: result,
        message: 'Film details get successfully',
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmService.remove(+id);
  }
}
