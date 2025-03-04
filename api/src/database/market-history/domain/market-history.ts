import {ApiProperty} from "@nestjs/swagger";

export class MarketHistory {
    @ApiProperty({ description: '기록 ID', example: 1 })
    id: number;

    @ApiProperty({ description: '기록된 마켓 ID', example: 101 })
    marketId: number;

    @ApiProperty({ description: '결과(팀, 선수 등)', example: 'Boston Bruins' })
    outcome: string;

    @ApiProperty({ description: '해당 시점의 확률 (%)', example: 55.4 })
    probability: number;

    @ApiProperty({ description: '데이터가 기록된 시간', example: '2024-03-04T12:00:00Z' })
    timestamp: Date;
}
