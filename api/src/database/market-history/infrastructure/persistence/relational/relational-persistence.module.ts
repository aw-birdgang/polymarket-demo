import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MarketHistoryEntity} from "./entities/market-history.entity";
import {MarketHistoryRepository} from "../market-history.repository";
import {MarketHistoryRelationalRepository} from "./repositories/market-history.repository";

@Module({
  imports: [TypeOrmModule.forFeature([MarketHistoryEntity])],
  providers: [
    {
      provide: MarketHistoryRepository,
      useClass: MarketHistoryRelationalRepository,
    },
  ],
  exports: [MarketHistoryRepository],
})
export class RelationalMarketHistoryPersistenceModule {}
