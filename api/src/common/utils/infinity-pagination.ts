import { IPaginationOptions } from "./types/pagination-options";
import { InfinityPaginationResponseDto } from "./dto/infinity-pagination-response.dto";

export const infinityPagination = <T>(
  paginationResult: PaginationResult<T>,
  options: IPaginationOptions,
): InfinityPaginationResponseDto<T> => {
  const { items, totalCount } = paginationResult;
  return {
    data: items,
    hasNextPage: options.page * options.limit < totalCount,
  };
};
