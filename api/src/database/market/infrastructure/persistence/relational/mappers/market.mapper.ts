import {Market} from "../../../../domain/market";
import {MarketEntity} from "../entities/market.entity";

export class MarketMapper {
  /**
   * 데이터베이스 엔터티를 도메인 객체로 변환
   */
  static toDomain(raw: MarketEntity): Market {
    const domainEntity = new Market();
    domainEntity.id = raw.id;
    domainEntity.question = raw.question;
    domainEntity.type = raw.type;
    domainEntity.outcomes = raw.outcomes;
    domainEntity.yesOdds = raw.yesOdds;
    domainEntity.noOdds = raw.noOdds;
    domainEntity.outcomeOdds = raw.outcomeOdds;
    domainEntity.isResolved = raw.isResolved;
    domainEntity.resolvedOutcome = raw.resolvedOutcome;
    domainEntity.openTime = raw.openTime;
    domainEntity.closeTime = raw.closeTime;
    domainEntity.eventId = raw.event ? raw.event.id : null;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  /**
   * 도메인 객체를 데이터베이스 엔터티로 변환
   */
  static toPersistence(domainEntity: Market): MarketEntity {
    const persistenceEntity = new MarketEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.question = domainEntity.question;
    persistenceEntity.type = domainEntity.type;
    persistenceEntity.outcomes = domainEntity.outcomes;
    persistenceEntity.yesOdds = domainEntity.yesOdds;
    persistenceEntity.noOdds = domainEntity.noOdds;
    persistenceEntity.outcomeOdds = domainEntity.outcomeOdds;
    persistenceEntity.isResolved = domainEntity.isResolved;
    persistenceEntity.resolvedOutcome = domainEntity.resolvedOutcome;
    persistenceEntity.openTime = domainEntity.openTime;
    persistenceEntity.closeTime = domainEntity.closeTime;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
