import {IPaginationOptions} from "../../../../common/utils/types/pagination-options";
import {NullableType} from "../../../../common/utils/types/nullable.type";
import {DeepPartial, FindOptionsWhere} from "typeorm";
import {MarketHistory} from "../../domain/market-history";
import {FilterMarketHistoryDto, SortMarketHistoryDto} from "../../dto/query-market-history.dto";
import {MarketHistoryEntity} from "./relational/entities/market-history.entity";

export abstract class MarketHistoryRepository {
  abstract create(
    data: Omit<MarketHistory, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<MarketHistory>;

  /******************************************************************
   * *****************************************************************/

  abstract findMany({
    sortOptions,
  }: {
    sortOptions?: SortMarketHistoryDto[] | null;
  }): Promise<MarketHistory[]>;


  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterMarketHistoryDto | null;
    sortOptions?: SortMarketHistoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResult<MarketHistory>>;


  abstract findById(id: MarketHistory['id']): Promise<NullableType<MarketHistory>>;


  abstract findWithWhere({
   sortOptions,
   whereConditions
   }: {
    sortOptions?: SortMarketHistoryDto[] | null;
    whereConditions?: FindOptionsWhere<MarketHistory>
  }): Promise<MarketHistory[]>;


  abstract findOneWithWhere({
    filterOptions,
    sortOptions,
    whereConditions,
    relations,
  }: {
    filterOptions?: FilterMarketHistoryDto | null;
    sortOptions?: SortMarketHistoryDto[] | null;
    whereConditions?: FindOptionsWhere<MarketHistoryEntity>;
    relations?: string[];
  }): Promise<MarketHistory>;


  abstract findManyWithWhereAndPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    whereConditions,
  }: {
    filterOptions?: FilterMarketHistoryDto | null;
    sortOptions?: SortMarketHistoryDto[] | null;
    paginationOptions: IPaginationOptions;
    whereConditions?: FindOptionsWhere<MarketHistory>;
  }): Promise<MarketHistory[]>;


  /******************************************************************
   * *****************************************************************/

  abstract update(
    id: MarketHistory['id'],
    payload: DeepPartial<MarketHistory>,
  ): Promise<MarketHistory | null>;


  /******************************************************************
   * *****************************************************************/

  abstract remove(id: MarketHistory['id']): Promise<void>;
}
