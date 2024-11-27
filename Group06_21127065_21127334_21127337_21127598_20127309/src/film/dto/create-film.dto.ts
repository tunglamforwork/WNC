import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Features, Rating } from 'src/entities/film.entity';

export class CreateFilmDto {
  @ApiProperty({
    description: 'Title of the film',
    example: 'The Terminator',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Description of the film',
    example: 'Movie about robot destroying humanity',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    description: 'Film Release Year',
    example: '2004',
  })
  @IsString({ message: 'Release year must be a string' })
  @IsNotEmpty({ message: 'Release year is required' })
  release_year: string;

  @ApiProperty({
    description: 'Language ID from the Language table',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Language ID is required' })
  language_id: number;

  @ApiProperty({
    description: 'Original Language ID from the Language table (optional)',
    example: '2',
  })
  @IsOptional()
  @IsNumber()
  original_language_id?: number;

  @ApiProperty({
    description: 'Rental Duration in days',
    example: 3,
  })
  @IsOptional()
  @IsInt({ message: 'Rental duration must be an integer' })
  @Min(1, { message: 'Rental duration must be at least 1 day' })
  rental_duration?: number;

  @ApiProperty({
    description: 'Rental Rate in dollars',
    example: 4.99,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Rental rate must be a valid number' })
  @Min(0, { message: 'Rental rate cannot be negative' })
  rental_rate?: number;

  @ApiProperty({
    description: 'The length of the film in minutes',
    example: 120,
  })
  @IsInt({ message: 'Length must be an integer' })
  @Min(1, { message: 'Length must be at least 1 minute' })
  @IsNotEmpty({ message: 'Length is required' })
  length: number;

  @ApiProperty({
    description: 'Replacement cost in dollars (optional)',
    example: 19.99,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Replacement cost must be a valid number' })
  @Min(0, { message: 'Replacement cost cannot be negative' })
  replacement_cost?: number;

  @ApiProperty({
    description: 'Film rating (optional)',
    example: Rating.PG,
  })
  @IsOptional()
  @IsEnum(Rating, { message: 'Invalid rating value' })
  rating?: Rating;

  @ApiProperty({
    description: 'Special features of the film (optional)',
    example: [Features.COMMENTARIES],
  })
  @IsOptional()
  @IsArray({ message: 'Special features must be an array' })
  @IsEnum(Features, {
    each: true,
    message: 'Each feature must be a valid value',
  })
  special_features?: Features[];
}
