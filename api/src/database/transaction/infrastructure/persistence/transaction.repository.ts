import {IPaginationOptions} from "../../../../common/utils/types/pagination-options";
import {NullableType} from "../../../../common/utils/types/nullable.type";
import {DeepPartial, FindOptionsWhere} from "typeorm";
import {Transaction} from "../../domain/transaction";
import {TransactionEntity} from "./relational/entities/transaction.entity";
import {FilterTransactionDto, SortTransactionDto} from "../../dto/query-transaction.dto";

export abstract class TransactionRepository {
  abstract create(
    data: Omit<Transaction, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Transaction>;

  /******************************************************************
   * *****************************************************************/

  abstract findMany({
    sortOptions,
  }: {
    sortOptions?: SortTransactionDto[] | null;
  }): Promise<Transaction[]>;


  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTransactionDto | null;
    sortOptions?: SortTransactionDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResult<Transaction>>;


  abstract findById(id: Transaction['id']): Promise<NullableType<Transaction>>;


  abstract findWithWhere({
   sortOptions,
   whereConditions
   }: {
    sortOptions?: SortTransactionDto[] | null;
    whereConditions?: FindOptionsWhere<Transaction>
  }): Promise<Transaction[]>;


  abstract findOneWithWhere({
    filterOptions,
    sortOptions,
    whereConditions,
    relations,
  }: {
    filterOptions?: FilterTransactionDto | null;
    sortOptions?: SortTransactionDto[] | null;
    whereConditions?: FindOptionsWhere<TransactionEntity>;
    relations?: string[];
  }): Promise<Transaction>;


  abstract findManyWithWhereAndPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    whereConditions,
  }: {
    filterOptions?: FilterTransactionDto | null;
    sortOptions?: SortTransactionDto[] | null;
    paginationOptions: IPaginationOptions;
    whereConditions?: FindOptionsWhere<Transaction>;
  }): Promise<Transaction[]>;


  /******************************************************************
   * *****************************************************************/

  abstract update(
    id: Transaction['id'],
    payload: DeepPartial<Transaction>,
  ): Promise<Transaction | null>;


  /******************************************************************
   * *****************************************************************/

  abstract remove(id: Transaction['id']): Promise<void>;
}
