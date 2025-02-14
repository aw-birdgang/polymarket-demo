import {ApiProperty} from "@nestjs/swagger";

export class Wallet {
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
        type: Number,
        description: 'balance',
    })
    balance: number;
}
