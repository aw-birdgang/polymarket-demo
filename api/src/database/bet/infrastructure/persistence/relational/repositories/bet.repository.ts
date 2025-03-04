import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {FindOptionsWhere, Repository} from "typeorm";
import {BetEntity} from "../entities/bet.entity";
import {BetMapper} from "../mappers/bet.mapper";
import {BetRepository} from "../../bet.repository";
import {Bet} from "../../../../domain/bet";
import {FilterBetDto, SortBetDto} from "../../../../dto/query-bet.dto";
import {NullableType} from "../../../../../../common/utils/types/nullable.type";
import {IPaginationOptions} from "../../../../../../common/utils/types/pagination-options";


@Injectable()
export class BetRelationalRepository implements BetRepository {
  constructor(
    @InjectRepository(BetEntity)
    private readonly betRepository: Repository<BetEntity>,
  ) {}

  private readonly logger = new Logger(BetRelationalRepository.name);

  async create(data: Bet): Promise<Bet> {
    this.logger.log(`create>> data.toString ::${data.toString()}`)
    const persistenceModel = BetMapper.toPersistence(data);
    this.logger.log(`create>> persistenceModel.toString ::${persistenceModel.toString()}`)

    const newEntity = await this.betRepository.save(
      this.betRepository.create(persistenceModel),
    );
    return BetMapper.toDomain(newEntity);
  }


  /******************************************************************
   * *****************************************************************/

    async findOneWithWhere({
       filterOptions,
       sortOptions,
       whereConditions,
       relations,
    }: {
        filterOptions?: FilterBetDto | null;
        sortOptions?: SortBetDto[] | null;
        whereConditions?: FindOptionsWhere<BetEntity>;
        relations?: string[];
    }): Promise<NullableType<Bet>> {
        const where: FindOptionsWhere<BetEntity> = whereConditions || {};
        const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
            (accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }),
            {},
        ) : {};
        const entity = await this.betRepository.findOne({
            where,
            order,
            relations,
        });
        return entity ? BetMapper.toDomain(entity) : null;
    }


  async findWithWhere({
    sortOptions,
    where,
  }: {
    sortOptions?: SortBetDto[] | null,
    where: FindOptionsWhere<BetEntity>,
  }): Promise<Bet[]> {
    this.logger.log(`findWithWhere >> where: ${JSON.stringify(where)}`);
    const entities = await this.betRepository.find({ where });
    return entities.map((entity) => BetMapper.toDomain(entity));
  }


  async findMany({
    sortOptions,
   }: {
    sortOptions?: SortBetDto[] | null;
  }): Promise<Bet[]> {
    const entities = await this.betRepository.find({
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
    return entities.map((ticket) => BetMapper.toDomain(ticket));
  }


  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterBetDto | null;
    sortOptions?: SortBetDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Bet[]> {
    const where: FindOptionsWhere<BetEntity> = {};

    const entities = await this.betRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((ticket) => BetMapper.toDomain(ticket));
  }

  async findManyWithWhereAndPagination({
     filterOptions,
     sortOptions,
     paginationOptions,
   }: {
    filterOptions?: FilterBetDto | null;
    sortOptions?: SortBetDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Bet[]> {
    const where: FindOptionsWhere<BetEntity> = {};
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

    const entities = await this.betRepository.find({
      skip,
      take: limit,
      where,
      order,
    });

    return entities.map((entity) => BetMapper.toDomain(entity));
  }


  async findById(id: Bet['id']): Promise<NullableType<Bet>> {
    const entity = await this.betRepository.findOne({
      where: { id: id },
    });
    return entity ? BetMapper.toDomain(entity) : null;
  }


  async findWithPaginationByQueryBuilder({
     filterOptions,
     sortOptions = [],
     whereConditions,
     selectFields = ['address.*'],
     joins = [],
     paginationOptions,
   }: {
    filterOptions?: FilterBetDto | null;
    sortOptions?: SortBetDto[] | null;
    whereConditions?: FindOptionsWhere<BetEntity>;
    selectFields?: string[];
    joins?: {
      type: 'innerJoin' | 'leftJoin' | 'innerJoinAndSelect' | 'leftJoinAndSelect';
      entity: string;
      alias: string;
      condition?: string;
    }[];
    paginationOptions?: IPaginationOptions;
  }): Promise<PaginationResult<Bet>> {
    const queryBuilder = this.betRepository.createQueryBuilder('address');
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
    const items = entities.map((result) => BetMapper.toDomain(result));

    return { totalCount, items };
  }


  /******************************************************************
   * *****************************************************************/


  async update(id: Bet['id'], payload: Partial<Bet>): Promise<Bet> {
    const entity = await this.betRepository.findOne({
      where: { id: id },
    });
    if (!entity) {
      throw new NotFoundException('Address not found');
    }
    const updatedEntity = await this.betRepository.save(
      this.betRepository.create(
          BetMapper.toPersistence({
          ...BetMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return BetMapper.toDomain(updatedEntity);
  }

  async remove(id: Bet['id'],): Promise<void> {
    await this.betRepository.softDelete(id);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

}
