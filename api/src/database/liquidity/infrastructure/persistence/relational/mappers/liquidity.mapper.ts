import {Liquidity} from "../../../../domain/liquidity";
import {LiquidityEntity} from "../entities/liquidity.entity";

export class LiquidityMapper {
  static toDomain(raw: LiquidityEntity): Liquidity {
    const domainEntity = new Liquidity();
    domainEntity.id = raw.id;
    domainEntity.userId = raw.userId;
    domainEntity.marketId = raw.marketId;
    domainEntity.amount = raw.amount;
    return domainEntity;
  }

  static toPersistence(domainEntity: Liquidity): LiquidityEntity {
    const persistenceEntity = new LiquidityEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.marketId = domainEntity.marketId;
    persistenceEntity.amount = domainEntity.amount;
    return persistenceEntity;
  }
}
