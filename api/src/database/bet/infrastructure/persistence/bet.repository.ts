import {IPaginationOptions} from "../../../../common/utils/types/pagination-options";
import {NullableType} from "../../../../common/utils/types/nullable.type";
import {DeepPartial, FindOptionsWhere} from "typeorm";
import {Bet} from "../../domain/bet";
import {FilterBetDto, SortBetDto} from "../../dto/query-bet.dto";
import {BetEntity} from "./relational/entities/bet.entity";

export abstract class BetRepository {
  abstract create(
    data: Omit<Bet, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Bet>;

  /******************************************************************
   * *****************************************************************/

  abstract findMany({
    sortOptions,
  }: {
    sortOptions?: SortBetDto[] | null;
  }): Promise<Bet[]>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterBetDto | null;
    sortOptions?: SortBetDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Bet[]>;

  abstract findById(id: Bet['id']): Promise<NullableType<Bet>>;


  abstract findWithWhere({
   sortOptions,
   whereConditions
   }: {
    sortOptions?: SortBetDto[] | null;
    whereConditions?: FindOptionsWhere<Bet>
  }): Promise<Bet[]>;


  abstract findOneWithWhere({
    filterOptions,
    sortOptions,
    whereConditions,
    relations,
  }: {
    filterOptions?: FilterBetDto | null;
    sortOptions?: SortBetDto[] | null;
    whereConditions?: FindOptionsWhere<BetEntity>;
    relations?: string[];
  }): Promise<Bet>;

  abstract findManyWithWhereAndPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    whereConditions,
  }: {
    filterOptions?: FilterBetDto | null;
    sortOptions?: SortBetDto[] | null;
    paginationOptions: IPaginationOptions;
    whereConditions?: FindOptionsWhere<Bet>;
  }): Promise<Bet[]>;


  /******************************************************************
   * *****************************************************************/

  abstract update(
    id: Bet['id'],
    payload: DeepPartial<Bet>,
  ): Promise<Bet | null>;


  /******************************************************************
   * *****************************************************************/

  abstract remove(id: Bet['id']): Promise<void>;
}
