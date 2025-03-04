import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {FindOptionsWhere, Repository} from "typeorm";
import {EventMapper} from "../mappers/event.mapper";
import {EventRepository} from "../../event.repository";
import {Event} from "../../../../domain/event";
import {NullableType} from "../../../../../../common/utils/types/nullable.type";
import {IPaginationOptions} from "../../../../../../common/utils/types/pagination-options";
import {FilterEventDto, SortEventDto} from "../../../../dto/query-event.dto";
import {EventEntity} from "../entities/event.entity";


@Injectable()
export class EventRelationalRepository implements EventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  private readonly logger = new Logger(EventRelationalRepository.name);

  async create(data: Event): Promise<Event> {
    this.logger.log(`create>> data.toString ::${data.toString()}`)
    const persistenceModel = EventMapper.toPersistence(data);

    const newEntity = await this.eventRepository.save(
      this.eventRepository.create(persistenceModel),
    );
    return EventMapper.toDomain(newEntity);
  }


  /******************************************************************
   * *****************************************************************/


  async findOneWithWhere(
      where: FindOptionsWhere<Event>
  ): Promise<Event> {
      this.logger.log(`findOneWithWhere >> where: ${JSON.stringify(where)}`);
      const whereConditions: FindOptionsWhere<EventEntity> = {
          ...where,
          markets: where.markets
              ? (where.markets as any).map((market) => ({ id: market.id }))
              : undefined, // ✅ markets 필드를 올바르게 변환
      };
      const entity = await this.eventRepository.findOne({ where: whereConditions });
      return entity ? EventMapper.toDomain(entity) : null;
  }

  async findWithWhere({
    sortOptions,
    where,
  }: {
    sortOptions?: SortEventDto[] | null,
    where: FindOptionsWhere<EventEntity>,
  }): Promise<Event[]> {
    this.logger.log(`findWithWhere >> where: ${JSON.stringify(where)}`);
    const entities = await this.eventRepository.find({ where });
    return entities.map((entity) => EventMapper.toDomain(entity));
  }


  async findMany({
    sortOptions,
   }: {
    sortOptions?: SortEventDto[] | null;
  }): Promise<Event[]> {
    const entities = await this.eventRepository.find({
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
    return entities.map((ticket) => EventMapper.toDomain(ticket));
  }


    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterEventDto | null;
        sortOptions?: SortEventDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Event>> {
        const where: FindOptionsWhere<EventEntity> = {};
        const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
            (accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }),
            {},
        ) : {};
        const skip = ((paginationOptions.page ?? 1) - 1) * (paginationOptions.limit ?? 10);
        const take = paginationOptions.limit ?? 10;
        const [entities, totalCount] = await this.eventRepository.findAndCount({
            skip,
            take,
            where,
            order,
        });
        const items = entities.map((result) => EventMapper.toDomain(result));
        return {
            totalCount,
            items,
        };
    }


  async findManyWithWhereAndPagination({
     filterOptions,
     sortOptions,
     paginationOptions,
   }: {
    filterOptions?: FilterEventDto | null;
    sortOptions?: SortEventDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Event[]> {
    const where: FindOptionsWhere<EventEntity> = {};
    this.logger.log(`findManyWithWhereAndPagination >> where: ${JSON.stringify(where)}`);
    const order = sortOptions?.reduce(
      (accumulator, sort) => ({
        ...accumulator,
        [sort.orderBy]: sort.order,
      }),
      {},
    ) || {};

    // 페이징 처리 설정
    const { page, limit } = paginationOptions;
    const skip = (page - 1) * limit;

    const entities = await this.eventRepository.find({
      skip,
      take: limit,
      where,
      order,
    });

    return entities.map((entity) => EventMapper.toDomain(entity));
  }


  async findById(id: Event['id']): Promise<NullableType<Event>> {
    const entity = await this.eventRepository.findOne({
      where: { id: id },
    });
    return entity ? EventMapper.toDomain(entity) : null;
  }


  async findWithPaginationByQueryBuilder({
     filterOptions,
     sortOptions = [],
     whereConditions,
     selectFields = ['address.*'],
     joins = [],
     paginationOptions,
   }: {
    filterOptions?: FilterEventDto | null;
    sortOptions?: SortEventDto[] | null;
    whereConditions?: FindOptionsWhere<EventEntity>;
    selectFields?: string[];
    joins?: {
      type: 'innerJoin' | 'leftJoin' | 'innerJoinAndSelect' | 'leftJoinAndSelect';
      entity: string;
      alias: string;
      condition?: string;
    }[];
    paginationOptions?: IPaginationOptions;
  }): Promise<PaginationResult<Event>> {
    const queryBuilder = this.eventRepository.createQueryBuilder('address');
    // 필드 선택
    queryBuilder.select(selectFields);
    // 조건 추가
    if (whereConditions) {
      queryBuilder.where(whereConditions);
    }
    // 정렬 옵션 추가
    (sortOptions ?? []).forEach(({ orderBy, order }) => {
      queryBuilder.addOrderBy(orderBy, order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
    });
    // 조인 추가
    joins.forEach(({ type, entity, alias, condition }) =>
      condition
        ? queryBuilder[type](`address.${entity}`, alias, condition)
        : queryBuilder[type](`address.${entity}`, alias)
    );
    // 페이지네이션 처리
    if (paginationOptions) {
      const { limit, page } = paginationOptions;
      queryBuilder.skip(limit * (page - 1)).take(limit);
    }

    const [entities, totalCount] = await queryBuilder.getManyAndCount();
    const items = entities.map((result) => EventMapper.toDomain(result));

    return { totalCount, items };
  }


  /******************************************************************
   * *****************************************************************/


  async update(id: Event['id'], payload: Partial<Event>): Promise<Event> {
    const entity = await this.eventRepository.findOne({
      where: { id: id },
    });
    if (!entity) {
      throw new NotFoundException('Address not found');
    }
    const updatedEntity = await this.eventRepository.save(
      this.eventRepository.create(
          EventMapper.toPersistence({
          ...EventMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return EventMapper.toDomain(updatedEntity);
  }

  async remove(id: Event['id'],): Promise<void> {
    await this.eventRepository.softDelete(id);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

}
