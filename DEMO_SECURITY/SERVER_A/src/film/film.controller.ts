import { Controller, Get } from '@nestjs/common';
import { FilmService } from './film.service';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  async findAll() {
    try {
      const result = await this.filmService.findAll();
      return {
        message: 'Get all films successfully',
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
