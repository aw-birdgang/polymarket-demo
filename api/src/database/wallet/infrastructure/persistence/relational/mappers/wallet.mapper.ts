import {Wallet} from "../../../../domain/wallet";
import {WalletEntity} from "../entities/wallet.entity";

export class WalletMapper {
  static toDomain(raw: WalletEntity): Wallet {
    const domainEntity = new Wallet();
    domainEntity.id = raw.id;
    domainEntity.balance = raw.balance;
    domainEntity.userId = raw.userId;
    return domainEntity;
  }

  static toPersistence(domainEntity: Wallet): WalletEntity {
    const persistenceEntity = new WalletEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.balance = domainEntity.balance;
    persistenceEntity.userId = persistenceEntity.userId;
    return persistenceEntity;
  }
}
