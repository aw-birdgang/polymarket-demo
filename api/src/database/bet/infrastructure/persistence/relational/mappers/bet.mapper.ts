import {BetEntity} from "../entities/bet.entity";
import {Bet} from "../../../../domain/bet";

export class BetMapper {
  /**
   * 데이터베이스 엔터티를 도메인 객체로 변환
   */
  static toDomain(raw: BetEntity): Bet {
    const domainEntity = new Bet();
    domainEntity.id = raw.id;
    domainEntity.userId = raw.userId;
    domainEntity.marketId = raw.marketId;
    domainEntity.betAmount = raw.betAmount;
    domainEntity.betOn = raw.betOn;
    domainEntity.createdAt = raw.createdAt;
    return domainEntity;
  }

  /**
   * 도메인 객체를 데이터베이스 엔터티로 변환
   */
  static toPersistence(domainEntity: Bet): BetEntity {
    const persistenceEntity = new BetEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.marketId = domainEntity.marketId;
    persistenceEntity.betAmount = domainEntity.betAmount;
    persistenceEntity.betOn = domainEntity.betOn;
    persistenceEntity.createdAt = domainEntity.createdAt;

    return persistenceEntity;
  }
}
