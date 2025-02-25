import { ApiProperty } from "@nestjs/swagger";
import {Expose, Transform} from "class-transformer";

export class Event {
    @ApiProperty({
        type: String,
        description: '고유 식별자 (UUID 형식)',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
    })
    id: string;

    @ApiProperty({
        type: String,
        description: '이벤트 제목',
        example: 'Will Kanye launch a coin in February?'
    })
    title: string;

    @ApiProperty({
        type: String,
        description: '이벤트 상세 설명',
        example: 'This event predicts if Kanye West will launch his own cryptocurrency by the end of February.'
    })
    description: string;

    @ApiProperty({
        type: String,
        description: '이벤트 썸네일 URL',
        example: 'https://example.com/image.jpg'
    })
    imageUrl: string;

    @ApiProperty({
        type: Number,
        description: '거래량 (예: $23m Vol.)',
        example: 23000000
    })
    @Expose()
    volume: number;

    @ApiProperty({
        type: Number,
        description: '예측 확률 (0 ~ 1 사이의 실수)',
        example: 0.20
    })
    chance: number;

    @ApiProperty({
        type: Boolean,
        description: '현재 인기 여부 (true: 인기, false: 비인기)',
        example: true
    })
    isTrending: boolean;
}
