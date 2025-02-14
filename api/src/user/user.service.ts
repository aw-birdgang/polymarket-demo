// user.service.ts
import {Injectable, Logger} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UserRepository} from "../database/user/infrastructure/persistence/user.repository";
import {plainToInstance} from "class-transformer";
import {User} from "../database/user/domain/user";
import {IPaginationOptions} from "../common/utils/types/pagination-options";
import {NullableType} from "../common/utils/types/nullable.type";
import {FilterUserDto, SortUserDto} from "../database/user/dto/query-user.dto";
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    private readonly logger = new Logger(UserService.name);

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const clonedPayload = {
            ...plainToInstance(User, createUserDto),
            password: hashedPassword,
        };
        this.logger.log(`createUserDto.email :: ${createUserDto.email}, createUserDto.username:: ${createUserDto.username}`);
        return await this.userRepository.create(clonedPayload);
    }

    async findManyWithPagination({
         filterOptions,
         sortOptions,
         paginationOptions,
     }: {
        filterOptions?: FilterUserDto | null;
        sortOptions?: SortUserDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<User>> {
        return this.userRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }

    async getUserById(id: string): Promise<NullableType<User>> {
        return this.userRepository.findById(id);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        const market = await this.userRepository.findById(id);
        if (!market) {
            throw new Error('Liquidity not found');
        }
        const clonedPayload = { ...updateUserDto };
        return await this.userRepository.update(id, clonedPayload);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.remove(id);
    }

}
