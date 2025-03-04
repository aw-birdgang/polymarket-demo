import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsNumber} from 'class-validator';
import {TradeType} from "../../common/enum/trade-type.enum";

export class CreateTradeDto {
    @ApiProperty({
        description: '거래 유형 (BUY: 매수, SELL: 매도)',
        example: 'BUY',
    })
    @IsEnum(TradeType)
    tradeType: TradeType;

    @ApiProperty({
        description: '거래 금액',
        example: 1000000,
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        description: '거래 당시 가격',
        example: 0.35,
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    event: Event;
}
