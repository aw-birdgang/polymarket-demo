import {IPaginationOptions} from "../../../../common/utils/types/pagination-options";
import {NullableType} from "../../../../common/utils/types/nullable.type";
import {DeepPartial, FindOptionsWhere} from "typeorm";
import {User} from "../../domain/user";
import {UserEntity} from "./relational/entities/user.entity";
import {FilterUserDto, SortUserDto} from "../../dto/query-user.dto";

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<User>;

  /******************************************************************
   * *****************************************************************/

  abstract findMany({
    sortOptions,
  }: {
    sortOptions?: SortUserDto[] | null;
  }): Promise<User[]>;


  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResult<User>>;


  abstract findById(id: User['id']): Promise<NullableType<User>>;


  abstract findWithWhere({
   sortOptions,
   whereConditions
   }: {
    sortOptions?: SortUserDto[] | null;
    whereConditions?: FindOptionsWhere<User>
  }): Promise<User[]>;


  abstract findOneWithWhere({
    filterOptions,
    sortOptions,
    whereConditions,
    relations,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    whereConditions?: FindOptionsWhere<UserEntity>;
    relations?: string[];
  }): Promise<User>;


  abstract findManyWithWhereAndPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    whereConditions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
    whereConditions?: FindOptionsWhere<User>;
  }): Promise<User[]>;


  /******************************************************************
   * *****************************************************************/

  abstract update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | null>;


  /******************************************************************
   * *****************************************************************/

  abstract remove(id: User['id']): Promise<void>;
}
