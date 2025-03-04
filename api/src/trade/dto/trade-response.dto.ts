import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {TradeType} from "../../common/enum/trade-type.enum";

export class TradeResponseDto {
    @ApiProperty({
        description: '거래 ID (UUID 형식)',
        example: 'f9d8d03f-b976-4a46-bd3e-45a981f1fb70',
    })
    @Expose()
    id: string;

    @ApiProperty({
        description: '거래 유형 (BUY: 매수, SELL: 매도)',
        example: 'BUY',
    })
    @Expose()
    tradeType: TradeType;

    @ApiProperty({
        description: '거래 금액',
        example: 1000000,
    })
    @Expose()
    amount: number;

    @ApiProperty({
        description: '거래 당시 가격',
        example: 0.35,
    })
    @Expose()
    price: number;

    @ApiProperty({
        description: '거래 시간',
        example: '2025-02-25T07:00:00.000Z',
    })
    @Expose()
    createdAt: Date;
}
