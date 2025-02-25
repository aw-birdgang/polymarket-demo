import {IPaginationOptions} from "../../../../common/utils/types/pagination-options";
import {NullableType} from "../../../../common/utils/types/nullable.type";
import {DeepPartial, FindOptionsWhere} from "typeorm";
import {Event} from "../../domain/event";
import {FilterEventDto, SortEventDto} from "../../dto/query-event.dto";
import {FilterMarketDto, SortMarketDto} from "../../../market/dto/query-market.dto";
import {Market} from "../../../market/domain/market";

export abstract class EventRepository {
  abstract create(
    data: Omit<Event, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Event>;

  /******************************************************************
   * *****************************************************************/

  abstract findMany({
    sortOptions,
  }: {
    sortOptions?: SortEventDto[] | null;
  }): Promise<Event[]>;


  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterEventDto | null;
    sortOptions?: SortEventDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResult<Event>>;


  abstract findById(id: Event['id']): Promise<NullableType<Event>>;


  abstract findWithWhere({
   sortOptions,
   whereConditions
   }: {
    sortOptions?: SortEventDto[] | null;
    whereConditions?: FindOptionsWhere<Event>
  }): Promise<Event[]>;


  abstract findOneWithWhere(
    where: FindOptionsWhere<Event>
  ): Promise<Event>;

  abstract findManyWithWhereAndPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    whereConditions,
  }: {
    filterOptions?: FilterEventDto | null;
    sortOptions?: SortEventDto[] | null;
    paginationOptions: IPaginationOptions;
    whereConditions?: FindOptionsWhere<Event>;
  }): Promise<Event[]>;


  /******************************************************************
   * *****************************************************************/

  abstract update(
    id: Event['id'],
    payload: DeepPartial<Event>,
  ): Promise<Event | null>;


  /******************************************************************
   * *****************************************************************/

  abstract remove(id: Event['id']): Promise<void>;
}
