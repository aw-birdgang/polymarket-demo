import {ApiProperty} from '@nestjs/swagger';
import {IsDateString, IsNumber, IsString} from 'class-validator';

export class CreateMarketHistoryDto {
    @ApiProperty({ description: '마켓 ID', example: 101 })
    @IsNumber()
    marketId: number;

    @ApiProperty({ description: '결과(팀, 선수 등)', example: 'Boston Bruins' })
    @IsString()
    outcome: string;

    @ApiProperty({ description: '해당 시점의 확률 (%)', example: 55.4 })
    @IsNumber()
    probability: number;

    @ApiProperty({ description: '데이터가 기록된 시간', example: '2024-03-04T12:00:00Z' })
    @IsDateString()
    timestamp: string;
}
