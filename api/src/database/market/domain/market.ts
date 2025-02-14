import {ApiProperty} from "@nestjs/swagger";


export class Market {
    @ApiProperty({
        type: String,
        description: '고유 아이디',
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'question',
    })
    question: string;

    @ApiProperty({
        type: Date,
        description: 'endTime',
    })
    endTime: Date;

    @ApiProperty({
        type: Boolean,
        description: 'resolved',
    })
    resolved: boolean;

    @ApiProperty({
        type: Boolean,
        description: 'outcome',
    })
    outcome: boolean;
}
