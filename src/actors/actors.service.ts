import { Injectable } from '@nestjs/common';
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
  findAll() {
    return this.actorRepository.find();
  }

  findOne(id: number) {
    return this.actorRepository.findOneBy({ actor_id: id });
  }
  create(actor: CreateActorDto) {
    return this.actorRepository.save(actor);
  }

  async update(id: number, actor: UpdateActorDto) {
    await this.actorRepository.update(id, actor);
    return this.findOne(id);
  }
  remove(id: number) {
    return this.actorRepository.delete(id);
  }
}
