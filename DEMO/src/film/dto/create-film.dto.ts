import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Features, Rating } from 'src/entities/film.entity';

export class CreateFilmDto {
  @ApiProperty({
    description: 'Title of film',
    example: 'The Terminator',
  })
  @IsNotEmpty({ message: 'Title of film is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  description: string;

  release_year: string;

  language_id: string;

  original_language_id: string;

  rental_duration: number;

  rental_rate: number;

  length: number;

  replacement_cost: number;

  rating: Rating;

  special_features: Features[];
}
