import {ApiProperty} from "@nestjs/swagger";
import {CreateDateColumn} from "typeorm";

export class Transaction {
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
        description: 'type',
    })
    type: 'DEPOSIT' | 'WITHDRAW';

    @ApiProperty({
        type: Number,
        description: 'amount',
    })
    amount: number;

    @CreateDateColumn()
    createdAt: Date;
}
