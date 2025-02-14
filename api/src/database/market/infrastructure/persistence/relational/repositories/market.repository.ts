import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {FindOptionsWhere, Repository} from "typeorm";
import {MarketMapper} from "../mappers/market.mapper";
import {MarketRepository} from "../../market.repository";
import {Market} from "../../../../domain/market";
import {NullableType} from "../../../../../../common/utils/types/nullable.type";
import {IPaginationOptions} from "../../../../../../common/utils/types/pagination-options";
import {FilterMarketDto, SortMarketDto} from "../../../../dto/query-market.dto";
import {MarketEntity} from "../entities/market.entity";


@Injectable()
export class MarketRelationalRepository implements MarketRepository {
  constructor(
    @InjectRepository(MarketEntity)
    private readonly marketRepository: Repository<MarketEntity>,
  ) {}

  private readonly logger = new Logger(MarketRelationalRepository.name);

  async create(data: Market): Promise<Market> {
    this.logger.log(`create>> data.toString ::${data.toString()}`)
    const persistenceModel = MarketMapper.toPersistence(data);
    this.logger.log(`create>> persistenceModel.toString ::${persistenceModel.toString()}`)

    const newEntity = await this.marketRepository.save(
      this.marketRepository.create(persistenceModel),
    );
    return MarketMapper.toDomain(newEntity);
  }


  /******************************************************************
   * *****************************************************************/


  async findOneWithWhere({
                             filterOptions,
                             sortOptions,
                             whereConditions,
                             relations,
  }: {
    filterOptions?: FilterMarketDto | null;
    sortOptions?: SortMarketDto[] | null;
    whereConditions?: FindOptionsWhere<MarketEntity>;
    relations?: string[];
  }): Promise<NullableType<Market>> {
    const where: FindOptionsWhere<MarketEntity> = whereConditions || {};
    const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
      (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
      }),
      {},
    ) : {};
    const entity = await this.marketRepository.findOne({
        where,
        order,
        relations,
    });
    return entity ? MarketMapper.toDomain(entity) : null;
  }


  async findWithWhere({
    sortOptions,
    where,
  }: {
    sortOptions?: SortMarketDto[] | null,
    where: FindOptionsWhere<MarketEntity>,
  }): Promise<Market[]> {
    this.logger.log(`findWithWhere >> where: ${JSON.stringify(where)}`);
    const entities = await this.marketRepository.find({ where });
    return entities.map((entity) => MarketMapper.toDomain(entity));
  }


  async findMany({
    sortOptions,
   }: {
    sortOptions?: SortMarketDto[] | null;
  }): Promise<Market[]> {
      const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
          (accumulator, sort) => ({
              ...accumulator,
              [sort.orderBy]: sort.order,
          }),
          {},
      ) : {};
    const entities = await this.marketRepository.find({
      order: order,
    });
    return entities.map((ticket) => MarketMapper.toDomain(ticket));
  }


    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterMarketDto | null;
        sortOptions?: SortMarketDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Market>> {
        const where: FindOptionsWhere<MarketEntity> = {};
        const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
            (accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }),
            {},
        ) : {};
        const skip = ((paginationOptions.page ?? 1) - 1) * (paginationOptions.limit ?? 10);
        const take = paginationOptions.limit ?? 10;
        const [entities, totalCount] = await this.marketRepository.findAndCount({
            skip,
            take,
            where,
            order,
        });
        const items = entities.map((result) => MarketMapper.toDomain(result));
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
    filterOptions?: FilterMarketDto | null;
    sortOptions?: SortMarketDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Market[]> {
    const where: FindOptionsWhere<MarketEntity> = {};
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

    const entities = await this.marketRepository.find({
      skip,
      take: limit,
      where,
      order,
    });

    return entities.map((entity) => MarketMapper.toDomain(entity));
  }


  async findById(id: Market['id']): Promise<NullableType<Market>> {
    const entity = await this.marketRepository.findOne({
      where: { id: id },
    });
    return entity ? MarketMapper.toDomain(entity) : null;
  }


  async findWithPaginationByQueryBuilder({
     filterOptions,
     sortOptions = [],
     whereConditions,
     selectFields = ['address.*'],
     joins = [],
     paginationOptions,
   }: {
    filterOptions?: FilterMarketDto | null;
    sortOptions?: SortMarketDto[] | null;
    whereConditions?: FindOptionsWhere<MarketEntity>;
    selectFields?: string[];
    joins?: {
      type: 'innerJoin' | 'leftJoin' | 'innerJoinAndSelect' | 'leftJoinAndSelect';
      entity: string;
      alias: string;
      condition?: string;
    }[];
    paginationOptions?: IPaginationOptions;
  }): Promise<PaginationResult<Market>> {
    const queryBuilder = this.marketRepository.createQueryBuilder('address');
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
    const items = entities.map((result) => MarketMapper.toDomain(result));

    return { totalCount, items };
  }


  /******************************************************************
   * *****************************************************************/


  async update(id: Market['id'], payload: Partial<Market>): Promise<Market> {
    const entity = await this.marketRepository.findOne({
      where: { id: id },
    });
    if (!entity) {
      throw new NotFoundException('Address not found');
    }
    const updatedEntity = await this.marketRepository.save(
      this.marketRepository.create(
          MarketMapper.toPersistence({
          ...MarketMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return MarketMapper.toDomain(updatedEntity);
  }

  async remove(id: Market['id'],): Promise<void> {
    await this.marketRepository.softDelete(id);
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////

}
