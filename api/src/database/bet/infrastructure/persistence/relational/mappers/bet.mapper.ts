import {BetEntity} from "../entities/bet.entity";
import {Bet} from "../../../../domain/bet";

export class BetMapper {
  static toDomain(raw: BetEntity): Bet {
    const domainEntity = new Bet();
    domainEntity.id = raw.id;
    domainEntity.marketId = raw.marketId;
    domainEntity.userId = raw.userId;
    domainEntity.outcome = raw.outcome;
    domainEntity.amount = raw.amount;
    return domainEntity;
  }

  static toPersistence(domainEntity: Bet): BetEntity {
    const persistenceEntity = new BetEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.marketId = domainEntity.marketId;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.outcome = domainEntity.outcome;
    persistenceEntity.amount = domainEntity.amount;
    return persistenceEntity;
  }
}
