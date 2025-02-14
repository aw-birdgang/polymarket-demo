import {ApiProperty} from "@nestjs/swagger";

export class Bet {
    @ApiProperty({
        type: String,
        description: '고유 아이디',
    })
    id: string;

    @ApiProperty({
        type: String,
        description: '유저 아이디',
    })
    userId: string;

    @ApiProperty({
        type: String,
        description: '마켓 아이디',
    })
    marketId: string;

    @ApiProperty({
        type: String,
        description: 'outcome',
    })
    outcome: 'YES' | 'NO';

    @ApiProperty({
        type: Number,
        description: '수량',
    })
    amount: number;
}
