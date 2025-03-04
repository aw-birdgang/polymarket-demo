import {EventEntity} from "../entities/event.entity";
import {Event} from "../../../../domain/event";
import {MarketMapper} from "../../../../../market/infrastructure/persistence/relational/mappers/market.mapper";
import {MarketEntity} from "../../../../../market/infrastructure/persistence/relational/entities/market.entity";

export class EventMapper {
  static toDomain(raw: EventEntity): Event {
    const domainEntity = new Event();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.description = raw.description;
    domainEntity.isResolved = raw.isResolved;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.markets = raw.markets?.map(MarketMapper.toDomain) || [];
    return domainEntity;
  }

  static toPersistence(domainEntity: Event): EventEntity {
    const persistenceEntity = new EventEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.isResolved = domainEntity.isResolved;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.markets = domainEntity.markets?.map((market) =>
        MarketMapper.toPersistence(market)
    ) as MarketEntity[];
    return persistenceEntity;
  }
}
