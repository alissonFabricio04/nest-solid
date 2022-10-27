import { Test, TestingModule } from '@nestjs/testing';
import { TrasactionsController } from './trasactions.controller';
import { TrasactionsService } from './trasactions.service';

describe('TrasactionsController', () => {
  let controller: TrasactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrasactionsController],
      providers: [TrasactionsService],
    }).compile();

    controller = module.get<TrasactionsController>(TrasactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
