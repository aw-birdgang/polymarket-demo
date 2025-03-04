import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {FindOptionsWhere, Repository} from "typeorm";
import {TradeMapper} from "../mappers/trade.mapper";
import {TradeRepository} from "../../trade.repository";
import {Trade} from "../../../../domain/trade";
import {NullableType} from "../../../../../../common/utils/types/nullable.type";
import {IPaginationOptions} from "../../../../../../common/utils/types/pagination-options";
import {FilterTradeDto, SortTradeDto} from "../../../../dto/query-trade.dto";
import {TradeEntity} from "../entities/trade.entity";


@Injectable()
export class TradeRelationalRepository implements TradeRepository {
  constructor(
    @InjectRepository(TradeEntity)
    private readonly tradeRepository: Repository<TradeEntity>,
  ) {}

  private readonly logger = new Logger(TradeRelationalRepository.name);

  async create(data: Trade): Promise<Trade> {
    this.logger.log(`create>> data.toString ::${data.toString()}`)
    const persistenceModel = TradeMapper.toPersistence(data);
    this.logger.log(`create>> persistenceModel.toString ::${persistenceModel.toString()}`)

    const newEntity = await this.tradeRepository.save(
      this.tradeRepository.create(persistenceModel),
    );
    return TradeMapper.toDomain(newEntity);
  }


  /******************************************************************
   * *****************************************************************/

  async findOneWithWhere(
    where: FindOptionsWhere<TradeEntity>
  ): Promise<NullableType<Trade>> {
    this.logger.log(`findOneWithWhere >> where: ${JSON.stringify(where)}`);
    const entity = await this.tradeRepository.findOne({ where });
    return entity ? TradeMapper.toDomain(entity) : null;
  }


  async findWithWhere({
    sortOptions,
    where,
  }: {
    sortOptions?: SortTradeDto[] | null,
    where: FindOptionsWhere<TradeEntity>,
  }): Promise<Trade[]> {
    this.logger.log(`findWithWhere >> where: ${JSON.stringify(where)}`);
    const entities = await this.tradeRepository.find({ where });
    return entities.map((entity) => TradeMapper.toDomain(entity));
  }


  async findMany({
    sortOptions,
   }: {
    sortOptions?: SortTradeDto[] | null;
  }): Promise<Trade[]> {
    const entities = await this.tradeRepository.find({
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
    return entities.map((ticket) => TradeMapper.toDomain(ticket));
  }


  async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
   }: {
        filterOptions?: FilterTradeDto | null;
        sortOptions?: SortTradeDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Trade>> {
        const where: FindOptionsWhere<TradeEntity> = {};
        const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
            (accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }),
            {},
        ) : {};
        const skip = ((paginationOptions.page ?? 1) - 1) * (paginationOptions.limit ?? 10);
        const take = paginationOptions.limit ?? 10;
        const [entities, totalCount] = await this.tradeRepository.findAndCount({
            skip,
            take,
            where,
            order,
        });
        const items = entities.map((result) => TradeMapper.toDomain(result));
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
    filterOptions?: FilterTradeDto | null;
    sortOptions?: SortTradeDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Trade[]> {
    const where: FindOptionsWhere<TradeEntity> = {};
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

    const entities = await this.tradeRepository.find({
      skip,
      take: limit,
      where,
      order,
    });

    return entities.map((entity) => TradeMapper.toDomain(entity));
  }


  async findById(id: Trade['id']): Promise<NullableType<Trade>> {
    const entity = await this.tradeRepository.findOne({
      where: { id: id },
    });
    return entity ? TradeMapper.toDomain(entity) : null;
  }


  async findWithPaginationByQueryBuilder({
     filterOptions,
     sortOptions = [],
     whereConditions,
     selectFields = ['address.*'],
     joins = [],
     paginationOptions,
   }: {
    filterOptions?: FilterTradeDto | null;
    sortOptions?: SortTradeDto[] | null;
    whereConditions?: FindOptionsWhere<TradeEntity>;
    selectFields?: string[];
    joins?: {
      type: 'innerJoin' | 'leftJoin' | 'innerJoinAndSelect' | 'leftJoinAndSelect';
      entity: string;
      alias: string;
      condition?: string;
    }[];
    paginationOptions?: IPaginationOptions;
  }): Promise<PaginationResult<Trade>> {
    const queryBuilder = this.tradeRepository.createQueryBuilder('address');
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
    const items = entities.map((result) => TradeMapper.toDomain(result));

    return { totalCount, items };
  }


  /******************************************************************
   * *****************************************************************/


  async update(id: Trade['id'], payload: Partial<Trade>): Promise<Trade> {
    const entity = await this.tradeRepository.findOne({
      where: { id: id },
    });
    if (!entity) {
      throw new NotFoundException('Address not found');
    }
    const updatedEntity = await this.tradeRepository.save(
      this.tradeRepository.create(
          TradeMapper.toPersistence({
          ...TradeMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return TradeMapper.toDomain(updatedEntity);
  }

  async remove(id: Trade['id'],): Promise<void> {
    await this.tradeRepository.softDelete(id);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

}
