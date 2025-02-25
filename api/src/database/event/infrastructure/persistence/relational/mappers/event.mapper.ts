import {EventEntity} from "../entities/event.entity";
import {Event} from "../../../../domain/event";

export class EventMapper {
  static toDomain(raw: EventEntity): Event {
    const domainEntity = new Event();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.description = raw.description;
    domainEntity.imageUrl = raw.imageUrl;
    domainEntity.volume = raw.volume;
    domainEntity.chance = raw.chance;
    domainEntity.isTrending = raw.isTrending;
    return domainEntity;
  }

  static toPersistence(domainEntity: Event): EventEntity {
    const persistenceEntity = new EventEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.imageUrl = domainEntity.imageUrl;
    persistenceEntity.volume = domainEntity.volume;
    persistenceEntity.chance = domainEntity.chance;
    persistenceEntity.isTrending = domainEntity.isTrending;
    return persistenceEntity;
  }
}
