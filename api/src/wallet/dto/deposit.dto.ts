import { IsUUID, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'User ID (UUID format)',
    })
    @IsUUID('4', { message: '유효한 UUID 형식이어야 합니다.' })
    @IsNotEmpty({ message: 'userId는 필수 값입니다.' })
    userId: string;

    @ApiProperty({
        example: 100,
        description: 'Deposit amount (minimum: 1)',
        type: Number,
        minimum: 1,
    })
    @IsNumber({}, { message: '금액은 숫자 형식이어야 합니다.' })
    @Min(1, { message: '금액은 최소 1 이상이어야 합니다.' })
    @IsNotEmpty({ message: 'amount는 필수 값입니다.' })
    amount: number;
}
