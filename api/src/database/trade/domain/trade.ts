import {ApiProperty} from '@nestjs/swagger';
import {MarketEntity} from "../../market/infrastructure/persistence/relational/entities/market.entity";

export class Trade {
    @ApiProperty({ description: '거래 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ description: '거래를 수행한 사용자 ID', example: 'user_987654321' })
    userId: string;

    @ApiProperty({ description: '거래가 발생한 마켓', type: () => MarketEntity })
    market: MarketEntity;

    @ApiProperty({ description: '거래된 금액', example: 100.50 })
    amount: number;

    @ApiProperty({ description: '거래 유형', enum: ['BUY', 'SELL'], example: 'BUY' })
    tradeType: 'BUY' | 'SELL';

    @ApiProperty({ description: '거래가 생성된 날짜', example: '2025-03-04T12:00:00Z' })
    createdAt: Date;
}
