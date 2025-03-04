import {ForbiddenException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {plainToInstance} from "class-transformer";
import {IPaginationOptions} from "../common/utils/types/pagination-options";
import {NullableType} from "../common/utils/types/nullable.type";
import {CommentRepository} from "../database/comment/infrastructure/persistence/comment.repository";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FilterCommentDto, SortCommentDto} from "../database/comment/dto/query-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {Comment} from "../database/comment/domain/comment";
import {MarketService} from "../market/market.service";

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly marketService: MarketService,
    ) {}

    private readonly logger = new Logger(CommentService.name);

    async createComment(
        marketId: string,
        createCommentDto: CreateCommentDto
    ): Promise<Comment> {
        const event = await this.marketService.getMarketById(marketId);
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        const clonedPayload = {
            ...plainToInstance(Comment, createCommentDto),
            eventId: marketId,
        };
        this.logger.log(
            `createComment.userId :: ${createCommentDto.userId}, createComment.content :: ${createCommentDto.content}`
        );
        return await this.commentRepository.create(clonedPayload);
    }


    /**
     * 🔥 댓글 목록 조회 (페이징)
     * EventId 로 필터링
     */
    async findManyWithPagination({
                                     marketId,
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        marketId: string;
        filterOptions?: FilterCommentDto | null;
        sortOptions?: SortCommentDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Comment>> {
        return this.commentRepository.findManyWithPagination({
            filterOptions: {
                ...filterOptions,
                marketId,  // 🔥 EventId 필터링
            },
            sortOptions,
            paginationOptions,
        });
    }


    /**
     * 🔥 댓글 상세 조회
     */
    async getCommentById(
        marketId: string,
        commentId: string
    ): Promise<NullableType<Comment>> {
        const comment = await this.commentRepository.findById(commentId);
        if (!comment || comment.marketId !== marketId) {
            throw new NotFoundException('Comment not found in this event');
        }
        return comment;
    }


    /**
     * 🔥 댓글 수정
     * 작성자 권한 확인
     */
    async updateComment(
        marketId: string,
        commentId: string,
        updateCommentDto: UpdateCommentDto,
    ): Promise<Comment | null> {
        const comment = await this.commentRepository.findById(commentId);
        if (!comment || comment.marketId !== marketId) {
            throw new NotFoundException('Comment not found in this event');
        }
        if (comment.userId !== updateCommentDto.userId) {
            throw new ForbiddenException('You do not have permission to edit this comment');
        }
        const clonedPayload = {
            ...plainToInstance(Comment, updateCommentDto),
        };
        return await this.commentRepository.update(commentId, clonedPayload);
    }


    /**
     * 🔥 댓글 삭제
     * 작성자 권한 확인
     */
    async deleteComment(
        marketId: string,
        commentId: string,
        userId: string
    ): Promise<void> {
        const comment = await this.commentRepository.findById(commentId);
        if (!comment || comment.marketId !== marketId) {
            throw new NotFoundException('Comment not found in this event');
        }
        if (comment.userId !== userId) {
            throw new ForbiddenException('You do not have permission to delete this comment');
        }
        await this.commentRepository.remove(commentId);
    }

}
