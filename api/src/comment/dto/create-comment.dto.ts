import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({ type: String, description: '댓글 내용' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ type: String, description: '유저 ID (UUID 형식)' })
    @IsNotEmpty()
    @IsUUID()
    userId: string;
}
