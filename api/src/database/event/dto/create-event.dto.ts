import {IsBoolean, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateEventDto {
    @ApiProperty({ description: '이벤트 제목', example: 'Will Trump be re-elected in 2024?' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: '이벤트 설명', example: 'Predict if Donald Trump will win the 2024 U.S. presidential election.' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: '이벤트가 종료되었는지 여부', example: false })
    @IsOptional()
    @IsBoolean()
    isResolved?: boolean;
}
