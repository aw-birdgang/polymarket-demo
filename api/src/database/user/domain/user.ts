import {ApiProperty} from "@nestjs/swagger";
import {CreateDateColumn, UpdateDateColumn} from "typeorm";


export class User {
    @ApiProperty({
        type: String,
        description: '고유 아이디',
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'username',
    })
    username: string;

    @ApiProperty({
        type: String,
        description: 'password',
    })
    password: string;

    @ApiProperty({
        type: String,
        description: 'email',
    })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
