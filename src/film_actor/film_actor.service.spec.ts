import { Test, TestingModule } from '@nestjs/testing';
import { FilmActorService } from './film_actor.service';

describe('FilmActorService', () => {
  let service: FilmActorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmActorService],
    }).compile();

    service = module.get<FilmActorService>(FilmActorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
