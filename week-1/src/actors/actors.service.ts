import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/entities/actor.entity';
import { Repository } from 'typeorm';

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
  create(actor: Partial<Actor>) {
    return this.actorRepository.save(actor);
  }

  async update(id: number, actor: Partial<Actor>) {
    await this.actorRepository.update(id, actor);
    return this.findOne(id);
  }
  remove(id: number) {
    return this.actorRepository.delete(id);
  }
}
