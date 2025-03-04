import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TradeEntity} from "./entities/trade.entity";
import {TradeRepository} from "../trade.repository";
import {TradeRelationalRepository} from "./repositories/trade.repository";

@Module({
  imports: [TypeOrmModule.forFeature([TradeEntity])],
  providers: [
    {
      provide: TradeRepository,
      useClass: TradeRelationalRepository,
    },
  ],
  exports: [TradeRepository],
})
export class RelationalTradePersistenceModule {}
