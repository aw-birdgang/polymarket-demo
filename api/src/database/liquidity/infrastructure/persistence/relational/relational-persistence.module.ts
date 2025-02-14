import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LiquidityEntity} from "./entities/liquidity.entity";
import {LiquidityRepository} from "../liquidity.repository";
import {LiquidityRelationalRepository} from "./repositories/liquidity.repository";

@Module({
  imports: [TypeOrmModule.forFeature([LiquidityEntity])],
  providers: [
    {
      provide: LiquidityRepository,
      useClass: LiquidityRelationalRepository,
    },
  ],
  exports: [LiquidityRepository],
})
export class RelationalLiquidityPersistenceModule {}
