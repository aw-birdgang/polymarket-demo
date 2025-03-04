import {MarketHistory} from "../../../../domain/market-history";
import {MarketHistoryEntity} from "../entities/market-history.entity";

export class MarketHistoryMapper {
  /**
   * 데이터베이스 엔터티를 도메인 객체로 변환
   */
  static toDomain(raw: MarketHistoryEntity): MarketHistory {
    const domainEntity = new MarketHistory();
    domainEntity.id = raw.id;
    return domainEntity;
  }

  /**
   * 도메인 객체를 데이터베이스 엔터티로 변환
   */
  static toPersistence(domainEntity: MarketHistory): MarketHistoryEntity {
    const persistenceEntity = new MarketHistoryEntity();
    persistenceEntity.id = domainEntity.id;
    return persistenceEntity;
  }
}
