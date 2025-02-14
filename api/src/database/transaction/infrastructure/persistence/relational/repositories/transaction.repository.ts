import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {FindOptionsWhere, Repository} from "typeorm";
import {TransactionMapper} from "../mappers/transaction.mapper";
import {TransactionRepository} from "../../transaction.repository";
import {Transaction} from "../../../../domain/transaction";
import {NullableType} from "../../../../../../common/utils/types/nullable.type";
import {IPaginationOptions} from "../../../../../../common/utils/types/pagination-options";
import {TransactionEntity} from "../entities/transaction.entity";
import {FilterTransactionDto, SortTransactionDto} from "../../../../dto/query-transaction.dto";


@Injectable()
export class TransactionRelationalRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly marketRepository: Repository<TransactionEntity>,
  ) {}

  private readonly logger = new Logger(TransactionRelationalRepository.name);

  async create(data: Transaction): Promise<Transaction> {
    this.logger.log(`create>> data.toString ::${data.toString()}`)
    const persistenceModel = TransactionMapper.toPersistence(data);
    this.logger.log(`create>> persistenceModel.toString ::${persistenceModel.toString()}`)

    const newEntity = await this.marketRepository.save(
      this.marketRepository.create(persistenceModel),
    );
    return TransactionMapper.toDomain(newEntity);
  }


  /******************************************************************
   * *****************************************************************/


  async findOneWithWhere({
                             filterOptions,
                             sortOptions,
                             whereConditions,
                             relations,
  }: {
    filterOptions?: FilterTransactionDto | null;
    sortOptions?: SortTransactionDto[] | null;
    whereConditions?: FindOptionsWhere<TransactionEntity>;
    relations?: string[];
  }): Promise<NullableType<Transaction>> {
    const where: FindOptionsWhere<TransactionEntity> = whereConditions || {};
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
    return entity ? TransactionMapper.toDomain(entity) : null;
  }


  async findWithWhere({
    sortOptions,
    where,
  }: {
    sortOptions?: SortTransactionDto[] | null,
    where: FindOptionsWhere<TransactionEntity>,
  }): Promise<Transaction[]> {
    this.logger.log(`findWithWhere >> where: ${JSON.stringify(where)}`);
    const entities = await this.marketRepository.find({ where });
    return entities.map((entity) => TransactionMapper.toDomain(entity));
  }


  async findMany({
    sortOptions,
   }: {
    sortOptions?: SortTransactionDto[] | null;
  }): Promise<Transaction[]> {
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
    return entities.map((ticket) => TransactionMapper.toDomain(ticket));
  }


    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterTransactionDto | null;
        sortOptions?: SortTransactionDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Transaction>> {
        const where: FindOptionsWhere<TransactionEntity> = {};
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
        const items = entities.map((result) => TransactionMapper.toDomain(result));
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
    filterOptions?: FilterTransactionDto | null;
    sortOptions?: SortTransactionDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Transaction[]> {
    const where: FindOptionsWhere<TransactionEntity> = {};
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

    return entities.map((entity) => TransactionMapper.toDomain(entity));
  }


  async findById(id: Transaction['id']): Promise<NullableType<Transaction>> {
    const entity = await this.marketRepository.findOne({
      where: { id: id },
    });
    return entity ? TransactionMapper.toDomain(entity) : null;
  }


  async findWithPaginationByQueryBuilder({
     filterOptions,
     sortOptions = [],
     whereConditions,
     selectFields = ['address.*'],
     joins = [],
     paginationOptions,
   }: {
    filterOptions?: FilterTransactionDto | null;
    sortOptions?: SortTransactionDto[] | null;
    whereConditions?: FindOptionsWhere<TransactionEntity>;
    selectFields?: string[];
    joins?: {
      type: 'innerJoin' | 'leftJoin' | 'innerJoinAndSelect' | 'leftJoinAndSelect';
      entity: string;
      alias: string;
      condition?: string;
    }[];
    paginationOptions?: IPaginationOptions;
  }): Promise<PaginationResult<Transaction>> {
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
    const items = entities.map((result) => TransactionMapper.toDomain(result));

    return { totalCount, items };
  }


  /******************************************************************
   * *****************************************************************/


  async update(id: Transaction['id'], payload: Partial<Transaction>): Promise<Transaction> {
    const entity = await this.marketRepository.findOne({
      where: { id: id },
    });
    if (!entity) {
      throw new NotFoundException('Address not found');
    }
    const updatedEntity = await this.marketRepository.save(
      this.marketRepository.create(
          TransactionMapper.toPersistence({
          ...TransactionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return TransactionMapper.toDomain(updatedEntity);
  }

  async remove(id: Transaction['id'],): Promise<void> {
    await this.marketRepository.softDelete(id);
  }


}
