import { MarketHistory } from '../../../../domain/market-history';
import { MarketHistoryEntity } from '../entities/market-history.entity';

export class MarketHistoryMapper {
  /**
   * 데이터베이스 엔터티를 도메인 객체로 변환
   */
  static toDomain(raw: MarketHistoryEntity): MarketHistory {
    const domainEntity = new MarketHistory();
    domainEntity.id = raw.id;
    domainEntity.marketId = raw.marketId; // ✅ UUID 매핑 추가
    domainEntity.outcome = raw.outcome;
    domainEntity.probability = raw.probability;
    domainEntity.timestamp = new Date(raw.timestamp); // ✅ Date 변환 추가
    return domainEntity;
  }

  /**
   * 도메인 객체를 데이터베이스 엔터티로 변환
   */
  static toPersistence(domainEntity: MarketHistory): MarketHistoryEntity {
    const persistenceEntity = new MarketHistoryEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.marketId = domainEntity.marketId; // ✅ UUID 매핑 추가
    persistenceEntity.outcome = domainEntity.outcome;
    persistenceEntity.probability = domainEntity.probability;
    persistenceEntity.timestamp = domainEntity.timestamp; // ✅ Date 객체 그대로 저장
    return persistenceEntity;
  }
}
