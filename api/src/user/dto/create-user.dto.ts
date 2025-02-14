import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'john_doe',
        description: '사용자 이름 (4~20자, 영문, 숫자, 밑줄, 마침표만 허용)',
    })
    @IsString({ message: 'username은 문자열이어야 합니다.' })
    @IsNotEmpty({ message: 'username은 필수 입력 항목입니다.' })
    @MinLength(4, { message: 'username은 최소 4자 이상이어야 합니다.' })
    @MaxLength(20, { message: 'username은 최대 20자 이하여야 합니다.' })
    @Matches(/^[a-zA-Z0-9_.]+$/, {
        message: 'username은 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.',
    })
    username: string;

    @ApiProperty({
        example: 'StrongPass123!',
        description: '비밀번호 (최소 8자, 대소문자, 숫자, 특수문자 포함)',
    })
    @IsString({ message: 'password는 문자열이어야 합니다.' })
    @IsNotEmpty({ message: 'password는 필수 입력 항목입니다.' })
    @MinLength(8, { message: 'password는 최소 8자 이상이어야 합니다.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'password는 최소 하나의 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
    })
    password: string;

    @ApiProperty({
        example: 'john.doe@example.com',
        description: '사용자의 이메일 주소 (유효한 이메일 형식 필요)',
    })
    @IsEmail({}, { message: '올바른 이메일 형식이어야 합니다.' })
    @IsNotEmpty({ message: 'email은 필수 입력 항목입니다.' })
    email: string;
}
