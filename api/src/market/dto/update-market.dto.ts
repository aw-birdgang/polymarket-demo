import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class UpdateMarketDto {
    @ApiPropertyOptional({ description: '예측 질문', example: 'Who will win the presidency in 2024?' })
    @IsOptional()
    @IsString()
    question?: string;

    @ApiPropertyOptional({ description: '마켓 유형', enum: ['BINARY', 'MULTIPLE'], example: 'BINARY' })
    @IsOptional()
    @IsEnum(['BINARY', 'MULTIPLE'])
    type?: 'BINARY' | 'MULTIPLE';

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

    @ApiPropertyOptional({ description: '마켓이 종료되었는지 여부', example: false })
    @IsOptional()
    @IsBoolean()
    isResolved?: boolean;

    @ApiPropertyOptional({ description: '확정된 결과', example: 'Biden' })
    @IsOptional()
    @IsString()
    resolvedOutcome?: string;
}
