import {IPaginationOptions} from "../../../../common/utils/types/pagination-options";
import {NullableType} from "../../../../common/utils/types/nullable.type";
import {DeepPartial, FindOptionsWhere} from "typeorm";
import {Wallet} from "../../domain/wallet";
import {WalletEntity} from "./relational/entities/wallet.entity";
import {FilterWalletDto, SortWalletDto} from "../../dto/query-wallet.dto";

export abstract class WalletRepository {
  abstract create(
    data: Omit<Wallet, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Wallet>;

  /******************************************************************
   * *****************************************************************/

  abstract findMany({
    sortOptions,
  }: {
    sortOptions?: SortWalletDto[] | null;
  }): Promise<Wallet[]>;


  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterWalletDto | null;
    sortOptions?: SortWalletDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResult<Wallet>>;


  abstract findById(id: Wallet['id']): Promise<NullableType<Wallet>>;


  abstract findWithWhere({
   sortOptions,
   whereConditions
   }: {
    sortOptions?: SortWalletDto[] | null;
    whereConditions?: FindOptionsWhere<Wallet>
  }): Promise<Wallet[]>;


  abstract findOneWithWhere({
    filterOptions,
    sortOptions,
    whereConditions,
    relations,
  }: {
    filterOptions?: FilterWalletDto | null;
    sortOptions?: SortWalletDto[] | null;
    whereConditions?: FindOptionsWhere<WalletEntity>;
    relations?: string[];
  }): Promise<Wallet>;


  abstract findManyWithWhereAndPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    whereConditions,
  }: {
    filterOptions?: FilterWalletDto | null;
    sortOptions?: SortWalletDto[] | null;
    paginationOptions: IPaginationOptions;
    whereConditions?: FindOptionsWhere<Wallet>;
  }): Promise<Wallet[]>;


  /******************************************************************
   * *****************************************************************/

  abstract update(
    id: Wallet['id'],
    payload: DeepPartial<Wallet>,
  ): Promise<Wallet | null>;


  /******************************************************************
   * *****************************************************************/

  abstract remove(id: Wallet['id']): Promise<void>;
}
