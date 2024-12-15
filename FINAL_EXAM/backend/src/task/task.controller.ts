import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      const result = await this.taskService.create(createTaskDto);
      return {
        message: 'Create new task successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const result = await this.taskService.findAll();
      return {
        message: 'Get all tasks successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.taskService.findOne(id);
      return {
        message: 'Get all actors successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const result = await this.taskService.update(id, updateTaskDto);
      return {
        message: 'Update task successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      const result = await this.taskService.remove(id);
      return {
        message: 'Remove task successfully',
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
