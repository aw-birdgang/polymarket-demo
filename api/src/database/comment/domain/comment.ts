import {ApiProperty} from "@nestjs/swagger";
import {MarketEntity} from "../../market/infrastructure/persistence/relational/entities/market.entity";

export class Comment {
    @ApiProperty({ description: '댓글 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ description: '댓글 작성자 ID', example: 'user_987654321' })
    userId: string;

    @ApiProperty({ description: '댓글이 작성된 마켓 ID', example: 'market_123456' })
    marketId: string;

    @ApiProperty({ description: '댓글이 작성된 마켓', type: () => MarketEntity })
    market: MarketEntity;

    @ApiProperty({ description: '댓글 내용', example: 'I think this market is interesting!' })
    content: string;

    @ApiProperty({ description: '댓글이 생성된 날짜', example: '2025-03-04T12:00:00Z' })
    createdAt: Date;
}
