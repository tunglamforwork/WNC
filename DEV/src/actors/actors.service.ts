import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/entities/actor.entity';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async findAll() {
    return await this.actorRepository.find();
  }

  async findOne(id: number) {
    const actor = await this.actorRepository.findOneBy({ actor_id: id });
    if (!actor) {
      throw new NotFoundException({
        status: 404,
        message: `Actor with ID ${id} does not exist`,
      });
    }
    return actor;
  }

  async create(actor: CreateActorDto) {
    return await this.actorRepository.save(actor);
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    const existingActor = await this.findOne(id);
    if (!existingActor) {
      throw new NotFoundException({
        status: 404,
        message: `Actor with ID ${id} not found`,
      });
    }
    await this.actorRepository.update(id, updateActorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const actor = await this.findOne(id);
    if (!actor) {
      throw new NotFoundException({
        status: 404,
        message: `Actor with ID ${id} not found`,
      });
    }
    return this.actorRepository.delete(id);
  }
}
