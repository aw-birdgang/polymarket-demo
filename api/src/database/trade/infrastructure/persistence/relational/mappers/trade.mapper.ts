import {TradeEntity} from "../entities/trade.entity";
import {Trade} from "../../../../domain/trade";

export class TradeMapper {
  static toDomain(raw: TradeEntity): Trade {
    const domainEntity = new Trade();
    domainEntity.id = raw.id;
    domainEntity.userId = raw.userId;
    domainEntity.market = raw.market;
    domainEntity.tradeType = raw.tradeType;
    domainEntity.amount = raw.amount;
    return domainEntity;
  }

  static toPersistence(domainEntity: Trade): TradeEntity {
    const persistenceEntity = new TradeEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.market = domainEntity.market;
    persistenceEntity.tradeType = domainEntity.tradeType;
    persistenceEntity.amount = domainEntity.amount;
    return persistenceEntity;
  }
}
