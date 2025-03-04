import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {FindOptionsWhere, Repository} from "typeorm";
import {MarketHistoryMapper} from "../mappers/market-history.mapper";
import {MarketHistoryRepository} from "../../market-history.repository";
import {MarketHistory} from "../../../../domain/market-history";
import {NullableType} from "../../../../../../common/utils/types/nullable.type";
import {IPaginationOptions} from "../../../../../../common/utils/types/pagination-options";
import {MarketHistoryEntity} from "../entities/market-history.entity";
import {FilterMarketHistoryDto, SortMarketHistoryDto} from "../../../../dto/query-market-history.dto";


@Injectable()
export class MarketHistoryRelationalRepository implements MarketHistoryRepository {
  constructor(
    @InjectRepository(MarketHistoryEntity)
    private readonly marketHistoryRepository: Repository<MarketHistoryEntity>,
  ) {}

  private readonly logger = new Logger(MarketHistoryRelationalRepository.name);

  async create(data: MarketHistory): Promise<MarketHistory> {
    const persistenceModel = MarketHistoryMapper.toPersistence(data);
    const newEntity = await this.marketHistoryRepository.save(
      this.marketHistoryRepository.create(persistenceModel),
    );
    return MarketHistoryMapper.toDomain(newEntity);
  }


  /******************************************************************
   * *****************************************************************/


  async findOneWithWhere({
                             filterOptions,
                             sortOptions,
                             whereConditions,
                             relations,
  }: {
    filterOptions?: FilterMarketHistoryDto | null;
    sortOptions?: SortMarketHistoryDto[] | null;
    whereConditions?: FindOptionsWhere<MarketHistoryEntity>;
    relations?: string[];
  }): Promise<NullableType<MarketHistory>> {
    const where: FindOptionsWhere<MarketHistoryEntity> = whereConditions || {};
    const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
      (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
      }),
      {},
    ) : {};
    const entity = await this.marketHistoryRepository.findOne({
        where,
        order,
        relations,
    });
    return entity ? MarketHistoryMapper.toDomain(entity) : null;
  }


  async findWithWhere({
    sortOptions,
    where,
  }: {
    sortOptions?: SortMarketHistoryDto[] | null,
    where: FindOptionsWhere<MarketHistoryEntity>,
  }): Promise<MarketHistory[]> {
    this.logger.log(`findWithWhere >> where: ${JSON.stringify(where)}`);
    const entities = await this.marketHistoryRepository.find({ where });
    return entities.map((entity) => MarketHistoryMapper.toDomain(entity));
  }


  async findMany({
    sortOptions,
   }: {
    sortOptions?: SortMarketHistoryDto[] | null;
  }): Promise<MarketHistory[]> {
      const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
          (accumulator, sort) => ({
              ...accumulator,
              [sort.orderBy]: sort.order,
          }),
          {},
      ) : {};
    const entities = await this.marketHistoryRepository.find({
      order: order,
    });
    return entities.map((ticket) => MarketHistoryMapper.toDomain(ticket));
  }


    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterMarketHistoryDto | null;
        sortOptions?: SortMarketHistoryDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<MarketHistory>> {
        const where: FindOptionsWhere<MarketHistoryEntity> = {};
        const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
            (accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }),
            {},
        ) : {};
        const skip = ((paginationOptions.page ?? 1) - 1) * (paginationOptions.limit ?? 10);
        const take = paginationOptions.limit ?? 10;
        const [entities, totalCount] = await this.marketHistoryRepository.findAndCount({
            skip,
            take,
            where,
            order,
        });
        const items = entities.map((result) => MarketHistoryMapper.toDomain(result));
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
    filterOptions?: FilterMarketHistoryDto | null;
    sortOptions?: SortMarketHistoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<MarketHistory[]> {
    const where: FindOptionsWhere<MarketHistoryEntity> = {};
    this.logger.log(`findManyWithWhereAndPagination >> where: ${JSON.stringify(where)}`);
    const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
          (accumulator, sort) => ({
              ...accumulator,
              [sort.orderBy]: sort.order,
          }),
          {},
    ) : {};

    // 페이징 처리 설정
    const { page, limit } = paginationOptions;
    const skip = (page - 1) * limit;

    const entities = await this.marketHistoryRepository.find({
      skip,
      take: limit,
      where,
      order,
    });

    return entities.map((entity) => MarketHistoryMapper.toDomain(entity));
  }


  async findById(id: MarketHistory['id']): Promise<NullableType<MarketHistory>> {
    const entity = await this.marketHistoryRepository.findOne({
      where: { id: id },
    });
    return entity ? MarketHistoryMapper.toDomain(entity) : null;
  }


  async findWithPaginationByQueryBuilder({
     filterOptions,
     sortOptions = [],
     whereConditions,
     selectFields = ['address.*'],
     joins = [],
     paginationOptions,
   }: {
    filterOptions?: FilterMarketHistoryDto | null;
    sortOptions?: SortMarketHistoryDto[] | null;
    whereConditions?: FindOptionsWhere<MarketHistoryEntity>;
    selectFields?: string[];
    joins?: {
      type: 'innerJoin' | 'leftJoin' | 'innerJoinAndSelect' | 'leftJoinAndSelect';
      entity: string;
      alias: string;
      condition?: string;
    }[];
    paginationOptions?: IPaginationOptions;
  }): Promise<PaginationResult<MarketHistory>> {
    const queryBuilder = this.marketHistoryRepository.createQueryBuilder('address');
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
    const items = entities.map((result) => MarketHistoryMapper.toDomain(result));

    return { totalCount, items };
  }


  /******************************************************************
   * *****************************************************************/


  async update(id: MarketHistory['id'], payload: Partial<MarketHistory>): Promise<MarketHistory> {
    const entity = await this.marketHistoryRepository.findOne({
      where: { id: id },
    });
    if (!entity) {
      throw new NotFoundException('Address not found');
    }
    const updatedEntity = await this.marketHistoryRepository.save(
      this.marketHistoryRepository.create(
          MarketHistoryMapper.toPersistence({
          ...MarketHistoryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return MarketHistoryMapper.toDomain(updatedEntity);
  }

  async remove(id: MarketHistory['id'],): Promise<void> {
    await this.marketHistoryRepository.softDelete(id);
  }

}
