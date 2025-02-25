import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, IsUrl, Min, Max } from 'class-validator';

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
    @IsOptional()
    description?: string;

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
    @IsOptional()
    isTrending?: boolean;
}
