import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class EventQueryDto {
    @ApiPropertyOptional({ description: '페이지 번호', example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;

    @ApiPropertyOptional({ description: '페이지당 아이템 수', example: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number;

    @ApiPropertyOptional({ description: '정렬 기준', example: 'createdAt' })
    @IsOptional()
    @IsString()
    sortBy?: string;

    @ApiPropertyOptional({ description: '정렬 순서', example: 'desc' })
    @IsOptional()
    @IsString()
    order?: 'asc' | 'desc';

    @ApiPropertyOptional({ description: '인기 여부 필터링', example: true })
    @IsOptional()
    @IsBoolean()
    isTrending?: boolean;
}
