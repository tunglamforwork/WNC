import { Test, TestingModule } from '@nestjs/testing';
import { FilmActorController } from './film_actor.controller';

describe('FilmActorController', () => {
  let controller: FilmActorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmActorController],
    }).compile();

    controller = module.get<FilmActorController>(FilmActorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
