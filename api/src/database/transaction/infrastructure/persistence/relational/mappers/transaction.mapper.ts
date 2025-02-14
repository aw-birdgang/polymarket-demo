import {Transaction} from "../../../../domain/transaction";
import {TransactionEntity} from "../entities/transaction.entity";

export class TransactionMapper {
  static toDomain(raw: TransactionEntity): Transaction {
    const domainEntity = new Transaction();
    domainEntity.id = raw.id;
    domainEntity.userId = raw.userId;
    domainEntity.amount = raw.amount;
    domainEntity.type = raw.type;
    domainEntity.createdAt = raw.createdAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Transaction): TransactionEntity {
    const persistenceEntity = new TransactionEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.amount = domainEntity.amount;
    persistenceEntity.type = domainEntity.type;
    persistenceEntity.createdAt = domainEntity.createdAt;
    return persistenceEntity;
  }
}
