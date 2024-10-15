import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsNumber,
  IsString,
  IsEnum,
  IsArray,
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
    example: 'Movie about robot destroy humanity',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Film Release Year',
    example: '2004',
  })
  @IsNotEmpty({ message: 'Release year is required' })
  @IsString({ message: 'Release year must be a string' })
  release_year: string;

  @ApiProperty({
    description: 'Language ID in table Language',
    example: '1',
  })
  @IsNotEmpty({ message: 'Language ID is required' })
  @IsString({ message: 'Language ID must be a string' })
  language_id: string;

  @ApiProperty({
    description: 'Original Language ID in table Language',
    example: '1',
  })
  @IsOptional()
  @IsString({ message: 'Original Language ID must be a string' })
  original_language_id: string;

  @ApiProperty({
    description: 'Rental Duration',
    example: 3,
  })
  @IsOptional()
  @IsInt({ message: 'Rental duration must be an integer' })
  @Min(1, { message: 'Rental duration must be at least 1 day' })
  rental_duration?: number;

  @ApiProperty({
    description: 'Rental Rate',
    example: 4.99,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Rental rate must be a number' })
  @Min(0, { message: 'Rental rate cannot be negative' })
  rental_rate?: number;

  @ApiProperty({
    description: 'The length of the film',
    example: 120,
  })
  @IsNotEmpty({ message: 'Length is required' })
  @IsInt({ message: 'Length must be an integer' })
  @Min(1, { message: 'Length must be at least 1 minute' })
  length: number;

  @ApiProperty({
    description: 'Replacement Cost',
    example: 19.99,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Replacement cost must be a number' })
  @Min(0, { message: 'Replacement cost cannot be negative' })
  replacement_cost?: number;

  @ApiProperty({
    description: 'Film Rating',
    example: Rating.PG,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Rating is required' })
  @IsEnum(Rating, { message: 'Invalid rating value' })
  rating?: Rating;

  @ApiProperty({
    description: 'Film Special Features',
    example: [Features.COMMENTARIES],
  })
  @IsOptional()
  @IsArray({ message: 'Special features must be an array' })
  @IsEnum(Features, { each: true, message: 'Invalid feature value' })
  special_features?: Features[];
}
