import {ApiProperty} from "@nestjs/swagger";

export class Liquidity {
    @ApiProperty({
        type: String,
        description: '고유 아이디',
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'userId',
    })
    userId: string;

    @ApiProperty({
        type: String,
        description: 'marketId',
    })
    marketId: string;

    @ApiProperty({
        type: Number,
        description: 'amount',
    })
    amount: number;
}
