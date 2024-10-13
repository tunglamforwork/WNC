import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from 'src/entities/film.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    return await this.filmRepository.save(createFilmDto);
  }

  async findAll() {
    return await this.filmRepository.find();
  }

  async findOne(id: number) {
    const film = await this.filmRepository.findOneBy({ film_id: id });
    if (!film) {
      throw new NotFoundException({
        status: 404,
        message: `Film with ID ${id} does not exist`,
      });
    }

    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const existingFilm = await this.findOne(id);
    if (!existingFilm) {
      throw new NotFoundException({
        status: 404,
        message: `Film with ID ${id} does not exist`,
      });
    }
    await this.filmRepository.update(id, updateFilmDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const film = await this.findOne(id);
    if (!film) {
      throw new NotFoundException({
        status: 404,
        message: `Actor with ID ${id} not found`,
      });
    }
    return this.filmRepository.delete(id);
  }
}
