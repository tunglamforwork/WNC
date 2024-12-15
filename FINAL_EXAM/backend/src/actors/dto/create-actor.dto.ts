import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActorDto {
  @ApiProperty({
    description: 'First name of actor',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Last name of actor',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;
}
