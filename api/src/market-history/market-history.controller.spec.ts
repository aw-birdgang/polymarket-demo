import { Test, TestingModule } from '@nestjs/testing';
import { MarketHistoryController } from './market-history.controller';

describe('MarketHistoryController', () => {
  let controller: MarketHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketHistoryController],
    }).compile();

    controller = module.get<MarketHistoryController>(MarketHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
