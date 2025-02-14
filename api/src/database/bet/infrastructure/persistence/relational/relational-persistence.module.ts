import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {BetEntity} from "./entities/bet.entity";
import { BetRepository } from "../bet.repository";
import {BetRelationalRepository} from "./repositories/bet.repository";

@Module({
  imports: [TypeOrmModule.forFeature([BetEntity])],
  providers: [
    {
      provide: BetRepository,
      useClass: BetRelationalRepository,
    },
  ],
  exports: [BetRepository],
})
export class RelationalBetPersistenceModule {}
