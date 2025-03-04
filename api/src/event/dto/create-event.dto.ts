import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsUrl, Min, Max } from 'class-validator';

export class CreateEventDto {
    @ApiProperty({
        description: '이벤트 제목',
        example: 'Will Kanye launch a coin in February?',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: '이벤트 상세 설명',
        example: 'This event predicts if Kanye West will launch his own cryptocurrency by the end of February.',
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: '이벤트 썸네일 이미지 URL',
        example: 'https://example.com/image.jpg',
    })
    @IsUrl()
    @IsNotEmpty()
    imageUrl: string;

    @ApiProperty({
        description: '거래량 (숫자만 입력, 예: 23000000)',
        example: 23000000,
    })
    @IsNumber()
    @IsNotEmpty()
    volume: number;

    @ApiProperty({
        description: '예측 확률 (0 ~ 1 사이의 실수)',
        example: 0.20,
    })
    @IsNumber()
    @Min(0)
    @Max(1)
    chance: number;

    @ApiProperty({
        description: '현재 인기 여부 (true: 인기, false: 비인기)',
        example: true,
    })
    @IsBoolean()
    isTrending: boolean;

    @ApiProperty({
        description: '소속된 Comment 의 ID (UUID 형식)',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    })
    @IsString()
    @IsNotEmpty()
    marketId: string;

    @ApiProperty({
        description: '결과 유형 (0: Yes/No, 1: Multiple Choice)',
        example: 0,
    })
    @IsNumber()
    @IsNotEmpty()
    outcomeType: number;
}
