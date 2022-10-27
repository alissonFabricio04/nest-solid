import { Test, TestingModule } from '@nestjs/testing';
import { ComunsService } from './comuns.service';

describe('ComunService', () => {
  let service: ComunsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComunsService],
    }).compile();

    service = module.get<ComunsService>(ComunsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
