import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {MarketEntity} from "./entities/market.entity";
import { MarketRepository } from "../market.repository";
import {MarketRelationalRepository} from "./repositories/market.repository";

@Module({
  imports: [TypeOrmModule.forFeature([MarketEntity])],
  providers: [
    {
      provide: MarketRepository,
      useClass: MarketRelationalRepository,
    },
  ],
  exports: [MarketRepository],
})
export class RelationalMarketPersistenceModule {}
