// user.controller.ts
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    SerializeOptions
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User} from "../database/user/domain/user";
import {InfinityPaginationResponseDto} from "../common/utils/dto/infinity-pagination-response.dto";
import {infinityPagination} from "../common/utils/infinity-pagination";
import {QueryUserDto} from "../database/user/dto/query-user.dto";
import {ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('USERS')
@Controller({
    path: 'users',
    version: '1',
})
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: '새 사용자 생성', description: '새로운 사용자를 생성합니다.' })
    @ApiResponse({ status: 201, description: '사용자가 성공적으로 생성되었습니다.', type: User })
    @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
    @ApiResponse({ status: 409, description: '이미 존재하는 사용자입니다.' })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }


    @SerializeOptions({
        groups: ['app'],
    })
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    async findAllAndPaging(
        @Query() query: QueryUserDto,
    ): Promise<InfinityPaginationResponseDto<User>> {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }
        const paginationResult = await this.userService.findManyWithPagination({
            filterOptions: query?.filters,
            sortOptions: query?.sort,
            paginationOptions: {
                page,
                limit,
            },
        });
        return infinityPagination(paginationResult, { page, limit });
    }


    @ApiOkResponse({
        type: User,
    })
    @SerializeOptions({
        groups: ['app'],
    })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
    })
    async findOne(
        @Param('id') id: string
    ): Promise<User> {
        return this.userService.getUserById(id);
    }


    @Put(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'User ID (UUID 형식)',
    })
    @ApiOkResponse({
        description: '사용자 정보가 성공적으로 업데이트 되었습니다.',
        type: User,
    })
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        const updatedUser = await this.userService.update(id, updateUserDto);
        if (!updatedUser) {
            throw new NotFoundException(`ID가 ${id}인 사용자 를 찾을 수 없습니다.`);
        }
        return updatedUser;
    }


    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'User ID (UUID 형식)',
    })
    @ApiOkResponse({
        description: '사용자 가 성공적 으로 삭제 되었 습니다.',
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: string,
    ): Promise<void> {
        return this.userService.remove(id);
    }

}
