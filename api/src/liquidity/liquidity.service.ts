import {Injectable, Logger} from '@nestjs/common';
import {ProvideLiquidityDto} from './dto/provide-liquidity.dto';
import {LiquidityRepository} from "../database/liquidity/infrastructure/persistence/liquidity.repository";
import {plainToInstance} from "class-transformer";
import {IPaginationOptions} from "../common/utils/types/pagination-options";
import {NullableType} from "../common/utils/types/nullable.type";
import {Liquidity} from "../database/liquidity/domain/liquidity";
import {FilterLiquidityDto, SortLiquidityDto} from "../database/liquidity/dto/query-liquidity.dto";
import {FindOptionsWhere} from "typeorm";

@Injectable()
export class LiquidityService {
    constructor(
        private readonly liquidityRepository: LiquidityRepository,
    ) {}

    private readonly logger = new Logger(LiquidityService.name);


    async provideLiquidity(provideLiquidityDto: ProvideLiquidityDto): Promise<Liquidity> {
        const clonedPayload = {
            ...plainToInstance(Liquidity, provideLiquidityDto),
        };
        this.logger.log(`provideLiquidityDto.marketId :: ${provideLiquidityDto.marketId}, provideLiquidityDto.amount:: ${provideLiquidityDto.amount}`);
        return await this.liquidityRepository.create(clonedPayload);
    }


    async getLiquidityPool(marketId: string): Promise<NullableType<Liquidity[]>> {
        const whereConditions: FindOptionsWhere<Liquidity> = { marketId };
        const sortOptions: SortLiquidityDto[] = [{ orderBy: 'id', order: 'ASC' }];
        return this.liquidityRepository.findWithWhere({
            whereConditions,
            sortOptions,
        });
    }

    async getUserLiquidity(userId: string): Promise<NullableType<Liquidity[]>> {
        const whereConditions: FindOptionsWhere<Liquidity> = { userId };
        const sortOptions: SortLiquidityDto[] = [{ orderBy: 'id', order: 'ASC' }];
        return this.liquidityRepository.findWithWhere({
            whereConditions,
            sortOptions,
        });
    }

    async findManyWithPagination({
       filterOptions,
       sortOptions,
       paginationOptions,
    }: {
        filterOptions?: FilterLiquidityDto | null;
        sortOptions?: SortLiquidityDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<PaginationResult<Liquidity>> {
        return this.liquidityRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }

}
