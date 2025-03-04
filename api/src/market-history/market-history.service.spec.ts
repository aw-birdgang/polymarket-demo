import { Test, TestingModule } from '@nestjs/testing';
import { MarketHistoryService } from './market-history.service';

describe('MarketHistoryService', () => {
  let service: MarketHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketHistoryService],
    }).compile();

    service = module.get<MarketHistoryService>(MarketHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
