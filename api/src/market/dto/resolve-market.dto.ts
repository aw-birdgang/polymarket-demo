import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResolveMarketDto {
    @ApiProperty({
        example: true,
        description: 'User resolution outcome (true = YES, false = NO)',
    })
    @IsBoolean({ message: 'outcome은 true 또는 false 값이어야 합니다.' })
    @IsNotEmpty({ message: 'outcome 값은 필수입니다.' })
    outcome: boolean;
}
