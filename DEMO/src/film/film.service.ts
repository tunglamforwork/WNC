import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/entities/film.entity';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}
  create(createFilmDto: CreateFilmDto) {
    const newFilm = this.filmRepository.create(createFilmDto);
    if (!newFilm) {
      throw new BadRequestException('Failed to create new film');
    }

    return this.filmRepository.save(newFilm);
  }

  findAll() {
    return `This action returns all film`;
  }

  findOne(id: number) {
    const film = this.filmRepository.findOneBy({ film_id: id });
    if (!film) {
      throw new NotFoundException(`Film with id: ${id} not found`);
    }

    return film;
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
