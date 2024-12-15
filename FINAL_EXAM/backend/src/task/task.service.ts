import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.save(createTaskDto);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: string) {
    return await this.taskRepository.findOneBy({ id });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.preload({
      id,
      ...updateTaskDto,
    });

    if (!task) {
      throw new Error('Task not found');
    }

    await this.taskRepository.save(task);
    return task;
  }

  async remove(id: string) {
    return await this.taskRepository.delete(id);
  }
}
