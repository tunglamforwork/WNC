import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;
}
