import {ApiProperty} from "@nestjs/swagger";
import {Market} from "../../market/domain/market";

export class Bet {
    @ApiProperty({ description: '베팅 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ description: '베팅한 사용자 ID', example: 'user_987654321' })
    userId: string;

    @ApiProperty({ description: '베팅한 마켓 ID', example: 'market_123456' })
    marketId: string;

    @ApiProperty({ description: '베팅이 이루어진 마켓', type: () => Market })
    market: Market;

    @ApiProperty({ description: '베팅 금액', example: 100.50 })
    betAmount: number;

    @ApiProperty({ description: '베팅한 결과 (Yes/No/Multiple Outcome)', enum: ['YES', 'NO', 'MULTIPLE'], example: 'YES' })
    betOn: 'YES' | 'NO' | 'MULTIPLE';

    @ApiProperty({ description: '베팅이 생성된 날짜', example: '2025-03-04T12:00:00Z' })
    createdAt: Date;
}
