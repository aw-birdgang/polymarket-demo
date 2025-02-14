import { Test, TestingModule } from '@nestjs/testing';
import { LiquidityService } from './liquidity.service';

describe('LiquidityService', () => {
  let service: LiquidityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiquidityService],
    }).compile();

    service = module.get<LiquidityService>(LiquidityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
