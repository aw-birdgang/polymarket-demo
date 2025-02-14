import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {FindOptionsWhere, Repository} from "typeorm";
import {LiquidityMapper} from "../mappers/liquidity.mapper";
import {LiquidityRepository} from "../../liquidity.repository";
import {Liquidity} from "../../../../domain/liquidity";
import {NullableType} from "../../../../../../common/utils/types/nullable.type";
import {IPaginationOptions} from "../../../../../../common/utils/types/pagination-options";
import {LiquidityEntity} from "../entities/liquidity.entity";
import {FilterLiquidityDto, SortLiquidityDto} from "../../../../dto/query-liquidity.dto";


@Injectable()
export class LiquidityRelationalRepository implements LiquidityRepository {
  constructor(
    @InjectRepository(LiquidityEntity)
    private readonly liquidityEntityRepository: Repository<LiquidityEntity>,
  ) {}

  private readonly logger = new Logger(LiquidityRelationalRepository.name);

  async create(data: Liquidity): Promise<Liquidity> {
    this.logger.log(`create>> data.toString ::${data.toString()}`)
    const persistenceModel = LiquidityMapper.toPersistence(data);
    this.logger.log(`create>> persistenceModel.toString ::${persistenceModel.toString()}`)

    const newEntity = await this.liquidityEntityRepository.save(
      this.liquidityEntityRepository.create(persistenceModel),
    );
    return LiquidityMapper.toDomain(newEntity);
  }


  /******************************************************************
   * *****************************************************************/


  async findOneWithWhere({
                             filterOptions,
                             sortOptions,
                             whereConditions,
                             relations,
  }: {
    filterOptions?: FilterLiquidityDto | null;
    sortOptions?: SortLiquidityDto[] | null;
    whereConditions?: FindOptionsWhere<LiquidityEntity>;
    relations?: string[];
  }): Promise<NullableType<Liquidity>> {
    const where: FindOptionsWhere<LiquidityEntity> = whereConditions || {};
    const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
      (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
      }),
      {},
    ) : {};
    const entity = await this.liquidityEntityRepository.findOne({
        where,
        order,
        relations,
    });
    return entity ? LiquidityMapper.toDomain(entity) : null;
  }


  async findWithWhere({
    sortOptions,
    where,
  }: {
    sortOptions?: SortLiquidityDto[] | null,
    where: FindOptionsWhere<LiquidityEntity>,
  }): Promise<Liquidity[]> {
    this.logger.log(`findWithWhere >> where: ${JSON.stringify(where)}`);
    const entities = await this.liquidityEntityRepository.find({ where });
    return entities.map((entity) => LiquidityMapper.toDomain(entity));
  }


  async findMany({
    sortOptions,
   }: {
    sortOptions?: SortLiquidityDto[] | null;
  }): Promise<Liquidity[]> {
      const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
          (accumulator, sort) => ({
              ...accumulator,
              [sort.orderBy]: sort.order,
          }),
          {},
      ) : {};
    const entities = await this.liquidityEntityRepository.find({
      order: order,
    });
    return entities.map((ticket) => LiquidityMapper.toDomain(ticket));
  }


    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterLiquidityDto | null;
        sortOptions?: SortLiquidityDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Liquidity>> {
        const where: FindOptionsWhere<LiquidityEntity> = {};
        const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
            (accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }),
            {},
        ) : {};
        const skip = ((paginationOptions.page ?? 1) - 1) * (paginationOptions.limit ?? 10);
        const take = paginationOptions.limit ?? 10;
        const [entities, totalCount] = await this.liquidityEntityRepository.findAndCount({
            skip,
            take,
            where,
            order,
        });
        const items = entities.map((result) => LiquidityMapper.toDomain(result));
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
    filterOptions?: FilterLiquidityDto | null;
    sortOptions?: SortLiquidityDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Liquidity[]> {
    const where: FindOptionsWhere<LiquidityEntity> = {};
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

    const entities = await this.liquidityEntityRepository.find({
      skip,
      take: limit,
      where,
      order,
    });

    return entities.map((entity) => LiquidityMapper.toDomain(entity));
  }


  async findById(id: Liquidity['id']): Promise<NullableType<Liquidity>> {
    const entity = await this.liquidityEntityRepository.findOne({
      where: { id: id },
    });
    return entity ? LiquidityMapper.toDomain(entity) : null;
  }


  async findWithPaginationByQueryBuilder({
     filterOptions,
     sortOptions = [],
     whereConditions,
     selectFields = ['address.*'],
     joins = [],
     paginationOptions,
   }: {
    filterOptions?: FilterLiquidityDto | null;
    sortOptions?: SortLiquidityDto[] | null;
    whereConditions?: FindOptionsWhere<LiquidityEntity>;
    selectFields?: string[];
    joins?: {
      type: 'innerJoin' | 'leftJoin' | 'innerJoinAndSelect' | 'leftJoinAndSelect';
      entity: string;
      alias: string;
      condition?: string;
    }[];
    paginationOptions?: IPaginationOptions;
  }): Promise<PaginationResult<Liquidity>> {
    const queryBuilder = this.liquidityEntityRepository.createQueryBuilder('liquidity');
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
    const items = entities.map((result) => LiquidityMapper.toDomain(result));

    return { totalCount, items };
  }


  /******************************************************************
   * *****************************************************************/


  async update(id: Liquidity['id'], payload: Partial<Liquidity>): Promise<Liquidity> {
    const entity = await this.liquidityEntityRepository.findOne({
      where: { id: id },
    });
    if (!entity) {
      throw new NotFoundException('Liquidity not found');
    }
    const updatedEntity = await this.liquidityEntityRepository.save(
      this.liquidityEntityRepository.create(
          LiquidityMapper.toPersistence({
          ...LiquidityMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return LiquidityMapper.toDomain(updatedEntity);
  }

  async remove(id: Liquidity['id'],): Promise<void> {
    await this.liquidityEntityRepository.softDelete(id);
  }


}
