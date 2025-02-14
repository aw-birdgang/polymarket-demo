import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {FindOptionsWhere, Repository} from "typeorm";
import {WalletMapper} from "../mappers/wallet.mapper";
import {WalletRepository} from "../../wallet.repository";
import {Wallet} from "../../../../domain/wallet";
import {NullableType} from "../../../../../../common/utils/types/nullable.type";
import {IPaginationOptions} from "../../../../../../common/utils/types/pagination-options";
import {WalletEntity} from "../entities/wallet.entity";
import {FilterWalletDto, SortWalletDto} from "../../../../dto/query-wallet.dto";


@Injectable()
export class WalletRelationalRepository implements WalletRepository {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
  ) {}

  private readonly logger = new Logger(WalletRelationalRepository.name);

  async create(data: Wallet): Promise<Wallet> {
    this.logger.log(`create>> data.toString ::${data.toString()}`)
    const persistenceModel = WalletMapper.toPersistence(data);
    this.logger.log(`create>> persistenceModel.toString ::${persistenceModel.toString()}`)

    const newEntity = await this.walletRepository.save(
      this.walletRepository.create(persistenceModel),
    );
    return WalletMapper.toDomain(newEntity);
  }


  /******************************************************************
   * *****************************************************************/


  async findOneWithWhere({
                             filterOptions,
                             sortOptions,
                             whereConditions,
                             relations,
  }: {
    filterOptions?: FilterWalletDto | null;
    sortOptions?: SortWalletDto[] | null;
    whereConditions?: FindOptionsWhere<WalletEntity>;
    relations?: string[];
  }): Promise<NullableType<Wallet>> {
    const where: FindOptionsWhere<WalletEntity> = whereConditions || {};
    const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
      (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
      }),
      {},
    ) : {};
    const entity = await this.walletRepository.findOne({
        where,
        order,
        relations,
    });
    return entity ? WalletMapper.toDomain(entity) : null;
  }


  async findWithWhere({
    sortOptions,
    where,
  }: {
    sortOptions?: SortWalletDto[] | null,
    where: FindOptionsWhere<WalletEntity>,
  }): Promise<Wallet[]> {
    this.logger.log(`findWithWhere >> where: ${JSON.stringify(where)}`);
    const entities = await this.walletRepository.find({ where });
    return entities.map((entity) => WalletMapper.toDomain(entity));
  }


  async findMany({
    sortOptions,
   }: {
    sortOptions?: SortWalletDto[] | null;
  }): Promise<Wallet[]> {
      const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
          (accumulator, sort) => ({
              ...accumulator,
              [sort.orderBy]: sort.order,
          }),
          {},
      ) : {};
    const entities = await this.walletRepository.find({
      order: order,
    });
    return entities.map((ticket) => WalletMapper.toDomain(ticket));
  }


    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterWalletDto | null;
        sortOptions?: SortWalletDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Wallet>> {
        const where: FindOptionsWhere<WalletEntity> = {};
        const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
            (accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }),
            {},
        ) : {};
        const skip = ((paginationOptions.page ?? 1) - 1) * (paginationOptions.limit ?? 10);
        const take = paginationOptions.limit ?? 10;
        const [entities, totalCount] = await this.walletRepository.findAndCount({
            skip,
            take,
            where,
            order,
        });
        const items = entities.map((result) => WalletMapper.toDomain(result));
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
    filterOptions?: FilterWalletDto | null;
    sortOptions?: SortWalletDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Wallet[]> {
    const where: FindOptionsWhere<WalletEntity> = {};
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

    const entities = await this.walletRepository.find({
      skip,
      take: limit,
      where,
      order,
    });

    return entities.map((entity) => WalletMapper.toDomain(entity));
  }


  async findById(id: Wallet['id']): Promise<NullableType<Wallet>> {
    const entity = await this.walletRepository.findOne({
      where: { id: id },
    });
    return entity ? WalletMapper.toDomain(entity) : null;
  }


  async findWithPaginationByQueryBuilder({
     filterOptions,
     sortOptions = [],
     whereConditions,
     selectFields = ['address.*'],
     joins = [],
     paginationOptions,
   }: {
    filterOptions?: FilterWalletDto | null;
    sortOptions?: SortWalletDto[] | null;
    whereConditions?: FindOptionsWhere<WalletEntity>;
    selectFields?: string[];
    joins?: {
      type: 'innerJoin' | 'leftJoin' | 'innerJoinAndSelect' | 'leftJoinAndSelect';
      entity: string;
      alias: string;
      condition?: string;
    }[];
    paginationOptions?: IPaginationOptions;
  }): Promise<PaginationResult<Wallet>> {
    const queryBuilder = this.walletRepository.createQueryBuilder('address');
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
    const items = entities.map((result) => WalletMapper.toDomain(result));

    return { totalCount, items };
  }


  /******************************************************************
   * *****************************************************************/


  async update(id: Wallet['id'], payload: Partial<Wallet>): Promise<Wallet> {
    const entity = await this.walletRepository.findOne({
      where: { id: id },
    });
    if (!entity) {
      throw new NotFoundException('Address not found');
    }
    const updatedEntity = await this.walletRepository.save(
      this.walletRepository.create(
          WalletMapper.toPersistence({
          ...WalletMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return WalletMapper.toDomain(updatedEntity);
  }

  async remove(id: Wallet['id'],): Promise<void> {
    await this.walletRepository.softDelete(id);
  }

}
