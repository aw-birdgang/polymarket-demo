import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {WalletEntity} from "./entities/wallet.entity";
import {WalletRepository} from "../wallet.repository";
import {WalletRelationalRepository} from "./repositories/wallet.repository";

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity])],
  providers: [
    {
      provide: WalletRepository,
      useClass: WalletRelationalRepository,
    },
  ],
  exports: [WalletRepository],
})
export class RelationalWalletPersistenceModule {}
