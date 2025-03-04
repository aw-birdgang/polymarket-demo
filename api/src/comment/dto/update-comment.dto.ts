import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
    @ApiProperty({ type: String, description: '유저 아이디' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({ type: String, description: '수정할 댓글 내용' })
    @IsNotEmpty()
    @IsString()
    content: string;
}
