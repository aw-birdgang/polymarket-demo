import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {FindOptionsWhere, Repository} from "typeorm";
import {UserMapper} from "../mappers/user.mapper";
import {UserRepository} from "../../user.repository";
import {User} from "../../../../domain/user";
import {NullableType} from "../../../../../../common/utils/types/nullable.type";
import {IPaginationOptions} from "../../../../../../common/utils/types/pagination-options";
import {UserEntity} from "../entities/user.entity";
import {FilterUserDto, SortUserDto} from "../../../../dto/query-user.dto";


@Injectable()
export class UserRelationalRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private readonly logger = new Logger(UserRelationalRepository.name);

  async create(data: User): Promise<User> {
    this.logger.log(`create>> data.toString ::${data.toString()}`)
    const persistenceModel = UserMapper.toPersistence(data);
    this.logger.log(`create>> persistenceModel.toString ::${persistenceModel.toString()}`)

    const newEntity = await this.userRepository.save(
      this.userRepository.create(persistenceModel),
    );
    return UserMapper.toDomain(newEntity);
  }


  /******************************************************************
   * *****************************************************************/


  async findOneWithWhere({
                             filterOptions,
                             sortOptions,
                             whereConditions,
                             relations,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    whereConditions?: FindOptionsWhere<UserEntity>;
    relations?: string[];
  }): Promise<NullableType<User>> {
    const where: FindOptionsWhere<UserEntity> = whereConditions || {};
    const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
      (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
      }),
      {},
    ) : {};
    const entity = await this.userRepository.findOne({
        where,
        order,
        relations,
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }


  async findWithWhere({
    sortOptions,
    where,
  }: {
    sortOptions?: SortUserDto[] | null,
    where: FindOptionsWhere<UserEntity>,
  }): Promise<User[]> {
    this.logger.log(`findWithWhere >> where: ${JSON.stringify(where)}`);
    const entities = await this.userRepository.find({ where });
    return entities.map((entity) => UserMapper.toDomain(entity));
  }


  async findMany({
    sortOptions,
   }: {
    sortOptions?: SortUserDto[] | null;
  }): Promise<User[]> {
      const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
          (accumulator, sort) => ({
              ...accumulator,
              [sort.orderBy]: sort.order,
          }),
          {},
      ) : {};
    const entities = await this.userRepository.find({
      order: order,
    });
    return entities.map((ticket) => UserMapper.toDomain(ticket));
  }


    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterUserDto | null;
        sortOptions?: SortUserDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<User>> {
        const where: FindOptionsWhere<UserEntity> = {};
        const order = sortOptions && Array.isArray(sortOptions) ? sortOptions.reduce(
            (accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }),
            {},
        ) : {};
        const skip = ((paginationOptions.page ?? 1) - 1) * (paginationOptions.limit ?? 10);
        const take = paginationOptions.limit ?? 10;
        const [entities, totalCount] = await this.userRepository.findAndCount({
            skip,
            take,
            where,
            order,
        });
        const items = entities.map((result) => UserMapper.toDomain(result));
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
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: FindOptionsWhere<UserEntity> = {};
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

    const entities = await this.userRepository.find({
      skip,
      take: limit,
      where,
      order,
    });

    return entities.map((entity) => UserMapper.toDomain(entity));
  }


  async findById(id: User['id']): Promise<NullableType<User>> {
    const entity = await this.userRepository.findOne({
      where: { id: id },
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }


  async findWithPaginationByQueryBuilder({
     filterOptions,
     sortOptions = [],
     whereConditions,
     selectFields = ['address.*'],
     joins = [],
     paginationOptions,
   }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    whereConditions?: FindOptionsWhere<UserEntity>;
    selectFields?: string[];
    joins?: {
      type: 'innerJoin' | 'leftJoin' | 'innerJoinAndSelect' | 'leftJoinAndSelect';
      entity: string;
      alias: string;
      condition?: string;
    }[];
    paginationOptions?: IPaginationOptions;
  }): Promise<PaginationResult<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('address');
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
    const items = entities.map((result) => UserMapper.toDomain(result));

    return { totalCount, items };
  }


  /******************************************************************
   * *****************************************************************/


  async update(id: User['id'], payload: Partial<User>): Promise<User> {
    const entity = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!entity) {
      throw new NotFoundException('User not found');
    }
    const updatedEntity = await this.userRepository.save(
      this.userRepository.create(
          UserMapper.toPersistence({
          ...UserMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return UserMapper.toDomain(updatedEntity);
  }

  async remove(id: User['id'],): Promise<void> {
    await this.userRepository.softDelete(id);
  }

}
