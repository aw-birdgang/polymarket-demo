import { ApiProperty } from '@nestjs/swagger';
import {Expose, Transform} from "class-transformer";

export class EventResponseDto {
    @ApiProperty({
        description: '고유 식별자 (UUID 형식)',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    })
    id: string;

    @ApiProperty({
        description: '이벤트 제목',
        example: 'Will Kanye launch a coin in February?',
    })
    title: string;

    @ApiProperty({
        description: '이벤트 상세 설명',
        example: 'This event predicts if Kanye West will launch his own cryptocurrency by the end of February.',
    })
    description: string;

    @ApiProperty({
        description: '이벤트 썸네일 이미지 URL',
        example: 'https://example.com/image.jpg',
    })
    imageUrl: string;

    @ApiProperty({
        type: Number,
        description: '거래량 (예: $23m Vol.)',
        example: 23000000
    })
    @Expose()
    @Transform(({ value }) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}m Vol.`;
        }
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}k Vol.`;
        }
        return `$${value} Vol.`;
    })
    volume: string;

    @ApiProperty({
        description: '예측 확률 (0 ~ 1 사이의 실수)',
        example: 0.20,
    })
    chance: number;

    @ApiProperty({
        description: '현재 인기 여부',
        example: true,
    })
    isTrending: boolean;

    @ApiProperty({
        description: '생성 날짜',
        example: '2025-02-25T10:30:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: '수정 날짜',
        example: '2025-02-26T15:45:00.000Z',
    })
    updatedAt: Date;
}
