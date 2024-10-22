import { ApiProperty } from '@nestjs/swagger';

export class CreateActorDto {
  @ApiProperty({
    description: 'First name of actor',
    example: 'John',
  })
  first_name: string;

  @ApiProperty({
    description: 'Last name of actor',
    example: 'Doe',
  })
  last_name: string;
}
