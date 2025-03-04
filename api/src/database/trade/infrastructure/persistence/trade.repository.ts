import {IPaginationOptions} from "../../../../common/utils/types/pagination-options";
import {NullableType} from "../../../../common/utils/types/nullable.type";
import {DeepPartial, FindOptionsWhere} from "typeorm";
import {Trade} from "../../domain/trade";
import {FilterTradeDto, SortTradeDto} from "../../dto/query-trade.dto";

export abstract class TradeRepository {
  abstract create(
    data: Omit<Trade, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Trade>;

  /******************************************************************
   * *****************************************************************/

  abstract findMany({
    sortOptions,
  }: {
    sortOptions?: SortTradeDto[] | null;
  }): Promise<Trade[]>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTradeDto | null;
    sortOptions?: SortTradeDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResult<Trade>>;

  abstract findById(id: Trade['id']): Promise<NullableType<Trade>>;


  abstract findWithWhere({
   sortOptions,
   whereConditions
   }: {
    sortOptions?: SortTradeDto[] | null;
    whereConditions?: FindOptionsWhere<Trade>
  }): Promise<Trade[]>;


  abstract findOneWithWhere(
    where: FindOptionsWhere<Trade>
  ): Promise<Trade>;

  abstract findManyWithWhereAndPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    whereConditions,
  }: {
    filterOptions?: FilterTradeDto | null;
    sortOptions?: SortTradeDto[] | null;
    paginationOptions: IPaginationOptions;
    whereConditions?: FindOptionsWhere<Trade>;
  }): Promise<Trade[]>;


  /******************************************************************
   * *****************************************************************/

  abstract update(
    id: Trade['id'],
    payload: DeepPartial<Trade>,
  ): Promise<Trade | null>;


  /******************************************************************
   * *****************************************************************/

  abstract remove(id: Trade['id']): Promise<void>;
}
