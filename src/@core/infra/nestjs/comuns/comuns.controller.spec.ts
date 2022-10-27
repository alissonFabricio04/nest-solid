import { Test, TestingModule } from '@nestjs/testing';
import { ComunsController } from './comuns.controller';
import { ComunsService } from './comuns.service';

describe('ComunController', () => {
  let controller: ComunsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComunsController],
      providers: [ComunsService],
    }).compile();

    controller = module.get<ComunsController>(ComunsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
