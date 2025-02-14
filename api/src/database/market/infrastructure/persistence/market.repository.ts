import {IPaginationOptions} from "../../../../common/utils/types/pagination-options";
import {NullableType} from "../../../../common/utils/types/nullable.type";
import {DeepPartial, FindOptionsWhere} from "typeorm";
import {Market} from "../../domain/market";
import {FilterMarketDto, SortMarketDto} from "../../dto/query-market.dto";
import {MarketEntity} from "./relational/entities/market.entity";

export abstract class MarketRepository {
  abstract create(
    data: Omit<Market, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Market>;

  /******************************************************************
   * *****************************************************************/

  abstract findMany({
    sortOptions,
  }: {
    sortOptions?: SortMarketDto[] | null;
  }): Promise<Market[]>;


  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterMarketDto | null;
    sortOptions?: SortMarketDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResult<Market>>;


  abstract findById(id: Market['id']): Promise<NullableType<Market>>;


  abstract findWithWhere({
   sortOptions,
   whereConditions
   }: {
    sortOptions?: SortMarketDto[] | null;
    whereConditions?: FindOptionsWhere<Market>
  }): Promise<Market[]>;


  abstract findOneWithWhere({
    filterOptions,
    sortOptions,
    whereConditions,
    relations,
  }: {
    filterOptions?: FilterMarketDto | null;
    sortOptions?: SortMarketDto[] | null;
    whereConditions?: FindOptionsWhere<MarketEntity>;
    relations?: string[];
  }): Promise<Market>;


  abstract findManyWithWhereAndPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    whereConditions,
  }: {
    filterOptions?: FilterMarketDto | null;
    sortOptions?: SortMarketDto[] | null;
    paginationOptions: IPaginationOptions;
    whereConditions?: FindOptionsWhere<Market>;
  }): Promise<Market[]>;


  /******************************************************************
   * *****************************************************************/

  abstract update(
    id: Market['id'],
    payload: DeepPartial<Market>,
  ): Promise<Market | null>;


  /******************************************************************
   * *****************************************************************/

  abstract remove(id: Market['id']): Promise<void>;
}
