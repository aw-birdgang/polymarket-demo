import {Comment} from "../../../../domain/comment";
import {CommentEntity} from "../entities/comment.entity";
import {MarketEntity} from "../../../../../market/infrastructure/persistence/relational/entities/market.entity";

export class CommentMapper {
  /**
   * 데이터베이스 엔터티를 도메인 객체로 변환
   */
  static toDomain(raw: CommentEntity): Comment {
    const domainEntity = new Comment();
    domainEntity.id = raw.id;
    domainEntity.userId = raw.userId;
    domainEntity.marketId = raw.market?.id || null;
    domainEntity.content = raw.content;
    domainEntity.createdAt = raw.createdAt;
    return domainEntity;
  }

  /**
   * 도메인 객체를 데이터베이스 엔터티로 변환
   */
  static toPersistence(domainEntity: Comment): CommentEntity {
    const persistenceEntity = new CommentEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.content = domainEntity.content;
    persistenceEntity.createdAt = domainEntity.createdAt;
    if (domainEntity.marketId) {
      persistenceEntity.market = { id: domainEntity.marketId } as MarketEntity;
    }
    return persistenceEntity;
  }
}
