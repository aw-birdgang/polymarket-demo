import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    SerializeOptions
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InfinityPaginationResponseDto } from "../common/utils/dto/infinity-pagination-response.dto";
import { infinityPagination } from "../common/utils/infinity-pagination";
import { NullableType } from "../common/utils/types/nullable.type";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { QueryCommentDto } from "../database/comment/dto/query-comment.dto";
import { Comment } from "../database/comment/domain/comment";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@ApiTags('COMMENT')
@Controller({
    path: 'markets/:marketId/comments',
    version: '1',
})
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @ApiOperation({ summary: '댓글 작성' })
    @ApiCreatedResponse({
        type: Comment,
        description: '댓글이 성공적으로 작성되었습니다.',
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async createComment(
        @Param('marketId', ParseUUIDPipe) marketId: string,
        @Body() createCommentDto: CreateCommentDto
    ): Promise<Comment> {
        return this.commentService.createComment(marketId, createCommentDto);
    }

    @ApiOperation({ summary: '댓글 목록 조회' })
    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    async findAllAndPaging(
        @Param('marketId', ParseUUIDPipe) marketId: string,
        @Query() query: QueryCommentDto,
    ): Promise<InfinityPaginationResponseDto<Comment>> {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        const paginationResult = await this.commentService.findManyWithPagination({
            marketId,
            filterOptions: query?.filters,
            sortOptions: query?.sort,
            paginationOptions: {
                page,
                limit,
            },
        });
        return infinityPagination(paginationResult, { page, limit });
    }

    @ApiOperation({ summary: '댓글 상세 조회' })
    @ApiResponse({
        status: 200,
        description: '댓글 상세 정보 반환',
        type: Comment
    })
    @ApiResponse({
        status: 404,
        description: '댓글을 찾을 수 없습니다.'
    })
    @Get(':commentId')
    async getCommentById(
        @Param('marketId', ParseUUIDPipe) marketId: string,
        @Param('commentId', ParseUUIDPipe) commentId: string,
    ): Promise<NullableType<Comment>> {
        return this.commentService.getCommentById(marketId, commentId);
    }

    @ApiOperation({ summary: '댓글 수정' })
    @ApiResponse({
        status: 200,
        description: '댓글이 성공적으로 수정 되었습니다.',
        type: Comment
    })
    @ApiResponse({
        status: 403,
        description: '댓글 수정 권한이 없습니다.'
    })
    @Put(':commentId')
    async updateComment(
        @Param('marketId', ParseUUIDPipe) marketId: string,
        @Param('commentId', ParseUUIDPipe) commentId: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ): Promise<Comment | null> {
        return this.commentService.updateComment(marketId, commentId, updateCommentDto);
    }

    @ApiOperation({ summary: '댓글 삭제' })
    @ApiResponse({
        status: 204,
        description: '댓글이 성공적으로 삭제 되었습니다.'
    })
    @ApiResponse({
        status: 403,
        description: '댓글 삭제 권한이 없습니다.'
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':commentId')
    async deleteComment(
        @Param('marketId', ParseUUIDPipe) marketId: string,
        @Param('commentId', ParseUUIDPipe) commentId: string,
        @Param('userId', ParseUUIDPipe) userId: string,
    ): Promise<void> {
        return this.commentService.deleteComment(marketId, commentId, userId);
    }
}
