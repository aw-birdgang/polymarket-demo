import { IsUUID, IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlaceBetDto {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'User ID (UUID format)',
    })
    @IsUUID('4', { message: '유효한 UUID 형식이어야 합니다.' })
    @IsNotEmpty({ message: 'userId는 필수 값입니다.' })
    userId: string;

    @ApiProperty({
        example: '660e8400-e29b-41d4-a716-446655440000',
        description: 'User ID (UUID format)',
    })
    @IsUUID('4', { message: '유효한 UUID 형식이어야 합니다.' })
    @IsNotEmpty({ message: 'marketId는 필수 값입니다.' })
    marketId: string;

    @ApiProperty({
        example: 'YES',
        description: 'User bet outcome (YES or NO)',
        enum: ['YES', 'NO'],
    })
    @IsEnum(['YES', 'NO'], { message: "outcome 값은 'YES' 또는 'NO'만 가능합니다." })
    @IsNotEmpty({ message: 'outcome 값은 필수입니다.' })
    outcome: 'YES' | 'NO';

    @ApiProperty({
        example: 100,
        description: 'Event amount (minimum: 1)',
        type: Number,
        minimum: 1,
    })
    @IsNumber({}, { message: '금액은 숫자 형식이어야 합니다.' })
    @Min(1, { message: '배팅 금액은 최소 1 이상이어야 합니다.' })
    @IsNotEmpty({ message: 'amount는 필수 값입니다.' })
    amount: number;
}
