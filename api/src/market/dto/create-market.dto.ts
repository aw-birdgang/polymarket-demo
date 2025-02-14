import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMarketDto {
    @ApiProperty({
        example: 'Will Candidate A win the 2025 Election?',
        description: 'Prediction market question',
        required: true,
    })
    @IsString({ message: 'question은 문자열이어야 합니다.' })
    @IsNotEmpty({ message: 'question은 필수 입력값입니다.' })
    question: string;

    @ApiProperty({
        example: '2025-12-31T23:59:59.999Z',
        description: 'User end time (ISO 8601 format)',
        required: true,
    })
    @IsNotEmpty({ message: 'endTime은 필수 입력값입니다.' })
    @Type(() => Date)
    @IsDate({ message: 'endTime은 유효한 날짜 형식이어야 합니다.' })
    endTime: Date;

    @ApiProperty({
        example: false,
        description: 'User resolution status',
        required: false,
        default: false,
    })
    resolved?: boolean;

    @ApiProperty({
        example: false,
        description: 'User outcome',
        required: false,
        default: false,
    })
    outcome?: boolean;
}
