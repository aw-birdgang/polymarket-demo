import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";

export class CreateMarketDto {
    @ApiProperty({ description: '예측 질문', example: 'Who will win the presidency in 2024?' })
    @IsString()
    question: string;

    @ApiProperty({ description: '마켓 유형', enum: ['BINARY', 'MULTIPLE'], example: 'BINARY' })
    @IsEnum(['BINARY', 'MULTIPLE'])
    type: 'BINARY' | 'MULTIPLE';

    @ApiPropertyOptional({ description: '다중 선택 시장일 경우 가능한 결과 목록', example: ['Trump', 'Biden', 'DeSantis'] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    outcomes?: string[];

    @ApiPropertyOptional({ description: 'Yes 배당률 (BINARY 시장에서 사용)', example: 0.55 })
    @IsOptional()
    @IsNumber()
    yesOdds?: number;

    @ApiPropertyOptional({ description: 'No 배당률 (BINARY 시장에서 사용)', example: 0.45 })
    @IsOptional()
    @IsNumber()
    noOdds?: number;

    @ApiPropertyOptional({ description: '다중 선택 시장 배당률', example: { "Trump": 45, "Biden": 40, "DeSantis": 15 } })
    @IsOptional()
    @ValidateNested()
    @Type(() => Object)
    outcomeOdds?: Record<string, number>;

    @ApiProperty({ description: '해당 마켓이 속한 이벤트 ID', example: 1 })
    @IsNumber()
    eventId: number;

    @ApiProperty({ description: '베팅이 마감되는 시간 (ISO 8601 형식)', example: '2024-11-05T23:59:59Z' })
    @IsDateString()
    closeTime: string;
}
