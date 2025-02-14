import {Market} from "../../../../domain/market";
import {MarketEntity} from "../entities/market.entity";

export class MarketMapper {
  static toDomain(raw: MarketEntity): Market {
    const domainEntity = new Market();
    domainEntity.id = raw.id;
    domainEntity.question = raw.question;
    domainEntity.endTime = raw.endTime;
    domainEntity.resolved = raw.resolved;
    domainEntity.outcome = raw.outcome
    return domainEntity;
  }

  static toPersistence(domainEntity: Market): MarketEntity {
    const persistenceEntity = new MarketEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.question = domainEntity.question;
    persistenceEntity.endTime = domainEntity.endTime;
    persistenceEntity.resolved = domainEntity.resolved;
    persistenceEntity.outcome = domainEntity.outcome;
    return persistenceEntity;
  }
}
