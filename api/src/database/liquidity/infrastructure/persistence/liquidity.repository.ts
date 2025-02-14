import {IPaginationOptions} from "../../../../common/utils/types/pagination-options";
import {NullableType} from "../../../../common/utils/types/nullable.type";
import {DeepPartial, FindOptionsWhere} from "typeorm";
import {Liquidity} from "../../domain/liquidity";
import {LiquidityEntity} from "./relational/entities/liquidity.entity";
import {FilterLiquidityDto, SortLiquidityDto} from "../../dto/query-liquidity.dto";

export abstract class LiquidityRepository {
  abstract create(
    data: Omit<Liquidity, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Liquidity>;

  /******************************************************************
   * *****************************************************************/

  abstract findMany({
    sortOptions,
  }: {
    sortOptions?: SortLiquidityDto[] | null;
  }): Promise<Liquidity[]>;


  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterLiquidityDto | null;
    sortOptions?: SortLiquidityDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResult<Liquidity>>;


  abstract findById(id: Liquidity['id']): Promise<NullableType<Liquidity>>;


  abstract findWithWhere({
   sortOptions,
   whereConditions
   }: {
    sortOptions?: SortLiquidityDto[] | null;
    whereConditions?: FindOptionsWhere<Liquidity>
  }): Promise<Liquidity[]>;


  abstract findOneWithWhere({
    filterOptions,
    sortOptions,
    whereConditions,
    relations,
  }: {
    filterOptions?: FilterLiquidityDto | null;
    sortOptions?: SortLiquidityDto[] | null;
    whereConditions?: FindOptionsWhere<LiquidityEntity>;
    relations?: string[];
  }): Promise<Liquidity>;


  abstract findManyWithWhereAndPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    whereConditions,
  }: {
    filterOptions?: FilterLiquidityDto | null;
    sortOptions?: SortLiquidityDto[] | null;
    paginationOptions: IPaginationOptions;
    whereConditions?: FindOptionsWhere<Liquidity>;
  }): Promise<Liquidity[]>;


  /******************************************************************
   * *****************************************************************/

  abstract update(
    id: Liquidity['id'],
    payload: DeepPartial<Liquidity>,
  ): Promise<Liquidity | null>;


  /******************************************************************
   * *****************************************************************/

  abstract remove(id: Liquidity['id']): Promise<void>;
}
