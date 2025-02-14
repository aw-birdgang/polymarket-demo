import { Test, TestingModule } from '@nestjs/testing';
import { LiquidityController } from './liquidity.controller';

describe('LiquidityController', () => {
  let controller: LiquidityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiquidityController],
    }).compile();

    controller = module.get<LiquidityController>(LiquidityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
