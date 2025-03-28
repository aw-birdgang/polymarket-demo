import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {TransactionEntity} from "./entities/transaction.entity";
import { TransactionRepository } from "../transaction.repository";
import {TransactionRelationalRepository} from "./repositories/transaction.repository";

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [
    {
      provide: TransactionRepository,
      useClass: TransactionRelationalRepository,
    },
  ],
  exports: [TransactionRepository],
})
export class RelationalTransactionPersistenceModule {}
