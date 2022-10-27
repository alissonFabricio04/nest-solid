import { Test, TestingModule } from '@nestjs/testing';
import { TrasactionsService } from './trasactions.service';

describe('TrasactionsService', () => {
  let service: TrasactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrasactionsService],
    }).compile();

    service = module.get<TrasactionsService>(TrasactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
