import {IPaginationOptions} from "../../../../common/utils/types/pagination-options";
import {NullableType} from "../../../../common/utils/types/nullable.type";
import {DeepPartial, FindOptionsWhere} from "typeorm";
import {Comment} from "../../domain/comment";
import {CommentEntity} from "./relational/entities/comment.entity";
import {FilterCommentDto, SortCommentDto} from "../../dto/query-comment.dto";

export abstract class CommentRepository {
  abstract create(
    data: Omit<Comment, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Comment>;

  /******************************************************************
   * *****************************************************************/

  abstract findMany({
    sortOptions,
  }: {
    sortOptions?: SortCommentDto[] | null;
  }): Promise<Comment[]>;


  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCommentDto | null;
    sortOptions?: SortCommentDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResult<Comment>>;


  abstract findById(id: Comment['id']): Promise<NullableType<Comment>>;


  abstract findWithWhere({
   sortOptions,
   whereConditions
   }: {
    sortOptions?: SortCommentDto[] | null;
    whereConditions?: FindOptionsWhere<Comment>
  }): Promise<Comment[]>;


  abstract findOneWithWhere({
    filterOptions,
    sortOptions,
    whereConditions,
    relations,
  }: {
    filterOptions?: FilterCommentDto | null;
    sortOptions?: SortCommentDto[] | null;
    whereConditions?: FindOptionsWhere<CommentEntity>;
    relations?: string[];
  }): Promise<Comment>;


  abstract findManyWithWhereAndPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    whereConditions,
  }: {
    filterOptions?: FilterCommentDto | null;
    sortOptions?: SortCommentDto[] | null;
    paginationOptions: IPaginationOptions;
    whereConditions?: FindOptionsWhere<Comment>;
  }): Promise<Comment[]>;


  /******************************************************************
   * *****************************************************************/

  abstract update(
    id: Comment['id'],
    payload: DeepPartial<Comment>,
  ): Promise<Comment | null>;


  /******************************************************************
   * *****************************************************************/

  abstract remove(id: Comment['id']): Promise<void>;
}
